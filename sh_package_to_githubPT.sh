#!/bin/bash
# =============================================================================
#  sh_package_to_githubPT.sh — SampleDir 一键发布脚本
#
#  流程: 打包(mac dmg+pkg) → 收集桌面产物 → 进入 SampleDir 仓库(webs/SampleDir)
#        → 生成 appcast.xml(显式区分 dmg/pkg/exe/msi) → 只提交 appcast.xml
#        → 打 tag + 推送 → 创建 GitHub Release(上传桌面产物为 asset)
#
#  设计原则:
#    • 安装包(dmg/pkg/exe/msi) **不进 git / 不走 LFS**，直接作为 GitHub Release asset 上传。
#      Git LFS 会把每个历史版本的安装包都累积到 git 历史里，导致每次 push 都上传几百 MB~几 GB。
#    • SampleDir 仓库(webs/SampleDir) 只保留 appcast.xml、网站文件、README 和本脚本，保持轻量。
#      appcast.xml 提交后即被 Cloudflare Pages 部署，国内可直连检测更新。
#    • 历史版本由 GitHub Release + tag 保留，下载直链稳定且走 CDN。
#
#  目标仓库: huoleihu/SampleDir  (本地 = webs/SampleDir，即 Cloudflare Pages 部署源)
#  说明: 本脚本同时是「发布逻辑」的归属地，已置于 SampleDir 仓库根目录。
#
#  用法:
#    ./sh_package_to_githubPT.sh                # 版本号自动读 gradle.properties(sampledir.version)，无需传参
#    ./sh_package_to_githubPT.sh 1.0.4          # 可选：手动覆盖版本号
#
#  前置:
#    ① gh CLI 已登录 (gh auth login)        —— 用于创建 Release
#    ② Windows 安装包需在 PD 虚拟机打好后，拷到本机 ~/Desktop
#       (mac 端本脚本负责打包；Windows 端无法在 mac 上构建)
#
#  关于 tag 覆盖:
#    同版本重发(重新发布)时，若 tag 已存在但指向旧 commit，脚本会 git tag -f + push -f 覆盖；
#    若已指向当前 commit 则跳过。换版本号(如 1.0.5)不会触碰旧 tag。
# =============================================================================
set -e

# ---- 日志 ----
# 统一日志格式: [HH:MM:SS] [步骤] 内容
log() { echo "$(date +'%H:%M:%S') $*"; }

MAIN_PROJECT="${MAIN_PROJECT:-$HOME/ai_workbuddy/kotlin_sampleDir}"
RELEASES_REPO="${RELEASES_REPO:-$HOME/ai_workbuddy/webs/SampleDir}"
GH_REPO="huoleihu/SampleDir"
DESKTOP="$HOME/Desktop"

VERSION="${1:-}"            # 可选手动覆盖；默认读主工程 gradle.properties
PUBLISH_RELEASE="${PUBLISH_RELEASE:-true}"

# 版本号主来源：主工程 gradle.properties 的 sampledir.version（与 macPackageDMG.sh 同源）
# 用户在此处管版本号，脚本无需显式传参；桌面残留旧版本也不会误读。
read_version_from_gradle() {
  local f="$MAIN_PROJECT/gradle.properties"
  [ -f "$f" ] || return 1
  grep '^sampledir.version' "$f" | cut -d= -f2 | tr -d '[:space:]'
}

# ---- 前置检查 ----
if [ "$PUBLISH_RELEASE" = "true" ] && ! command -v gh >/dev/null 2>&1; then
  log "[错误] 需要 gh CLI 来创建 Release，请先: gh auth login"
  exit 1
fi
log "[0/7] 前置检查通过 (gh=$(command -v gh >/dev/null 2>&1 && echo 已安装 || echo 缺失), PUBLISH_RELEASE=$PUBLISH_RELEASE)"

