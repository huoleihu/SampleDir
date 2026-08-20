# downloads/ — 官网下载产物目录

本目录存放 SampleDir 官网「下载」区引用的安装包。部署前请确保以下文件存在：

| 文件 | 说明 | 如何生成 |
| --- | --- | --- |
| `SampleDir-portable.zip` | 便携版（自带 JRE + ffmpeg，双击 `SampleDir.sh` 运行） | 运行项目根目录 `package-portable.sh` 后，把 `build/portable/SampleDir-portable.zip` 复制到此 |
| `SampleDir.dmg` | macOS 安装版（拖入 Applications） | 运行 `gradle packageDmg` 生成 `.app` 后自行打成 dmg（当前未配置签名，需后续补充） |

## 更新版本时的操作
1. 重新打包，得到新的 `SampleDir-portable.zip`。
2. 覆盖本目录同名文件即可，官网页面无需改动。
3. 如需更换版本号，改 `index.html` 里 Hero 区域的 `v1.0` 文案。

> 注意：便携版与 dmg 当前均为**未签名**产物。首次打开若被系统拦截，请右键 → 打开，
> 或执行 `xattr -cr /Applications/SampleDir.app` 解除隔离。
