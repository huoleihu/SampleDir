# downloads/ — 官网下载产物目录

本目录原用于存放 SampleDir 官网「下载」区直接分发的安装包。自 v1.0.1 起，安装包改为通过网盘与 GitHub Release 分发，本目录不再存放二进制文件，仅保留说明文档。

## 当前分发方式

> 注意：网盘渠道（百度 / 夸克）已于 v1.0.4 后全部取消，官网下载区只保留官方 CDN 与 GitHub Release。

| 来源 | 链接来源 | 说明 |
| --- | --- | --- |
| 官方 CDN | `version.json` 的 `downloads.r2` | 官网「官方下载」按钮，浏览器点开时带 Referer 才放行 |
| GitHub Release | `version.json` 的 `downloads.github` | 适合海外网络或需要历史版本的用户 |
| Windows 官方 CDN | `downloads.windows.exe` | 由 win 发布脚本 step5 写入 |
| Windows GitHub | `downloads.windows.github` | 由 win 发布脚本 step5 写入 |

## 更新版本时的操作

1. 重新打包，得到新的 `SampleDir-{VERSION}-arm64.dmg`。
2. 上传到 GitHub Release 的对应 tag（由 `sh_package_to_githubPT.sh` 自动完成）。
3. 写入 `version.json`：
   - `version`：当前版本号，例如 `"1.0.1"`。
   - `downloads.r2`：官方 CDN 直链（由 mac 发布脚本 `step03_package_to_github_to_r2.sh` 自动写入）。
   - `downloads.github`：GitHub Release dmg 直链，例如 `https://github.com/huoleihu/SampleDir/releases/download/v1.0.1/SampleDir-1.0.1-arm64.dmg`。
   - `downloads.windows`：Windows 产物直链（由 win 发布脚本 `step_win_package_and_publish.sh` step5 写入）。
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