# ---- 1) 打包 macOS (dmg + pkg 一并产出到桌面) ----
log "[1/7] 开始打包 macOS (调用 macPackageDMG.sh，产物将输出到 $DESKTOP) ..."
( cd "$MAIN_PROJECT" && ./macPackageDMG.sh )
log "[1/7] macOS 打包完成"

# ---- 2) 推断版本号 (默认读 gradle.properties，参数可覆盖) ----
log "[2/7] 推断版本号 ..."
if [ -n "$VERSION" ]; then
  log "      手动指定版本号: $VERSION"
elif VERSION="$(read_version_from_gradle)"; [ -n "$VERSION" ]; then
  log "      从 gradle.properties(sampledir.version) 读取: $VERSION"
fi
if [ -z "$VERSION" ]; then
  FIRST=$(ls "$DESKTOP"/SampleDir-*.dmg "$DESKTOP"/SampleDir-*.pkg "$DESKTOP"/SampleDir-*.exe 2>/dev/null | head -1)
  if [ -z "$FIRST" ]; then
    log "[错误] 无法从 gradle.properties 读取 sampledir.version，且桌面无产物，请先打包"
    exit 1
  fi
  VERSION="$(basename "$FIRST" | sed -E 's/.*SampleDir-([0-9]+\.[0-9]+\.[0-9]+).*/\1/')"
  log "[警告] 用桌面文件名推断版本=$VERSION（建议配置 gradle.properties 的 sampledir.version）"
fi
TAG="v$VERSION"
log "[2/7] 版本号确定: 版本=$VERSION  tag=$TAG"

# ---- 3) 收集当前版本桌面产物 (不含便携版) ----
log "[3/7] 收集桌面产物 ($DESKTOP/SampleDir-${VERSION}-*) ..."
PRODUCTS=()
for ext in dmg pkg exe msi; do
  for f in "$DESKTOP"/SampleDir-${VERSION}-*.$ext; do [ -e "$f" ] && PRODUCTS+=("$f"); done
done

if [ ${#PRODUCTS[@]} -eq 0 ]; then
  log "[错误] 桌面未找到 SampleDir-${VERSION}-* 安装包(dmg/pkg/exe/msi)，请先打包"
  exit 1
fi
log "[3/7] 收集到 ${#PRODUCTS[@]} 个产物:"
printf '      %s\n' "${PRODUCTS[@]/#$DESKTOP/~/Desktop}"

# mac 至少要有 dmg 或 pkg
if ! ls "$DESKTOP"/SampleDir-${VERSION}-*.dmg >/dev/null 2>&1 && \
   ! ls "$DESKTOP"/SampleDir-${VERSION}-*.pkg >/dev/null 2>&1; then
  log "[错误] macOS 安装包未生成，打包可能失败，请检查 macPackageDMG.sh 输出"
  exit 1
fi
log "[3/7] macOS 安装包校验通过"

# ---- 4) 进入 SampleDir 仓库，防御性清理(安装包绝不该进 git) ----
log "[4/7] 进入仓库 $RELEASES_REPO 并做防御性清理 ..."
cd "$RELEASES_REPO"

# 仓库根下若残留安装包(理论上不会，因为从不复制进去)，清掉以免误提交
N_DEL=0
for ext in dmg pkg exe msi; do
  for old in "$RELEASES_REPO"/SampleDir-*.$ext; do
    [ -e "$old" ] || continue
    log "      [删除] 仓库根残留安装包 $(basename "$old")"
    git rm -f --ignore-unmatch --quiet "$old" 2>/dev/null || rm -f "$old"
    N_DEL=$((N_DEL+1))
  done
done
[ "$N_DEL" -eq 0 ] && log "      仓库根无残留安装包 (无需清理)"

# 移除任何可能的 LFS 规则：安装包不再走 git-lfs
if grep -q "filter=lfs" .gitattributes 2>/dev/null; then
  git rm -f --ignore-unmatched --quiet .gitattributes 2>/dev/null || rm -f .gitattributes
  log "[4/7] 已移除 .gitattributes LFS 规则（安装包不再进 git）"
else
  log "[4/7] 无 LFS 规则 (安装包不会进 git)"
fi

# ---- 5) 生成 appcast.xml (显式区分 dmg / pkg / exe / msi) ----
log "[5/7] 生成 appcast.xml ..."
MAC_DMG=""; MAC_PKG=""; WIN_EXE=""; WIN_MSI=""
for f in "${PRODUCTS[@]}"; do
  case "$f" in
    *.dmg) MAC_DMG="$f";;
    *.pkg) MAC_PKG="$f";;
    *.exe) WIN_EXE="$f";;
    *.msi) WIN_MSI="$f";;
  esac
