// SampleDir 官网交互脚本（中 / 英 / 韩 / 日四语）
(function () {
  'use strict';

  /* ============ 1. 多语字典 ============ */
  var I18N = {
    zh: {
      'meta.title': 'SampleDir · macOS 采样素材库管理器',
      'meta.desc': 'SampleDir 是一款为音乐制作人打造的 macOS 采样素材库管理器：本地优先、可视化波形、智能试听、标签收藏，所有元数据随文件夹走。',
      'nav.home': 'SampleDir 首页',
      'nav.features': '功能',
      'nav.showcase': '界面',
      'nav.how': '上手',
      'nav.download': '下载',
      'nav.contact': '联系方式',
      'nav.pricing': '价格',
      'nav.github': 'GitHub',
      'contact.h2': '联系方式',
      'contact.p': '产品建议、问题反馈，欢迎邮件联系。',
      'nav.cta': '下载',
      'nav.buy': '购买',
      'lang.switch': '切换语言',
      'hero.pill': '为音乐制作人打造',
      'hero.buy': '购买',
      'hero.title': '把采样素材库<br/>整理得像作品一样干净',
      'hero.sub': 'SampleDir 是一款本地优先的采样素材库管理器。可视化波形、智能试听、标签与收藏，所有备注和标记都随文件夹一起走——换电脑也不丢。',
      'hero.download': '下载 for macOS',
      'hero.download.win': '下载 for Windows',
      'hero.explore': '了解功能',
      'hero.free': '免费',
      'hero.nocloud': '无账号 · 无云端',
      'strip1.b': '本地优先', 'strip1.s': '数据存你硬盘，不上传任何云端',
      'strip2.b': '随文件夹走', 'strip2.s': '元数据写在 .sampledir.json 里',
      'strip3.b': '极速试听', 'strip3.s': '双击即播，方向键连续试听',
      'strip4.b': '内置引擎', 'strip4.s': '自带 JRE 与 ffmpeg，开箱即用',
      'features.h2': '一站式管理你的采样',
      'features.p': '从扫描到试听，从标记到检索，SampleDir 把零散的采样变成可检索的素材库。',
      'c1.h': '文件夹即库', 'c1.p': '把任意文件夹加入库，自动递归扫描 WAV / AIFF / MP3 / FLAC，按 BPM、Key 自动识别命名规律。',
      'c2.h': '双击即试听', 'c2.p': '双击任意采样立即播放；↑↓ 方向键连续试听，Enter 从头重播，Space 暂停 / 恢复。',
      'c3.h': '可视化波形', 'c3.p': '1200 点 RMS 波形精准呈现，点击波形任意位置即可从该处跳播，听段落更顺手。',
      'c4.h': '搜索与筛选', 'c4.p': '按文件名、备注、标签关键词秒搜；左侧标签云一键筛选，⌘F 聚焦、Esc 清空。',
      'c5.h': '收藏与评分', 'c5.p': '行首一键收藏，支持命名收藏夹分组；五星评分，优质素材一眼锁定。',
      'c6.h': '备注与标签', 'c6.p': '选中即写备注、打标签，2 秒自动防抖保存，全部可搜索、可筛选。',
      'c7.h': '自定义列表', 'c7.p': '表头拖拽调顺序、调宽度、显隐列，点击排序；所有布局配置持久化保存。',
      'c8.h': '随文件夹走', 'c8.p': '备注、标签、评分、收藏写入文件夹内的 .sampledir.json，复制 / 备份 / 换机零丢失。',
      'show.h2': '所见即所得的三栏工作台',
      'show.p': '左侧目录与标签，中间海量采样列表，右侧详情与波形——一切尽在掌握。',
      'mock.search': '🔍 搜索采样、备注、标签…',
      'mock.col.name': '名称', 'mock.col.dur': '时长',
      'mock.note': '备注：适合 drop 前奏…',
      'sp1': '<b>智能试听</b>双击即播，方向键连续试听整张素材库。',
      'sp2': '<b>波形跳播</b>点击波形任意位置从该处开始播放。',
      'sp3': '<b>信息密集</b>时长、Key、BPM、格式、大小、评分一屏尽览。',
      'sp4': '<b>专注检索</b>左侧标签云与收藏夹，快速定位想要的声音。',
      'how.h2': '三步，把素材库跑起来',
      'how.p': '无需注册、无需配置，下载即用。',
      'step1.h': '添加文件夹', 'step1.p': '点击左侧 + 或菜单「功能 → 添加文件夹」，选择你的采样目录，SampleDir 自动递归扫描。',
      'step2.h': '试听与标记', 'step2.p': '双击试听、方向键连续播放；给好素材加星、写备注、打标签，随手整理。',
      'step3.h': '随时检索', 'step3.p': '搜索框输入关键词，或点左侧标签 / 收藏夹秒筛；元数据随文件夹永久保存。',
      'dl.h2': '下载 SampleDir',
      'dl.p': '支持 Apple Silicon（M 系列）macOS。官方 CDN 与 GitHub Release 两种渠道，按你的网络环境选。',
      'dl.p.win': '支持 Windows 10+ x64。官方 CDN 与 GitHub Release 两种渠道，按你的网络环境选。',
      'dl3.h': 'GitHub Release', 'dl3.p': '从 GitHub Release 下载最新版 dmg，适合海外网络或需要历史版本的用户。',
      'dl3.btn': 'GitHub 下载', 'dl3.req': '约 160 MB · macOS 11+',
      'dl5.h': '本站下载', 'dl5.p': '由官方服务器全球直发，不限速、无需提取码，支持 macOS 11+（Apple Silicon）。',
      'dl5.btn': '本站下载', 'dl5.req': '约 160 MB · macOS 11+ · 全球直发',
      'dl.win.h': 'Windows 版', 'dl.win.p': 'Windows x64 安装包由官方 CDN 全球直发，不限速、无需提取码，支持 Windows 10+。', 'dl.win.btn': '本站下载', 'dl.win.req': '约 102 MB · Windows 10+ · x64 · 全球直发',
      'dl.wingh.h': 'GitHub Release', 'dl.wingh.p': '从 GitHub Release 下载 Windows 安装包，适合海外网络或需要历史版本的用户。', 'dl.wingh.btn': 'GitHub 下载', 'dl.wingh.req': '约 102 MB · Windows 10+ · x64',
      'dl.winmsi.h': 'Windows MSI 安装包', 'dl.winmsi.p': '面向企业批量部署的 MSI 安装包，同样支持 Windows 10+ x64。', 'dl.winmsi.btn': 'MSI 下载', 'dl.winmsi.req': '仅当发布脚本产出 msi 时显示',
      'dl.notes.h': '更新日志',
      'dl.note': '⚠️ 软件当前为<strong>未签名</strong>版本。首次打开若被系统拦截，请在「访达」中<strong>右键 → 打开</strong>，或在终端执行 <code>xattr -cr /Applications/SampleDir.app</code> 解除隔离。',
      'dl.pricingNote': '买断 89 USD · 或年付 49 USD/年 · 均支持 14 天免费试用',
      'price.h2': '价格',
      'price.p': '永久买断或按年订阅，先免费试用 14 天，满意再买。',
      'price.badge': '永久买断',
      'price.term': '89 USD · 一次付费，终身使用',
      'price.f1': '一次付费，终身使用',
      'price.f2': '14 天免费试用，无需注册',
      'price.f3': '无订阅 · 无隐藏费用',
      'price.cta': '免费试用 14 天',
      'price.hint': '下载页提供官方 CDN 与 GitHub Release 两种渠道',
      'price.2.badge': '按年订阅', 'price.2.per': '/年', 'price.2.term': '每年付费 · 到期可续',
      'price.2.f1': '按年付费，每年 49 USD', 'price.2.f2': '14 天免费试用，无需注册', 'price.2.f3': '可随时取消 · 到期停更',
      'price.2.cta': '免费试用 14 天', 'price.buy': '购买', 'price.2.hint': '与买断版功能完全一致',
      'price.0.badge': '免费试用', 'price.0.unit': '天', 'price.0.term': '免费 · 全功能 · 无需注册',
      'price.0.f1': '下载即用，14 天全功能无限制', 'price.0.f2': '无需注册 · 无需信用卡', 'price.0.f3': '到期后自行决定是否购买',
      'price.0.cta': '立即免费下载', 'price.0.hint': '到期后可选 49 USD/年 或 89 USD 买断',
      'footer.help': '帮助文档', 'footer.terms': '用户协议', 'footer.privacy': '隐私政策',
      'footer.copy': '© 2026 SampleDir · 本地优先的采样素材库管理器 · Made by ssxm'
    },
    en: {
      'meta.title': 'SampleDir · macOS Sample Library Manager',
      'meta.desc': 'SampleDir is a macOS sample library manager for music producers: local-first, visual waveforms, smart audition, tags & favorites — all metadata travels with your folders.',
      'nav.home': 'SampleDir Home',
      'nav.features': 'Features',
      'nav.showcase': 'Interface',
      'nav.how': 'Get Started',
      'nav.download': 'Download',
      'nav.contact': 'Contact',
      'nav.pricing': 'Pricing',
      'nav.github': 'GitHub',
      'contact.h2': 'Contact',
      'contact.p': 'Suggestions or feedback? Email us anytime.',
      'nav.cta': 'Download',
      'nav.buy': 'Buy',
      'lang.switch': '切换语言',
      'hero.pill': 'Built for music producers',
      'hero.buy': 'Buy',
      'hero.title': 'Keep your sample library<br/>as tidy as your productions',
      'hero.sub': 'SampleDir is a local-first sample library manager. Visual waveforms, smart audition, tags & favorites — all notes and marks travel with your folders, so nothing is lost when you switch machines.',
      'hero.download': 'Download for macOS',
      'hero.download.win': 'Download for Windows',
      'hero.explore': 'Explore features',
      'hero.free': 'Free',
      'hero.nocloud': 'No account · No cloud',
      'strip1.b': 'Local-first', 'strip1.s': 'Data stays on your disk, never uploaded to any cloud',
      'strip2.b': 'Travels with folders', 'strip2.s': 'Metadata is written into .sampledir.json',
      'strip3.b': 'Instant audition', 'strip3.s': 'Double-click to play, arrow keys to preview',
      'strip4.b': 'Built-in engine', 'strip4.s': 'Ships with its own JRE & ffmpeg, ready to run',
      'features.h2': 'Manage your samples in one place',
      'features.p': 'From scanning to auditioning, from tagging to retrieval — SampleDir turns scattered samples into a searchable library.',
      'c1.h': 'Folders as library', 'c1.p': 'Add any folder to your library; WAV / AIFF / MP3 / FLAC are scanned recursively, with BPM and Key auto-detected from file names.',
      'c2.h': 'Double-click to audition', 'c2.p': 'Double-click any sample to play instantly; ↑↓ to preview continuously, Enter to replay from start, Space to pause / resume.',
      'c3.h': 'Visual waveform', 'c3.p': 'A 1200-point RMS waveform renders precisely; click anywhere on it to jump-play from that position.',
      'c4.h': 'Search & filter', 'c4.p': 'Instant search by file name, notes, or tags; filter with one click via the tag cloud on the left, ⌘F to focus, Esc to clear.',
      'c5.h': 'Favorites & ratings', 'c5.p': 'One-click favorite at the row head, with named collections; five-star ratings to lock onto your best material.',
      'c6.h': 'Notes & tags', 'c6.p': 'Write notes and add tags on selection, auto-saved after a 2-second debounce; everything is searchable and filterable.',
      'c7.h': 'Customizable list', 'c7.p': 'Drag headers to reorder, resize, or show/hide columns; click to sort; all layout settings persist.',
      'c8.h': 'Travels with folders', 'c8.p': 'Notes, tags, ratings, and favorites are written into the folder\'s .sampledir.json — zero loss on copy, backup, or machine switch.',
      'show.h2': 'A three-pane workspace, WYSIWYG',
      'show.p': 'Folder tree and tags on the left, a massive sample list in the middle, details and waveform on the right — everything at your command.',
      'mock.search': '🔍 Search samples, notes, tags…',
      'mock.col.name': 'Name', 'mock.col.dur': 'Dur',
      'mock.note': 'Note: great for the drop intro…',
      'sp1': '<b>Smart audition</b>Double-click to play; arrow keys preview the whole library in sequence.',
      'sp2': '<b>Waveform scrubbing</b>Click anywhere on the waveform to start playback from there.',
      'sp3': '<b>Information-dense</b>Duration, Key, BPM, format, size, and rating all on one screen.',
      'sp4': '<b>Focused retrieval</b>Tag cloud and favorite folders on the left to quickly locate the sound you want.',
      'how.h2': 'Get your library running in three steps',
      'how.p': 'No sign-up, no setup — download and use.',
      'step1.h': 'Add folders', 'step1.p': 'Click + on the left or "Features → Add Folder" in the menu, pick your sample directory, and SampleDir scans it recursively.',
      'step2.h': 'Audition & tag', 'step2.p': 'Double-click to audition, arrow keys to play continuously; star, note, and tag your best material as you go.',
      'step3.h': 'Retrieve anytime', 'step3.p': 'Type a keyword in the search box, or click a tag / favorite folder to filter instantly; metadata is saved with the folder forever.',
      'dl.h2': 'Download SampleDir',
      'dl.p': 'For Apple Silicon (M-series) macOS. Official CDN and GitHub Release — pick what works for your network.',
      'dl.p.win': 'For Windows 10+ x64. Official CDN and GitHub Release — pick what works for your network.',
      'dl3.h': 'GitHub Release', 'dl3.p': 'Download the latest dmg from GitHub Release. Best for overseas networks or users who want older releases.',
      'dl3.btn': 'Download from GitHub', 'dl3.req': '~160 MB · macOS 11+',
      'dl5.h': 'Direct Download', 'dl5.p': 'Served directly from our global CDN — no speed limits, no extraction code. Supports macOS 11+ (Apple Silicon).',
      'dl5.btn': 'Direct Download', 'dl5.req': '~160 MB · macOS 11+ · Global CDN',
      'dl.win.h': 'Windows Version', 'dl.win.p': 'The Windows x64 installer is served directly from our global CDN — no speed limits, no extraction code. Supports Windows 10+ (x64).', 'dl.win.btn': 'Direct Download', 'dl.win.req': '~102 MB · Windows 10+ · x64 · Global CDN',
      'dl.wingh.h': 'GitHub Release', 'dl.wingh.p': 'Download the latest Windows installer from GitHub Release. Best for overseas networks or users who want older releases.', 'dl.wingh.btn': 'Download from GitHub', 'dl.wingh.req': '~102 MB · Windows 10+ · x64',
      'dl.winmsi.h': 'Windows MSI Installer', 'dl.winmsi.p': 'The MSI installer for bulk / enterprise deployment. Also supports Windows 10+ x64.', 'dl.winmsi.btn': 'Download MSI', 'dl.winmsi.req': 'Shown only when the release ships an msi',
      'dl.notes.h': "What's New",
      'dl.note': '⚠️ The app is currently <strong>unsigned</strong>. If macOS blocks the first launch, right-click → Open in Finder, or run <code>xattr -cr /Applications/SampleDir.app</code> in Terminal to remove the quarantine.',
      'dl.pricingNote': 'Buy once 89 USD · or 49 USD/year · both include a 14-day free trial',
      'price.h2': 'Pricing',
      'price.p': 'Buy once or subscribe yearly. Try it free for 14 days — buy only if you love it.',
      'price.badge': 'One-time purchase',
      'price.term': '89 USD · One payment, lifetime use',
      'price.f1': 'One payment, lifetime use',
      'price.f2': '14-day free trial, no sign-up',
      'price.f3': 'No subscription · No hidden fees',
      'price.cta': 'Start 14-day free trial',
      'price.hint': 'Official CDN and GitHub Release available on the download page',
      'price.2.badge': 'Yearly', 'price.2.per': '/yr', 'price.2.term': 'Pay yearly · renew anytime',
      'price.2.f1': 'Pay yearly, 49 USD per year', 'price.2.f2': '14-day free trial, no sign-up', 'price.2.f3': 'Cancel anytime · expires if not renewed',
      'price.2.cta': 'Start 14-day free trial', 'price.buy': 'Buy Now', 'price.2.hint': 'Same features as the lifetime plan',
      'price.0.badge': 'Free Trial', 'price.0.unit': 'days', 'price.0.term': 'Free · Full features · No sign-up',
      'price.0.f1': 'Download and run — every feature for 14 days', 'price.0.f2': 'No registration · No credit card', 'price.0.f3': 'Buy only if you love it',
      'price.0.cta': 'Download Free Now', 'price.0.hint': 'After the trial: 49 USD/yr or 89 USD lifetime',
      'footer.help': 'Help', 'footer.terms': 'Terms of Service', 'footer.privacy': 'Privacy Policy',
      'footer.copy': '© 2026 SampleDir · A local-first sample library manager · Made by ssxm'
    },
    ko: {
      'meta.title': 'SampleDir · macOS 샘플 라이브러리 매니저',
      'meta.desc': 'SampleDir은 음악 프로듀서를 위한 macOS 샘플 라이브러리 매니저입니다: 로컬 우선, 시각적 파형, 스마트 프리뷰, 태그 & 즐겨찾기 — 모든 메타데이터가 폴더와 함께 이동합니다.',
      'nav.home': 'SampleDir 홈',
      'nav.features': '기능',
      'nav.showcase': '화면',
      'nav.how': '시작하기',
      'nav.download': '다운로드',
      'nav.contact': '연락처',
      'nav.pricing': '가격',
      'nav.github': 'GitHub',
      'contact.h2': '연락처',
      'contact.p': '제품 제안이나 피드백이 있으시면 언제든 이메일로 연락 주세요.',
      'nav.cta': '다운로드',
      'nav.buy': '구매',
      'lang.switch': '언어 전환',
      'hero.pill': '음악 프로듀서를 위해',
      'hero.buy': '구매',
      'hero.title': '샘플 라이브러리를<br/>작업물처럼 깔끔하게',
      'hero.sub': 'SampleDir은 로컬 우선 샘플 라이브러리 매니저입니다. 시각적 파형, 스마트 프리뷰, 태그와 즐겨찾기 — 모든 메모와 표시가 폴더와 함께 이동하므로 컴퓨터를 바꿔도 잃어버리지 않습니다.',
      'hero.download': 'macOS용 다운로드',
      'hero.download.win': 'Windows용 다운로드',
      'hero.explore': '기능 알아보기',
      'hero.free': '무료',
      'hero.nocloud': '계정 없음 · 클라우드 없음',
      'strip1.b': '로컬 우선', 'strip1.s': '데이터는 내 하드 디스크에만, 어떤 클라우드에도 업로드하지 않습니다',
      'strip2.b': '폴더와 함께', 'strip2.s': '메타데이터는 .sampledir.json에 저장됩니다',
      'strip3.b': '즉시 프리뷰', 'strip3.s': '더블클릭 재생, 방향키 연속 프리뷰',
      'strip4.b': '내장 엔진', 'strip4.s': 'JRE와 ffmpeg 포함, 바로 실행 가능',
      'features.h2': '샘플을 한곳에서 관리하세요',
      'features.p': '스캔부터 프리뷰, 태그 지정부터 검색까지 — SampleDir이 흩어진 샘플을 검색 가능한 라이브러리로 바꿔드립니다.',
      'c1.h': '폴더가 곧 라이브러리', 'c1.p': '어떤 폴더든 라이브러리에 추가하면 WAV / AIFF / MP3 / FLAC을 재귀적으로 스캔하고, 파일명에서 BPM과 Key를 자동으로 파악합니다.',
      'c2.h': '더블클릭 프리뷰', 'c2.p': '샘플을 더블클릭하면 즉시 재생됩니다. ↑↓ 방향키로 연속 프리뷰, Enter로 처음부터 재생, Space로 일시정지 / 재개.',
      'c3.h': '시각적 파형', 'c3.p': '1200포인트 RMS 파형을 정밀하게 렌더링합니다. 파형의 아무 위치나 클릭하면 그 지점부터 재생됩니다.',
      'c4.h': '검색 & 필터', 'c4.p': '파일명, 메모, 태그로 즉시 검색. 왼쪽 태그 클라우드로 한 번에 필터, ⌘F로 포커스, Esc로 초기화.',
      'c5.h': '즐겨찾기 & 평점', 'c5.p': '행 앞쪽에서 한 번에 즐겨찾기. 이름 있는 컬렉션으로 그룹핑, 5성 평점으로 좋은 소재를 한눈에.',
      'c6.h': '메모 & 태그', 'c6.p': '선택 즉시 메모 작성과 태그 추가, 2초 디바운스로 자동 저장. 모든 것이 검색·필터 가능합니다.',
      'c7.h': '사용자 정의 목록', 'c7.p': '헤더를 드래그해 순서·너비 조정, 열 표시/숨김, 클릭 정렬. 모든 레이아웃 설정이 저장됩니다.',
      'c8.h': '폴더와 함께 이동', 'c8.p': '메모, 태그, 평점, 즐겨찾기가 폴더 안의 .sampledir.json에 저장됩니다. 복사 / 백업 / 기기 변경에도 손실 없음.',
      'show.h2': '보이는 그대로, 3단 워크스페이스',
      'show.p': '왼쪽에 폴더 트리와 태그, 가운데에 방대한 샘플 목록, 오른쪽에 상세 정보와 파형 — 모든 것이 손안에.',
      'mock.search': '🔍 샘플, 메모, 태그 검색…',
      'mock.col.name': '이름', 'mock.col.dur': '길이',
      'mock.note': '메모: 드롭 인트로에 딱…',
      'sp1': '<b>스마트 프리뷰</b>더블클릭으로 재생, 방향키로 전체 라이브러리를 순서대로 프리뷰.',
      'sp2': '<b>파형 스크러빙</b>파형의 아무 위치나 클릭하면 그 지점부터 재생됩니다.',
      'sp3': '<b>정보 밀집</b>길이, Key, BPM, 형식, 크기, 평점을 한 화면에.',
      'sp4': '<b>빠른 검색</b>왼쪽 태그 클라우드와 즐겨찾기 폴더로 원하는 사운드를 빠르게 찾으세요.',
      'how.h2': '3단계로 라이브러리 시작하기',
      'how.p': '회원가입도 설정도 없이, 다운로드 후 바로 사용.',
      'step1.h': '폴더 추가', 'step1.p': '왼쪽 + 또는 메뉴의 "기능 → 폴더 추가"를 클릭하고 샘플 디렉터리를 선택하면 SampleDir이 재귀적으로 스캔합니다.',
      'step2.h': '프리뷰 & 태그', 'step2.p': '더블클릭으로 프리뷰, 방향키로 연속 재생. 좋은 소재에 별점, 메모, 태그를 붙여가며 정리하세요.',
      'step3.h': '언제든 검색', 'step3.p': '검색창에 키워드를 입력하거나 태그 / 즐겨찾기 폴더를 클릭해 즉시 필터. 메타데이터는 폴더와 함께 영구 저장됩니다.',
      'dl.h2': 'SampleDir 다운로드',
      'dl.p': 'Apple Silicon(M 시리즈) macOS를 지원합니다. 공식 CDN과 GitHub Release 중 네트워크에 맞는 방법을 선택하세요.',
      'dl.p.win': 'Windows 10 이상 x64를 지원합니다. 공식 CDN과 GitHub Release 중 네트워크에 맞는 방법을 선택하세요.',
      'dl3.h': 'GitHub Release', 'dl3.p': 'GitHub Release에서 최신 dmg를 다운로드. 해외 네트워크 또는 이전 버전이 필요한 사용자에게 적합.',
      'dl3.btn': 'GitHub에서 다운로드', 'dl3.req': '약 160 MB · macOS 11+',
      'dl5.h': '직접 다운로드', 'dl5.p': '공식 서버에서 전 세계로 직접 전송하며 속도 제한 없이 추출 코드도 필요 없습니다. macOS 11+(Apple Silicon) 지원.',
      'dl5.btn': '직접 다운로드', 'dl5.req': '약 160 MB · macOS 11+ · 전 세계 직발송',
      'dl.win.h': 'Windows 버전', 'dl.win.p': 'Windows x64 설치 파일은 공식 CDN에서 제한 없이, 추출 코드 없이 내려받을 수 있습니다. Windows 10+ 지원.', 'dl.win.btn': '직접 다운로드', 'dl.win.req': '약 102 MB · Windows 10+ · x64 · 글로벌 CDN',
      'dl.wingh.h': 'GitHub Release', 'dl.wingh.p': '해외 네트워크 또는 이전 버전이 필요한 사용자를 위해 GitHub Release에서 Windows 설치 파일을 받을 수 있습니다.', 'dl.wingh.btn': 'GitHub에서 다운로드', 'dl.wingh.req': '약 102 MB · Windows 10+ · x64',
      'dl.winmsi.h': 'Windows MSI 설치 파일', 'dl.winmsi.p': '기업/대량 배포용 MSI 설치 파일입니다. Windows 10+ x64를 지원합니다.', 'dl.winmsi.btn': 'MSI 다운로드', 'dl.winmsi.req': '릴리스에 msi가 있을 때만 표시',
      'dl.notes.h': '업데이트 내역',
      'dl.note': '⚠️ 현재 <strong>서명되지 않은</strong> 버전입니다. 처음 실행이 차단되면 Finder에서 <strong>우클릭 → 열기</strong>를 하거나, 터미널에서 <code>xattr -cr /Applications/SampleDir.app</code>을 실행해 격리를 해제하세요.',
      'dl.pricingNote': '평생 89 USD · 또는 연 49 USD · 모두 14일 무료 체험 포함',
      'price.h2': '가격',
      'price.p': '평생 라이선스 또는 연간 구독. 먼저 14일 무료 체험 후 결정하세요.',
      'price.badge': '평생 라이선스',
      'price.term': '89 USD · 한 번 결제, 평생 사용',
      'price.f1': '한 번 결제, 평생 사용',
      'price.f2': '14일 무료 체험, 가입 불필요',
      'price.f3': '구독 없음 · 숨은 비용 없음',
      'price.cta': '14일 무료 체험 시작',
      'price.hint': '다운로드 페이지에서 공식 CDN / GitHub Release 제공',
      'price.2.badge': '연간 구독', 'price.2.per': '/년', 'price.2.term': '매년 결제 · 기간 만료 시 갱신',
      'price.2.f1': '연간 결제, 매년 49 USD', 'price.2.f2': '14일 무료 체험, 가입 불필요', 'price.2.f3': '언제든 취소 가능 · 미갱신 시 정지',
      'price.2.cta': '14일 무료 체험 시작', 'price.buy': '구매', 'price.2.hint': '평생 라이선스와 기능 동일',
      'price.0.badge': '무료 체험', 'price.0.unit': '일', 'price.0.term': '무료 · 전체 기능 · 가입 불필요',
      'price.0.f1': '다운로드 후 14일간 전체 기능 무제한', 'price.0.f2': '가입 불필요 · 신용카드 불필요', 'price.0.f3': '체험 후 구매 여부 결정',
      'price.0.cta': '지금 무료 다운로드', 'price.0.hint': '체험 후 연 49 USD 또는 89 USD 평생권',
      'footer.help': '도움말', 'footer.terms': '이용 약관', 'footer.privacy': '개인정보 처리방침',
      'footer.copy': '© 2026 SampleDir · 로컬 우선 샘플 라이브러리 매니저 · Made by ssxm'
    },
    ja: {
      'meta.title': 'SampleDir · macOS サンプルライブラリマネージャー',
      'meta.desc': 'SampleDirは音楽プロデューサーのためのmacOSサンプルライブラリマネージャーです：ローカル優先、視覚的な波形、スマート試聴、タグ＆お気に入り — すべてのメタデータがフォルダと一緒に移動します。',
      'nav.home': 'SampleDir ホーム',
      'nav.features': '機能',
      'nav.showcase': '画面',
      'nav.how': 'はじめ方',
      'nav.download': 'ダウンロード',
      'nav.contact': 'お問い合わせ',
      'nav.pricing': '料金',
      'nav.github': 'GitHub',
      'contact.h2': 'お問い合わせ',
      'contact.p': 'ご提案やフィードバックは、いつでもメールでお送りください。',
      'nav.cta': 'ダウンロード',
      'nav.buy': '購入',
      'lang.switch': '言語を切り替え',
      'hero.pill': '音楽プロデューサーのために',
      'hero.buy': '購入',
      'hero.title': 'サンプルライブラリを<br/>作品のようにきれいに',
      'hero.sub': 'SampleDirはローカル優先のサンプルライブラリマネージャーです。視覚的な波形、スマート試聴、タグとお気に入り — すべてのメモとマークはフォルダと一緒に移動するので、パソコンを変えても失いません。',
      'hero.download': 'macOS版をダウンロード',
      'hero.download.win': 'Windows版をダウンロード',
      'hero.explore': '機能を見る',
      'hero.free': '無料',
      'hero.nocloud': 'アカウント不要 · クラウドなし',
      'strip1.b': 'ローカル優先', 'strip1.s': 'データは自分のハードディスクに。クラウドには一切アップロードしません',
      'strip2.b': 'フォルダと一緒に', 'strip2.s': 'メタデータは .sampledir.json に保存',
      'strip3.b': '即時試聴', 'strip3.s': 'ダブルクリックで再生、矢印キーで連続試聴',
      'strip4.b': '内蔵エンジン', 'strip4.s': 'JREとffmpegを同梱、すぐに使えます',
      'features.h2': 'サンプルをひとつの場所で管理',
      'features.p': 'スキャンから試聴、タグ付けから検索まで — SampleDirが散らばったサンプルを検索可能なライブラリに変えます。',
      'c1.h': 'フォルダ＝ライブラリ', 'c1.p': '任意のフォルダをライブラリに追加すると、WAV / AIFF / MP3 / FLACを再帰的にスキャンし、ファイル名からBPMとKeyを自動判別します。',
      'c2.h': 'ダブルクリックで試聴', 'c2.p': 'サンプルをダブルクリックすると即再生。↑↓ 矢印キーで連続試聴、Enterで最初から再生、Spaceで一時停止 / 再開。',
      'c3.h': '視覚的な波形', 'c3.p': '1200ポイントのRMS波形を精密に描画。波形の好きな場所をクリックすると、その位置から再生します。',
      'c4.h': '検索とフィルター', 'c4.p': 'ファイル名・メモ・タグで即検索。左のタグクラウドでワンクリックフィルター、⌘Fでフォーカス、Escでクリア。',
      'c5.h': 'お気に入りと評価', 'c5.p': '行頭でワンクリックお気に入り。名前付きコレクションでグループ化、5段階評価で良い素材を一目で。',
      'c6.h': 'メモとタグ', 'c6.p': '選択するとすぐメモ・タグを編集、2秒のデバウンスで自動保存。すべて検索・フィルター可能です。',
      'c7.h': 'カスタムリスト', 'c7.p': 'ヘッダーをドラッグして順序・幅・表示列を調整、クリックでソート。レイアウト設定はすべて保存されます。',
      'c8.h': 'フォルダと一緒に移動', 'c8.p': 'メモ・タグ・評価・お気に入りはフォルダ内の .sampledir.json に保存。コピー / バックアップ / 機種変更でも失いません。',
      'show.h2': '見たままの3ペイン ワークスペース',
      'show.p': '左にフォルダツリーとタグ、中央に膨大なサンプルリスト、右に詳細と波形 — すべて手の届く場所に。',
      'mock.search': '🔍 サンプル、メモ、タグを検索…',
      'mock.col.name': '名前', 'mock.col.dur': '長さ',
      'mock.note': 'メモ：ドロップのイントロに最適…',
      'sp1': '<b>スマート試聴</b>ダブルクリックで再生、矢印キーでライブラリ全体を順に試聴。',
      'sp2': '<b>波形スクラブ</b>波形の任意の場所をクリックすると、その位置から再生します。',
      'sp3': '<b>情報密度</b>長さ、Key、BPM、形式、サイズ、評価を1画面に。',
      'sp4': '<b>高速検索</b>左のタグクラウドとお気に入りフォルダで、欲しい音をすぐ見つけられます。',
      'how.h2': '3ステップでライブラリを開始',
      'how.p': '登録も設定も不要。ダウンロードしてすぐ使えます。',
      'step1.h': 'フォルダを追加', 'step1.p': '左の + またはメニューの「機能 → フォルダ追加」をクリックし、サンプルフォルダを選ぶと自動で再帰スキャンします。',
      'step2.h': '試聴とタグ付け', 'step2.p': 'ダブルクリックで試聴、矢印キーで連続再生。良い素材に星・メモ・タグを付けながら整理しましょう。',
      'step3.h': 'いつでも検索', 'step3.p': '検索ボックスにキーワードを入力するか、タグ / お気に入りフォルダをクリックして即フィルター。メタデータはフォルダと一緒に永久保存されます。',
      'dl.h2': 'SampleDir をダウンロード',
      'dl.p': 'Apple Silicon（Mシリーズ）macOSに対応。公式CDNとGitHub Releaseから、ネットワーク環境に合わせて選べます。',
      'dl.p.win': 'Windows 10+ x64に対応。公式CDNとGitHub Releaseから、ネットワーク環境に合わせて選べます。',
      'dl3.h': 'GitHub Release', 'dl3.p': 'GitHub Releaseから最新のdmgをダウンロード。海外ネットワークや過去のバージョンが必要なユーザー向け。',
      'dl3.btn': 'GitHubからダウンロード', 'dl3.req': '約160 MB · macOS 11+',
      'dl5.h': '直接ダウンロード', 'dl5.p': '公式サーバーから全世界へ直接配信。速度制限なし、抽出コード不要。macOS 11+（Apple Silicon）対応。',
      'dl5.btn': '直接ダウンロード', 'dl5.req': '約160 MB · macOS 11+ · 全世界直送',
      'dl.win.h': 'Windows 版', 'dl.win.p': 'Windows x64 インストーラーは公式 CDN から正方形限なし・抽出コードなしで配信されます。Windows 10+ 対応。', 'dl.win.btn': '直接ダウンロード', 'dl.win.req': '约 102 MB · Windows 10+ · x64 · グローバル CDN',
      'dl.wingh.h': 'GitHub Release', 'dl.wingh.p': 'GitHub Release から Windows インストーラーをダウンロード。海外回線や過去バージョンが必要な方に最適です。', 'dl.wingh.btn': 'GitHub からダウンロード', 'dl.wingh.req': '约 102 MB · Windows 10+ · x64',
      'dl.winmsi.h': 'Windows MSI インストーラー', 'dl.winmsi.p': '企業向けの一括配布用 MSI インストーラーです。Windows 10+ x64 に対応します。', 'dl.winmsi.btn': 'MSI をダウンロード', 'dl.winmsi.req': 'msi が included の場合のみ表示',
      'dl.notes.h': '更新履歴',
      'dl.note': '⚠️ 現在<strong>署名なし</strong>バージョンです。初回起動がブロックされた場合は、Finderで<strong>右クリック → 開く</strong>、またはターミナルで <code>xattr -cr /Applications/SampleDir.app</code> を実行して隔離を解除してください。',
      'dl.pricingNote': '買い切り 89 USD · または年額 49 USD/年 · いずれも 14 日間無料トライアル付き',
      'price.h2': '料金',
      'price.p': '買い切りまたは年額プラン。まずは 14 日間無料でお試しください。',
      'price.badge': '買い切り',
      'price.term': '89 USD · 一度の支払いで永久利用',
      'price.f1': '一度の支払いで永久に使える',
      'price.f2': '14 日間の無料トライアル、登録不要',
      'price.f3': 'サブスクなし · 隠れた費用なし',
      'price.cta': '14 日間無料トライアル',
      'price.hint': 'ダウンロードページで 公式CDN / GitHub Release から選択できます',
      'price.2.badge': '年額プラン', 'price.2.per': '/年', 'price.2.term': '年額支払い · 更新可能',
      'price.2.f1': '年額支払い、年間 49 USD', 'price.2.f2': '14 日間の無料トライアル、登録不要', 'price.2.f3': 'いつでもキャンセル可 · 未更新で停止',
      'price.2.cta': '14 日間無料トライアル', 'price.buy': '購入', 'price.2.hint': '買い切り版と機能は同じ',
      'price.0.badge': '無料トライアル', 'price.0.unit': '日間', 'price.0.term': '無料 · 全機能 · 登録不要',
      'price.0.f1': 'ダウンロード後 14 日間すべての機能を無制限に使用可能', 'price.0.f2': '登録不要 · クレジットカード不要', 'price.0.f3': '試用後に購入するか決められる',
      'price.0.cta': '今すぐ無料ダウンロード', 'price.0.hint': '試用後は 49 USD/年 または 89 USD 買い切り',
      'footer.help': 'ヘルプ',
      'footer.terms': '利用規約', 'footer.privacy': 'プライバシー',
      'footer.copy': '© 2026 SampleDir · ローカル優先のサンプルライブラリマネージャー · Made by ssxm'
    }
  };

  var STORE_KEY = 'sampledir_lang';
  var LANGS = ['zh', 'en', 'ko', 'ja'];
  var LANG_MAP = { zh: 'zh-CN', en: 'en', ko: 'ko', ja: 'ja' };

  // 语言路径映射：中文（主语言）在根，其余在 /en/ /ko/ /ja/。
  // URL 即语言 —— 与 index.html head 里的重定向脚本、canonical/hreflang 生成保持一致。
  function pathLang() {
    var m = (location.pathname || '/').match(/^\/(en|ko|ja)(\/|$)/);
    return m ? m[1] : null;
  }
  function langPath(lang) {
    return lang === 'zh' ? '/' : '/' + lang + '/';
  }

  function getLang() {
    // ① 路径前缀最高优先级：URL 就是语言（SEO 关键）。
    //    Google 抓 / 渲染中文版、抓 /en/ 渲染英文版，各自独立索引、互不吞权重。
    var p = pathLang();
    if (p) return p;

    // ② 旧 ?lang= 参数（兼容老外链；head 脚本通常已把人换成新路径）
    var params = null;
    try { params = new URLSearchParams(location.search); } catch (e) {}
    if (params) {
      var ql = params.get('lang');
      if (LANGS.indexOf(ql) !== -1) return ql;
    }

    // ③ 根路径：head 脚本已按访客习惯重定向到对应语言路径，
    //    走到这里的是中文访客或爬虫 —— 一律按主语言中文渲染，
    //    保证「根 URL 渲染中文 + canonical 指根」，不再出现语言与 canonical 错配。
    return 'zh';
  }

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.zh;
    document.documentElement.lang = LANG_MAP[lang] || 'zh-CN';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html');
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      if (dict[k] != null) el.setAttribute('aria-label', dict[k]);
    });

    var titleEl = document.querySelector('[data-i18n-title]');
    if (titleEl && dict['meta.title'] != null) titleEl.textContent = dict['meta.title'];
    var metaEl = document.querySelector('[data-i18n-meta]');
    if (metaEl && dict['meta.desc'] != null) metaEl.setAttribute('content', dict['meta.desc']);

    // 页脚静态页链接跟随语言（韩/日暂指向英文帮助页）；用绝对路径，
    // 这样在 /en/、/ja/ 这类语言路径下也不会解析成 /en/help.html 而 404。
    var helpLink = document.getElementById('helpLink');
    if (helpLink) helpLink.setAttribute('href', lang === 'zh' ? '/help.html' : '/help_en.html');
    var termsLink = document.getElementById('termsLink');
    if (termsLink) termsLink.setAttribute('href', lang === 'zh' ? '/terms.html' : '/terms_en.html');
    var privacyLink = document.getElementById('privacyLink');
    if (privacyLink) privacyLink.setAttribute('href', lang === 'zh' ? '/privacy.html' : '/privacy_en.html');

    // 语言下拉框同步
    var sel = document.getElementById('langSelect');
    if (sel && sel.value !== lang) sel.value = lang;

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}

    // 语言切换时同步重渲染「更新日志」（数据来自 version.json.notes）
    if (typeof renderReleaseNotes === 'function') renderReleaseNotes();

    // 平台化导语：Windows 访客显示 dl.p.win，macOS 保持原来的 dl.p（逻辑零变化）
    applyPlatformIntro();
  }

  // 浏览器是否为 Windows（客户端「检查更新」的自动下载也靠这个判定分流）
  function isWinBrowser() {
    return /Windows|Win32|Win64|Trident/.test(navigator.userAgent || '');
  }

  // 下载区导语按平台切换：仅 Windows 访客替换文案，其余平台不动。
  function applyPlatformIntro() {
    var el = document.getElementById('dlIntro');
    if (!el) return;
    var lang = typeof current !== 'undefined' && current ? current : getLang();
    var dict = I18N[lang] || I18N.zh;
    var isWin = isWinBrowser();
    var useWinCopy = isWin && dict['dl.p.win'] != null;
    var key = useWinCopy ? 'dl.p.win' : 'dl.p';
    if (dict[key] != null) el.textContent = dict[key];
  }

  // Hero 区下载按钮按 UA 分流：只调顺序（Windows 访客把「下载 for Windows」排前面），
  // 不再切换 primary/ghost——hero 区按用户要求全部用描边样式，不做亮绿填充（2026-10-08 定稿）。
  // 与下载区按 UA 预选 Windows 面板、自动下载按 UA 点 dlWinR2 保持一致。
  function applyHeroPlatform() {
    var mac = document.getElementById('heroDlMac');
    var win = document.getElementById('heroDlWin');
    if (!mac || !win) return;
    var actions = mac.parentNode;
    if (isWinBrowser()) {
      if (mac.nextSibling !== win) actions.insertBefore(win, mac);
    } else {
      if (win.nextSibling !== mac) actions.insertBefore(mac, win);
    }
  }

  var current = getLang();
  applyLang(current);
  applyHeroPlatform();

  var sel = document.getElementById('langSelect');
  if (sel) {
    sel.addEventListener('change', function () {
      current = sel.value;
      applyLang(current); // 立即切换文案，并把偏好写进 localStorage
      // 语言切换 = 跳到对应语言路径（/ 、/en/ 、/ko/ 、/ja/）：
      // 让 URL 与 canonical 始终一致，切换后的地址也能直接分享/被搜到。
      var target = langPath(current) + (location.hash || '');
      if ((location.pathname + location.search + location.hash) !== target) {
        location.assign(target);
      }
    });
  }

  /* ============ 2. 移动端菜单 ============ */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  /* ============ 3. 滚动揭示动画 ============ */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
  // 兜底：若 IntersectionObserver 因缓存/异常未触发，window 加载后强制显示，内容绝不卡在隐形
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
    }, 1000);
  });

  /* ============ 4. 导航栏滚动加阴影 ============ */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = (window.scrollY > 8) ? '0 6px 20px rgba(0,0,0,.35)' : 'none';
    }, { passive: true });
  }
  /* ============ 5. 从 version.json 拉取最新版本号与下载链接 ============ */
  // 缓存的更新日志（语言切换时按当前语言重渲染）
  var RELEASE_NOTES = null;

  function renderReleaseNotes() {
    var box = document.getElementById('releaseNotes');
    var list = document.getElementById('releaseNotesList');
    if (!box || !list || !RELEASE_NOTES) return;

    // document.documentElement.lang 形如 zh-CN / en / ko-KR / ja-JP
    var short = (document.documentElement.lang || 'zh-CN').slice(0, 2).toLowerCase();
    var arr = RELEASE_NOTES[short] || RELEASE_NOTES.en || RELEASE_NOTES.zh || [];
    if (!arr.length) { box.hidden = true; return; }

    list.innerHTML = '';
    arr.forEach(function (line) {
      var li = document.createElement('li');
      li.textContent = line;
      list.appendChild(li);
    });
    box.hidden = false;
  }

  // 下载区平台 tab 切换 (macOS / Windows)
  (function initPlatformTabs() {
    var tabs = document.querySelectorAll('.dl-tab');
    if (!tabs.length) return;
    var panelMacos = document.getElementById('dlPanelMacos');
    var panelWin = document.getElementById('dlPanelWindows');

    // 切换（或初始化）到指定平台 tab：Windows 访客默认落在 Windows 面板，
    // macOS 访客保持 HTML 默认的 macOS 面板 —— mac 侧行为与改动前完全一致。
    function selectPlatform(platform) {
      var isMac = platform !== 'windows';
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-platform') === platform;
        t.classList.toggle('is-active', on);
        if (on) t.setAttribute('aria-selected', 'true'); else t.setAttribute('aria-selected', 'false');
      });
      if (panelMacos) panelMacos.hidden = !isMac;
      if (panelWin) panelWin.hidden = isMac;
      applyPlatformIntro();
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        selectPlatform(tab.getAttribute('data-platform'));
      });
    });

    // hero 区两个下载按钮：点击后除锚点跳转到 #download 外，同步把下载区 tab 切到对应平台
    var heroMac = document.getElementById('heroDlMac');
    var heroWin = document.getElementById('heroDlWin');
    if (heroMac) heroMac.addEventListener('click', function () { selectPlatform('macos'); });
    if (heroWin) heroWin.addEventListener('click', function () { selectPlatform('windows'); });

    // 首次进入按浏览器平台预选 tab（用户不手动点则一直保持）
    selectPlatform(isWinBrowser() ? 'windows' : 'macos');
  })();

  // 下载区卡片高亮跟随：悬停（或键盘聚焦）哪张，哪张的下载按钮亮绿；
  // 鼠标移开后高亮停留在最后一张（每个 tab 面板独立记忆），不再弹回第一张。
  (function initLitCard() {
    document.querySelectorAll('.downloads').forEach(function (panel) {
      var cards = panel.querySelectorAll('.dl');
      if (!cards.length) return;
      function lit(target) {
        cards.forEach(function (c) { c.classList.toggle('is-lit', c === target); });
      }
      cards.forEach(function (card, i) {
        var btn = card.querySelector('.btn');
        // 默认亮绿原本写死在第一张的 btn--primary 上，改为统一由 is-lit 控制；
        // 必须补上 btn--ghost，否则裸 .btn 透明无边框，亮绿移走后左侧按钮只剩文字。
        if (btn) { btn.classList.remove('btn--primary'); btn.classList.add('btn--ghost'); }
        if (i === 0) card.classList.add('is-lit');
        card.addEventListener('mouseenter', function () { lit(card); });
        card.addEventListener('focusin', function () { lit(card); });
      });
    });
  })();

  (function fetchVersionJson() {
    fetch('version.json')
      .then(function (r) { return r.json(); })
      .then(function (json) {
        var v = json.version || '';
        var downloads = json.downloads || {};

        // 更新 Hero 区版本号
        if (v) {
          var heroVer = document.getElementById('heroVersion');
          if (heroVer) heroVer.textContent = 'v' + v + ' \u00B7 Apple Silicon';
        }

        // 更新百度网盘下载按钮 (version.json 的 downloads.Baidu 由用户维护)
        // 更新 GitHub 下载按钮
        var dlGithub = document.getElementById('dlGithub');
        if (dlGithub && downloads.github) dlGithub.setAttribute('href', downloads.github);

        // 更新官方下载按钮 (version.json 的 downloads.r2 由发布脚本 upload_to_r2.sh 自动写入)
        var dlR2 = document.getElementById('dlR2');
        if (dlR2 && downloads.r2) dlR2.setAttribute('href', downloads.r2);

        // 更新 Windows 下载按钮 (version.json 的 downloads.windows 由 win 发布脚本 step5 写入)
        var winDl = downloads.windows || {};
        var dlWinR2 = document.getElementById('dlWinR2');
        if (dlWinR2 && winDl.exe) dlWinR2.setAttribute('href', winDl.exe);
        var dlWinGithub = document.getElementById('dlWinGithub');
        if (dlWinGithub && winDl.github) dlWinGithub.setAttribute('href', winDl.github);
        var dlWinMsi = document.getElementById('dlWinMsi');
        var dlWinMsiCard = document.getElementById('dlWinMsiCard');
        // 仅当发布脚本确实产出了 msi 时才显示该卡（默认 HTML 里是 hidden）
        if (dlWinMsi && winDl.msi) {
          dlWinMsi.setAttribute('href', winDl.msi);
          if (dlWinMsiCard) dlWinMsiCard.hidden = false;
        }

        // 若是从 App「检查更新」带 #download 锚点进来的，href 填好即自动触发下载
        tryAutoDownload();

        // 缓存更新日志并按当前语言渲染
        RELEASE_NOTES = json.notes || null;
        renderReleaseNotes();
      })
      .catch(function () {
        // version.json 读不到时保持页面默认静态文案与链接
      });
  })();

  // 联系方式邮箱：从后端字典接口拉取（经同源 /api 代理转发到 api.macdh.com，无跨域问题）。
  // 接口返回 { code, message, data: "邮箱地址" }；拉取成功则替换页面所有 mailto 链接与展示文案；
  // 失败（如 GitHub Pages 镜像站无 Functions 代理 → 404）时静默保留 HTML 中的硬编码兜底邮箱。
  (function initContactEmail() {
    fetch('/api/dict/public/contact_email', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (json) {
        var email = json && json.data;
        if (!email || typeof email !== 'string' || email.indexOf('@') < 0) return;
        document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
          a.setAttribute('href', 'mailto:' + email);
          if (a.textContent) a.textContent = email;
        });
      })
      .catch(function () { /* 保留 HTML 硬编码兜底邮箱 */ });
  })();

  // === 仅从 App「检查更新」跳转（带 ?autodl=1#download 标记）进入时才自动下载 ===
  // 由 UpdateDialog 的下载按钮打开本页并带标记+锚点，等价于「自动点击页面上的下载按钮」。
  // 普通浏览官网 / 手动敲 #download（无标记）均不会自动下载。
  // 轮询等待 version.json 把 dlR2 的 href 从默认 '#' 填成真实直链后再点，避免点到空链接。
  // ⚠️ 本标签页只自动下载一次：query 参数 ?autodl=1 在页面内导航时会一直保留
  // （如 ?autodl=1#contact → 点导航下载 → ?autodl=1#download），若不记账会反复触发。
  // 用 sessionStorage 记账：同一标签页触发过一次后，页面内任意导航/锚点切换均不再触发；
  // 只有新开标签页（如再次从 App 点下载）才重新允许。
  var AUTO_DL_FLAG = 'sampledir_autodl_fired';
  function tryAutoDownload() {
    var h = (location.hash || '').toLowerCase();
    // 仅当同时满足「带 #download 锚点」+「带 ?autodl=1 标记」才自动下载。
    // ?autodl=1 由客户端（App 检查更新的下载按钮）跳转时带上；普通浏览官网、
    // 或用户手动在地址栏敲 #download（不带标记）都不会自动下载。
    var params = new URLSearchParams(location.search);
    if ((h !== '#download' && h !== '#downloads') || !params.has('autodl')) return;
    if (sessionStorage.getItem(AUTO_DL_FLAG)) return; // 本标签页已下载过，不再触发
    // Windows 访客从 App 点「下载」→ 自动跳 exe 直链；macOS 仍走 dlR2（dmg）。
    // 客户端 DOWNLOAD_PAGE_URL 是 mac/windows 共用的，这里按浏览器平台分流，
    // 保证 Windows 用户不会误下到 macOS dmg。
    var btn = document.getElementById(isWinBrowser() ? 'dlWinR2' : 'dlR2');
    if (!btn) return;
    var href = btn.getAttribute('href');
    if (!href || href === '#') {
      setTimeout(tryAutoDownload, 300); // 等 version.json 填充（最多 ~2s）
      return;
    }
    sessionStorage.setItem(AUTO_DL_FLAG, '1'); // 先记账再导航，防 location.assign 失败时重复触发
    // 用同标签导航而非 btn.click()：自动点击发生在 fetch/setTimeout 回调里（非用户手势），
    // 浏览器弹窗拦截器会拦截 target=_blank 的新标签打开，表现为「点了但没反应」。
    // 同标签 assign 不被拦截；且当 href 是真实文件直链时浏览器会直接下载该文件。
    //
    // ⚠️ 必须先「瞬间滚到下载区」再导航，否则用户会停在页面顶部（只有 Hero，看不到下载面板）：
    // 站点 CSS 是 html{scroll-behavior:smooth}，锚点 #download 的滚动是平滑动画；而
    // Windows 的 dlWinR2 链接是写死的真实 exe 地址，脚本在解析阶段就 location.assign 导航，
    // 平滑滚动动画被导航打断 → 滚不动。mac 侧 #dlR2 初始是 '#'、要等 version.json 那一拍，
    // 平滑滚动早已跑完，所以 mac 看起来正常（行为保持 100% 不变）。
    var fireDownload = function () {
      var sec = document.getElementById('download');
      if (sec) {
        // behavior:'instant' 强制瞬时滚动，绕开 CSS 的 smooth；老浏览器退回 'auto'/'默认'
        try { sec.scrollIntoView({ block: 'start', behavior: 'instant' }); }
        catch (e) {
          try { sec.scrollIntoView({ block: 'start' }); } catch (e2) {}
        }
      }
      window.location.assign(href);
    };
    // 等文档加载完成（布局稳定）后再滚 + 触发下载，留一拍让滚动先渲染出来
    if (document.readyState === 'complete') {
      setTimeout(fireDownload, 120);
    } else {
      window.addEventListener('load', function () { setTimeout(fireDownload, 120); }, { once: true });
    }
  }
  window.addEventListener('hashchange', tryAutoDownload);
  tryAutoDownload(); // 直接带锚点打开页面时初次触发
})();
