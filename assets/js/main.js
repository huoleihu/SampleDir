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
      'nav.github': 'GitHub',
      'contact.h2': '联系方式',
      'contact.p': '产品建议、问题反馈，欢迎邮件联系。',
      'nav.cta': '免费下载',
      'nav.buy': '购买',
      'lang.switch': '切换语言',
      'hero.pill': '为音乐制作人打造',
      'hero.buy': '购买',
      'hero.title': '把采样素材库<br/>整理得像作品一样干净',
      'hero.sub': 'SampleDir 是一款本地优先的采样素材库管理器。可视化波形、智能试听、标签与收藏，所有备注和标记都随文件夹一起走——换电脑也不丢。',
      'hero.download': '下载 for macOS',
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
      'dl.p': '支持 Apple Silicon（M 系列）macOS。两种分发方式，按你的习惯选。',
      'dl1.h': '便携版（推荐）', 'dl1.p': '自带 JRE 与 ffmpeg，解压后双击 SampleDir.sh 即可运行，无需安装。',
      'dl1.btn': '下载 .zip', 'dl1.req': '约 160 MB · macOS 12+',
      'dl2.h': '安装版 .dmg', 'dl2.p': '标准 macOS 安装包，拖入 Applications 即可。需先执行打包脚本生成。',
      'dl2.btn': '下载 .dmg', 'dl2.req': '需运行 packageDmg 构建',
      'dl.note': '⚠️ 软件当前为<strong>未签名</strong>版本。首次打开若被系统拦截，请在「访达」中<strong>右键 → 打开</strong>，或在终端执行 <code>xattr -cr /Applications/SampleDir.app</code> 解除隔离。',
      'footer.help': '帮助文档',
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
      'nav.github': 'GitHub',
      'contact.h2': 'Contact',
      'contact.p': 'Suggestions or feedback? Email us anytime.',
      'nav.cta': 'Free Download',
      'nav.buy': 'Buy',
      'lang.switch': '切换语言',
      'hero.pill': 'Built for music producers',
      'hero.buy': 'Buy',
      'hero.title': 'Keep your sample library<br/>as tidy as your productions',
      'hero.sub': 'SampleDir is a local-first sample library manager. Visual waveforms, smart audition, tags & favorites — all notes and marks travel with your folders, so nothing is lost when you switch machines.',
      'hero.download': 'Download for macOS',
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
      'dl.p': 'For Apple Silicon (M-series) macOS. Two distribution options — pick your preference.',
      'dl1.h': 'Portable (recommended)', 'dl1.p': 'Ships with JRE & ffmpeg; unzip and double-click SampleDir.sh to run — no installation needed.',
      'dl1.btn': 'Download .zip', 'dl1.req': '~160 MB · macOS 12+',
      'dl2.h': 'Installer .dmg', 'dl2.p': 'Standard macOS installer, drag into Applications. Requires running the packaging script first.',
      'dl2.btn': 'Download .dmg', 'dl2.req': 'Built via packageDmg',
      'dl.note': '⚠️ The app is currently <strong>unsigned</strong>. If macOS blocks the first launch, right-click → Open in Finder, or run <code>xattr -cr /Applications/SampleDir.app</code> in Terminal to remove the quarantine.',
      'footer.help': 'Help',
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
      'nav.github': 'GitHub',
      'contact.h2': '연락처',
      'contact.p': '제품 제안이나 피드백이 있으시면 언제든 이메일로 연락 주세요.',
      'nav.cta': '무료 다운로드',
      'nav.buy': '구매',
      'lang.switch': '언어 전환',
      'hero.pill': '음악 프로듀서를 위해',
      'hero.buy': '구매',
      'hero.title': '샘플 라이브러리를<br/>작업물처럼 깔끔하게',
      'hero.sub': 'SampleDir은 로컬 우선 샘플 라이브러리 매니저입니다. 시각적 파형, 스마트 프리뷰, 태그와 즐겨찾기 — 모든 메모와 표시가 폴더와 함께 이동하므로 컴퓨터를 바꿔도 잃어버리지 않습니다.',
      'hero.download': 'macOS용 다운로드',
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
      'dl.p': 'Apple Silicon(M 시리즈) macOS를 지원합니다. 취향에 맞는 두 가지 배포 방식.',
      'dl1.h': '포터블 (권장)', 'dl1.p': 'JRE와 ffmpeg 포함, 압축 해제 후 SampleDir.sh를 더블클릭하면 실행됩니다. 설치 불필요.',
      'dl1.btn': '.zip 다운로드', 'dl1.req': '약 160 MB · macOS 12+',
      'dl2.h': '설치형 .dmg', 'dl2.p': '표준 macOS 설치 패키지, Applications에 드래그하면 끝. 먼저 패키징 스크립트를 실행해야 합니다.',
      'dl2.btn': '.dmg 다운로드', 'dl2.req': 'packageDmg 빌드 필요',
      'dl.note': '⚠️ 현재 <strong>서명되지 않은</strong> 버전입니다. 처음 실행이 차단되면 Finder에서 <strong>우클릭 → 열기</strong>를 하거나, 터미널에서 <code>xattr -cr /Applications/SampleDir.app</code>을 실행해 격리를 해제하세요.',
      'footer.help': '도움말',
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
      'nav.github': 'GitHub',
      'contact.h2': 'お問い合わせ',
      'contact.p': 'ご提案やフィードバックは、いつでもメールでお送りください。',
      'nav.cta': '無料ダウンロード',
      'nav.buy': '購入',
      'lang.switch': '言語を切り替え',
      'hero.pill': '音楽プロデューサーのために',
      'hero.buy': '購入',
      'hero.title': 'サンプルライブラリを<br/>作品のようにきれいに',
      'hero.sub': 'SampleDirはローカル優先のサンプルライブラリマネージャーです。視覚的な波形、スマート試聴、タグとお気に入り — すべてのメモとマークはフォルダと一緒に移動するので、パソコンを変えても失いません。',
      'hero.download': 'macOS版をダウンロード',
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
      'dl.p': 'Apple Silicon（Mシリーズ）macOSに対応。お好みの2つの配布方法。',
      'dl1.h': 'ポータブル版（推奨）', 'dl1.p': 'JREとffmpeg同梱。解凍して SampleDir.sh をダブルクリックするだけ。インストール不要。',
      'dl1.btn': '.zip をダウンロード', 'dl1.req': '約160 MB · macOS 12+',
      'dl2.h': 'インストーラー .dmg', 'dl2.p': '標準のmacOSインストールパッケージ。Applicationsへドラッグするだけ。事前にパッケージングスクリプトの実行が必要です。',
      'dl2.btn': '.dmg をダウンロード', 'dl2.req': 'packageDmg でビルドが必要',
      'dl.note': '⚠️ 現在<strong>署名なし</strong>バージョンです。初回起動がブロックされた場合は、Finderで<strong>右クリック → 開く</strong>、またはターミナルで <code>xattr -cr /Applications/SampleDir.app</code> を実行して隔離を解除してください。',
      'footer.help': 'ヘルプ',
      'footer.copy': '© 2026 SampleDir · ローカル優先のサンプルライブラリマネージャー · Made by ssxm'
    }
  };

  var STORE_KEY = 'sampledir_lang';
  var LANGS = ['zh', 'en', 'ko', 'ja'];
  var LANG_MAP = { zh: 'zh-CN', en: 'en', ko: 'ko', ja: 'ja' };

  function getLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (LANGS.indexOf(saved) !== -1) return saved;

    // 首次访问：根据机器区域自动选择（优先系统区域，浏览器语言兜底）
    // ① Intl 的 resolvedOptions 反映系统区域设置（比 navigator.language 更接近"机器区域"）
    var locale = '';
    try { locale = (Intl.DateTimeFormat().resolvedOptions().locale || '').toLowerCase(); } catch (e) {}
    if (locale.indexOf('zh') === 0) return 'zh';
    if (locale.indexOf('ko') === 0) return 'ko';
    if (locale.indexOf('ja') === 0) return 'ja';

    // ② 时区兜底：系统时区在上海/首尔/东京时区，语言大概率也对应（浏览器可能被设成英文）
    var tz = '';
    try { tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase(); } catch (e) {}
    if (tz.indexOf('shanghai') !== -1 || tz.indexOf('chongqing') !== -1 ||
        tz.indexOf('harbin') !== -1 || tz.indexOf('urumqi') !== -1) return 'zh';
    if (tz.indexOf('seoul') !== -1) return 'ko';
    if (tz.indexOf('tokyo') !== -1) return 'ja';

    // ③ 最后兜底浏览器语言
    var nav = (navigator.language || '').toLowerCase();
    if (nav.indexOf('zh') === 0) return 'zh';
    if (nav.indexOf('ko') === 0) return 'ko';
    if (nav.indexOf('ja') === 0) return 'ja';
    return 'en';
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

    // 帮助页链接跟随语言（韩/日暂指向英文帮助页）
    var helpLink = document.getElementById('helpLink');
    if (helpLink) helpLink.setAttribute('href', lang === 'zh' ? 'help.html' : 'help_en.html');

    // 语言下拉框同步
    var sel = document.getElementById('langSelect');
    if (sel && sel.value !== lang) sel.value = lang;

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  var current = getLang();
  applyLang(current);

  var sel = document.getElementById('langSelect');
  if (sel) {
    sel.addEventListener('change', function () {
      current = sel.value;
      applyLang(current);
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

  /* ============ 4. 导航栏滚动加阴影 ============ */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = (window.scrollY > 8) ? '0 6px 20px rgba(0,0,0,.35)' : 'none';
    }, { passive: true });
  }
  /* ============ 5. 从 Gitee 拉取最新版本信息，动态更新下载链接 ============ */
  (function fetchVersion() {
    var API = 'https://gitee.com/api/v5/repos/huoleihu/myversion/contents/kt_SampleDir.txt';
    fetch(API)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        // Gitee API 返回 base64 编码的文件内容
        var json = JSON.parse(atob(data.content));
        var v = json.version || '';

        // 更新 Hero 区的版本号
        var heroVer = document.getElementById('heroVersion');
        if (heroVer && v) heroVer.textContent = 'v' + v + ' \u00B7 Apple Silicon';

        // 更新 123 云盘下载按钮
        var dl123 = document.getElementById('dl123');
        if (dl123 && json.url) dl123.setAttribute('href', json.url);

        // 更新夸克网盘下载按钮
        var dlQuark = document.getElementById('dlQuark');
        if (dlQuark && json.url2) dlQuark.setAttribute('href', json.url2);
      })
      .catch(function () {
        // Gitee 连不上时保持页面默认的静态链接，不做任何事
      });
  })();
})();