done
[ -n "$MAC_DMG" ]  && log "      mac dmg: $(basename "$MAC_DMG")"
[ -n "$MAC_PKG" ]  && log "      mac pkg: $(basename "$MAC_PKG")"
[ -n "$WIN_EXE" ]  && log "      win exe: $(basename "$WIN_EXE")"
[ -n "$WIN_MSI" ]  && log "      win msi: $(basename "$WIN_MSI")"

PUBDATE="$(TZ=Asia/Shanghai LC_ALL=C date +"%a, %d %b %Y %H:%M:%S %z")"
PUB_CNDATE="$(TZ=Asia/Shanghai LC_ALL=C date +"%Y-%m-%d %H:%M:%S")"
if [ "$PUBLISH_RELEASE" = "true" ]; then
  BASE="https://github.com/$GH_REPO/releases/download/$TAG"
else
  BASE="https://raw.githubusercontent.com/$GH_REPO/$TAG"
fi
log "      下载基址 BASE=$BASE"

sha256_of() { [ -f "$1" ] && shasum -a 256 "$1" | awk '{print $1}' || echo ""; }
gen_enc() {
  local url="$1" os="$2" itype="$3" file="$4" len sha
  len=$(stat -f%z "$file" 2>/dev/null || echo 0)
  sha=$(sha256_of "$file")
  # installerType 显式标注 dmg/pkg/exe/msi，不靠 URL 后缀判断
  echo "    <enclosure url=\"$url\" sparkle:os=\"$os\" installerType=\"$itype\" length=\"$len\" type=\"application/octet-stream\" sparkle:version=\"$VERSION\" sha256=\"$sha\" />"
}

{
echo '<?xml version="1.0" encoding="UTF-8"?>'
echo '<rss xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle" version="2.0">'
echo '  <channel>'
echo "    <title>SampleDir</title>"
echo "    <item>"
echo "      <title>$VERSION</title>"
echo "      <pubDate>$PUBDATE</pubDate>"
echo "      <pubCnDate>$PUB_CNDATE</pubCnDate>"
echo "      <sparkle:version>$VERSION</sparkle:version>"
[ -n "$MAC_DMG" ] && gen_enc "$BASE/$(basename "$MAC_DMG")" "macos"   "dmg" "$MAC_DMG"
[ -n "$MAC_PKG" ] && gen_enc "$BASE/$(basename "$MAC_PKG")" "macos"   "pkg" "$MAC_PKG"
[ -n "$WIN_EXE" ] && gen_enc "$BASE/$(basename "$WIN_EXE")" "windows" "exe" "$WIN_EXE"
[ -n "$WIN_MSI" ] && gen_enc "$BASE/$(basename "$WIN_MSI")" "windows" "msi" "$WIN_MSI"
echo '    </item>'
echo '  </channel>'
echo '</rss>'
} > appcast.xml
log "[5/7] 生成 appcast.xml 完成 (mac: ${MAC_DMG:-无}/${MAC_PKG:-无}  win: ${WIN_EXE:-无}/${WIN_MSI:-无})"
log "      pubDate=$PUBDATE | pubCnDate=$PUB_CNDATE"
log "      appcast.xml 提交到 SampleDir 仓库后由 Cloudflare Pages 部署，检测更新国内直连"

