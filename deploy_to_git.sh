#!/bin/bash
# =============================================================================
#  deploy_to_git.sh — SampleDir 官网「仅部署到 git」脚本
#
#  与 sh_package_to_githubPT.sh 的区别:
#    那个脚本是「打包 → 收集产物 → 生成 appcast.xml → 同步 version.json
#    → 提交 → 打 tag → 推送 → 上传 GitHub Release」。
#    本脚本只做最后一步的 git 部分: 把官网源文件(含已手动改好的
#    appcast.xml / version.json / html/css/js 等)提交并推送到 main，
#    由 Cloudflare Pages 自动重新部署。不打包、不上传二进制、不打 tag
#    (除非显式开启)。
#
#  适用场景:
#    • 手动改了官网文案/样式/version.json，想直接上线。
#    • 已用 sh_package_to_githubPT.sh 打过包，只想补提交某些源文件改动。
#    • 想在不发新版的情况下，把 appcast.xml/version.json 的修改推上去。
#
#  用法:
#    ./deploy_to_git.sh                 # 仅提交 + 推送 main
#    PUBLISH_TAG=1 ./deploy_to_git.sh   # 额外按 version.json 的 version 打 tag vX.Y.Z 并推送
#    ./deploy_to_git.sh "文案微调"       # 自定义 commit 说明
#    FORCE_DEPLOY=1 ./deploy_to_git.sh  # 无改动时也打一个空提交强制触发 Cloudflare 重新部署
#
#  设计原则:
#    • 安装包(dmg/pkg/exe/msi) 绝不进 git；若被误加入暂存区，脚本直接中止。
#    • Cloudflare Pages 在 git push 后自动部署，无需本脚本操心。
# =============================================================================
set -e

# ---- 日志 ----
log() { echo "$(date +'%H:%M:%S') $*"; }

RELEASES_REPO="${RELEASES_REPO:-$HOME/ai_workbuddy/webs/SampleDir}"
BRANCH="main"
PUBLISH_TAG="${PUBLISH_TAG:-0}"
FORCE_DEPLOY="${FORCE_DEPLOY:-0}"
COMMIT_MSG="${1:-Deploy site update}"

# ---- 1) 进入仓库 ----
log "[1/3] 进入仓库 $RELEASES_REPO ..."
cd "$RELEASES_REPO"

# 清理可能残留的 index.lock（上次 git 异常退出/并发进程会留下，否则后续 git 直接 fatal 静默退出）
rm -f .git/index.lock 2>/dev/null || true

# ---- 2) 暂存全部网站源文件(遵循 .gitignore)，并防御二进制 ----
log "[2/3] 暂存改动并防御性检查 ..."
git add -A

# 若有误加入的安装包，直接中止，绝不提交二进制
BAD=$(git diff --cached --name-only | grep -iE '\.(dmg|pkg|exe|msi)$' || true)
if [ -n "$BAD" ]; then
  log "[错误] 检测到安装包被加入暂存区，已中止(以下文件不会提交):"
  printf '      %s\n' "$BAD"
  git reset -q -- "$BAD"
  exit 1
fi

# 没有任何变更则视情况处理
if git diff --cached --quiet; then
  if [ "$FORCE_DEPLOY" = "1" ]; then
    log "[提示] 无改动，按 FORCE_DEPLOY 打空提交以触发 Cloudflare 重新部署 ..."
    git commit --allow-empty -m "chore: force redeploy"
  else
    log "[完成] 没有可提交的改动，仓库已是最新 (Cloudflare 不会重新部署)"
    log "        如需强制重新部署，运行: FORCE_DEPLOY=1 $0 \"说明\""
    exit 0
  fi
else
  log "      本次将提交以下文件:"
  git diff --cached --name-only | sed 's/^/      /'
  if git commit -m "$COMMIT_MSG"; then
    log "[ok] 已提交: $COMMIT_MSG"
  else
    log "[错误] 提交失败 (详见上方 git 报错)"
    exit 1
  fi
fi

# ---- 3) 推送 + 可选 tag ----
log "[3/3] 推送到 origin/$BRANCH ..."
git push origin "$BRANCH"
log "[ok] 已推送 $BRANCH (Cloudflare Pages 将自动重新部署)"

if [ "$PUBLISH_TAG" = "1" ]; then
  VERSION="$(python3 -c "import json,sys; print(json.load(open('version.json')).get('version',''))" 2>/dev/null || true)"
  if [ -n "$VERSION" ]; then
    TAG="v$VERSION"
    if git rev-parse "$TAG" >/dev/null 2>&1; then
      log "[提示] tag $TAG 已存在，跳过打 tag"
    else
      git tag "$TAG"
      git push origin "$TAG"
      log "[ok] 已打 tag $TAG 并推送"
    fi
  else
    log "[提示] version.json 无 version，跳过打 tag"
  fi
fi

log ""
log "[完成] 官网已部署到 git (仓库: huoleihu/SampleDir)"
