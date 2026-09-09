# downloads/ — 官网下载产物目录

本目录原用于存放 SampleDir 官网「下载」区直接分发的安装包。自 v1.0.1 起，安装包改为通过网盘与 GitHub Release 分发，本目录不再存放二进制文件，仅保留说明文档。

## 当前分发方式

| 来源 | 链接来源 | 说明 |
| --- | --- | --- |
| 123云盘 | `version.json` 的 `downloads.123` | 适合国内网络 |
| 夸克网盘 | `version.json` 的 `downloads.kuake` | 适合国内网络 |
| GitHub Release | `version.json` 的 `downloads.github` | 适合海外网络或需要历史版本的用户 |

## 更新版本时的操作

1. 重新打包，得到新的 `SampleDir-{VERSION}-arm64.dmg`。
2. 上传到 GitHub Release 的对应 tag（由 `sh_package_to_githubPT.sh` 自动完成）。
3. 更新网盘分享链接，并写入 `version.json`：
   - `version`：当前版本号，例如 `"1.0.1"`。
   - `downloads.123`：123云盘分享链接。
   - `downloads.kuake`：夸克网盘分享链接。
   - `downloads.github`：GitHub Release dmg 直链，例如 `https://github.com/huoleihu/SampleDir/releases/download/v1.0.1/SampleDir-1.0.1-arm64.dmg`。
   - `notes`：更新日志，**数组结构**，按语言分键、每条为一项，例如：
     ```json
     "notes": {
       "zh": ["修复 XX 问题", "新增 XX 功能"],
       "en": ["Fixed XX", "Added XX"]
     }
     ```
     官网下载区会按当前语言自动渲染为「更新日志」列表；`ko`/`ja` 缺省时回退到 `en`。
4. 提交并推送 `version.json`，官网会自动读取最新版本号、下载链接与更新日志。

> 注意：dmg 当前为**未签名**产物。首次打开若被系统拦截，请右键 → 打开，
> 或执行 `xattr -cr /Applications/SampleDir.app` 解除隔离。