# ---- 5.5) 同步更新 version.json（保留 123/kuake 网盘链接，仅更新 version 与 github dmg 直链） ----
VERSION_JSON="$RELEASES_REPO/version.json"
if [ -f "$VERSION_JSON" ] && [ -n "$MAC_DMG" ]; then
  log "[5.5/7] 同步 version.json: version=$VERSION, downloads.github=$BASE/$(basename "$MAC_DMG") ..."
  GITHUB_ASSET_NAME="$(basename "$MAC_DMG")"
  python3 - "$VERSION_JSON" "$VERSION" "$BASE" "$GITHUB_ASSET_NAME" <<'PY'
import json, sys
path, version, base, asset = sys.argv[1:5]
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)
data['version'] = version
downloads = data.get('downloads', {})
if not isinstance(downloads, dict):
    downloads = {}
downloads['github'] = base + '/' + asset
data['downloads'] = downloads
with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')
PY
  log "[5.5/7] version.json 更新完成"
elif [ ! -f "$VERSION_JSON" ]; then
  log "[5.5/7] 跳过: $VERSION_JSON 不存在"
elif [ -z "$MAC_DMG" ]; then
  log "[5.5/7] 跳过: 无 mac dmg，无法确定 github 直链"
fi

# ---- 6) 提交 + 打 tag(同版本重发可覆盖) + 推送 ----
# 注意：只提交「源文件」（appcast.xml + version.json + 官网源），安装包(dmg/pkg/exe/msi)走 GitHub Release，不进 git
log "[6/7] 提交并推送 (只提交源文件，安装包走 GitHub Release 不进 git) ..."
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
log "      当前分支=$BRANCH，暂存: appcast.xml version.json assets/js/main.js downloads/README.md 脚本本身"
git add appcast.xml version.json assets/js/main.js downloads/README.md "$0"
if git commit -m "Release $TAG" >/dev/null 2>&1; then
  log "      [ok] 已提交 commit: Release $TAG"
else
  log "      [提示] 无新变更，跳过提交"
fi

if git rev-parse "$TAG" >/dev/null 2>&1; then
  EXISTING="$(git rev-parse "$TAG")"
  CURRENT="$(git rev-parse HEAD)"
  if [ "$EXISTING" != "$CURRENT" ]; then
    log "      [提示] tag $TAG 已存在且指向旧 commit，强制覆盖 (re-release)"
    git tag -f "$TAG"
    git push -f origin "$TAG"
    log "      [ok] tag $TAG 已强制推送"
  else
    log "      [ok] tag $TAG 已指向当前 commit，跳过"
  fi
else
  git tag "$TAG"
  log "      [ok] 打 tag $TAG"
  git push origin "$TAG"
fi
log "      推送分支 $BRANCH 到 origin ..."
git push origin "$BRANCH"
log "[6/7] 提交与推送完成"

# ---- 7) 创建 GitHub Release (下载链接最稳，无 LFS 带宽配额) ----
if [ "$PUBLISH_RELEASE" = "true" ]; then
  log "[7/7] 创建/更新 GitHub Release ($TAG) 并上传安装包 ..."
  if gh release view "$TAG" >/dev/null 2>&1; then
    log "      Release $TAG 已存在，追加/覆盖 asset"
  else
    gh release create "$TAG" --title "SampleDir $TAG" --notes "SampleDir $TAG"
    log "      [ok] 创建 Release $TAG"
  fi
  for f in "${PRODUCTS[@]}"; do
    if [ -e "$f" ]; then
      log "      [上传] $(basename "$f") → Release $TAG ..."
      gh release upload "$TAG" "$f" --clobber
      log "      [ok] 已上传 $(basename "$f")"
    fi
  done
else
  log "[7/7] 跳过 Release 创建 (PUBLISH_RELEASE=false)"
fi

log ""
log "[完成] tag=$TAG  仓库=$GH_REPO"
log "       appcast.xml 已生成并提交到 SampleDir (Cloudflare Pages 托管)"
log "       安装包作为 Release asset 上传 (不走 git LFS)"
log "       下载链接: $BASE"
