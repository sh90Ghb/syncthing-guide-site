export const TAOBAO_PRODUCT_URL =
  'https://item.taobao.com/item.htm?ft=t&id=1101981496365&skuId=6323194691359';

export interface PlatformPairing {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  architecture: string;
  includedFiles: string[];
  setupDifficulty: string;
  pitfallTip: string;
  useCase: string;
  portsNote: string;
}

export interface SyncModeDemo {
  id: 'sendreceive' | 'sendonly' | 'receiveonly';
  name: string;
  englishName: string;
  recommendedFor: string;
  deviceAAction: string;
  deviceBOutcome: string;
  deleteRule: string;
  summary: string;
}

export interface BeginnerStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  checklist: string[];
  proTip: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  category: string;
  answer: string;
}

export interface PlatformDetailRow {
  os: string;
  versions: string;
  packageName: string;
  autoStart: string;
  notes: string;
}

export const HERO_METRICS = [
  {
    value: '0 元/月',
    label: '彻底告别云盘会员续费',
  },
  {
    value: '100+ MB/s',
    label: '局域网千兆满速直传不限速',
  },
  {
    value: '6 大平台',
    label: 'Win / Mac / Linux / 安卓 / iOS / NAS',
  },
  {
    value: 'TLS 1.3',
    label: '点对点端到端加密传输',
  },
];

export const PLATFORM_PAIRINGS: PlatformPairing[] = [
  {
    id: 'win-android',
    label: 'Windows ↔ 安卓手机',
    title: '电脑办公文档与安卓手机相册双向极速互通',
    subtitle: '最受新手欢迎的组合：手机拍完照片回家自动进电脑硬盘，电脑文档出门手机随时查看',
    architecture: 'Windows 10/11 (x64/ARM64) · Android 8.0 - 15',
    includedFiles: [
      'Windows 免黑框中文托盘整合端（支持开机自启）',
      'Android 稳定版 Syncthing-Fork 客户端 APK',
      '华为 / 小米 / OPPO / vivo 后台防杀保活图解',
    ],
    setupDifficulty: '新手极简 · 约 5 分钟',
    pitfallTip:
      '小白常遇到 Windows 首次弹出防火墙提示误点「取消」，或手机锁屏后被系统省电策略杀后台；整合包附带一键放行指引与国产手机保活图解。',
    useCase: '手机相册无损备份、微信接收文件自动归档至电脑、外出临时改 PPT',
    portsNote: '局域网 UDP 21027 自动发现 · 主传输 TCP/QUIC 22000',
  },
  {
    id: 'win-mac',
    label: 'Windows ↔ macOS',
    title: '公司 Windows 台式机与家里 MacBook 无缝接力',
    subtitle: '下班合上电脑直接回家继续干活，再也不用拿 U 盘拷来拷去或发微信文件传输助手',
    architecture: 'Windows 10/11 · macOS Intel & Apple Silicon (M1-M4)',
    includedFiles: [
      'Windows 托盘整合安装程序',
      'macOS 原生状态栏客户端（通用二进制包）',
      '跨系统垃圾文件自动忽略规则模板 (.stignore)',
    ],
    setupDifficulty: '新手极简 · 约 6 分钟',
    pitfallTip:
      'Windows 和 Mac 混用时最容易把 .DS_Store 和 Thumbs.db 系统缩略图互相传得满屏幕都是；我们的手册附带可直接复制的忽略规则，一劳永逸屏蔽垃圾文件。',
    useCase: '多端代码工程同步、设计师 PSD/Figma 素材库同步、论文与办公表格接力',
    portsNote: '本地 Web 控制台 127.0.0.1:8384 · 跨网自动加密穿透',
  },
  {
    id: 'device-nas',
    label: '电脑 / 手机 ↔ NAS',
    title: '搭配群晖 / 威联通 / 飞牛 NAS 打造 24 小时私有同步中心',
    subtitle: '哪怕公司和家里电脑不同时开机，NAS 永不关机作为中转站，随时随地拉取最新版文件',
    architecture: 'Synology DSM / QNAP / Unraid / Docker Compose',
    includedFiles: [
      'NAS 套件版与 Docker Compose 极简部署配置文件',
      'PUID / PGID 目录读写权限排错对照表',
      '回收站版本控制（防止误删连带同步清空）推荐参数',
    ],
    setupDifficulty: '中等 · 约 10 分钟（支持付费远程代配）',
    pitfallTip:
      '小白装 NAS 版 90% 卡在 Docker 挂载目录「Permission Denied（无写入权限）」报错。手册已标红每一步权限勾选位置；若嫌麻烦也可直接加购远程安装由工程师代劳。',
    useCase: '全家照片集中备份、多地工作室素材共享、重要合同自动版本留档',
    portsNote: '映射 8384 管理口与 22000 数据口（TCP + UDP）',
  },
  {
    id: 'pc-ios',
    label: '电脑 ↔ iPhone / iPad',
    title: '苹果手机 / iPad 跨设备文档与照片稳健同步方案',
    subtitle: '结合苹果生态与 Mobius Sync 客户端逻辑，解决 iOS 沙盒路径与后台触发难题',
    architecture: 'iOS 15+ / iPadOS · Windows / macOS 桌面端',
    includedFiles: [
      'iOS 端配套指引与文件夹沙盒映射说明',
      '电脑端单向/双向安全防覆盖配置方案',
      '苹果端省心触发同步快捷指令思路',
    ],
    setupDifficulty: '新手适配 · 约 8 分钟',
    pitfallTip:
      '由于苹果 iOS 系统机制限制，后台长时间静默同步需要正确配置快捷指令或定时打开刷新；教程会明确告诉您如何避免同步中断与重复文件冲突。',
    useCase: 'iPad 学习笔记同步至电脑、iPhone 资料安全归档至硬盘',
    portsNote: '全程 TLS 加密握手 · 支持外网自动中继与直连切换',
  },
];

export const SYNC_MODES: SyncModeDemo[] = [
  {
    id: 'sendreceive',
    name: '发送与接收',
    englishName: 'Send & Receive',
    recommendedFor: '日常多台电脑协同办公（如公司电脑 ↔ 家里电脑）',
    deviceAAction: '您在 A 电脑新增或修改了《项目方案.docx》',
    deviceBOutcome: 'B 电脑几秒内自动同步为最新的《项目方案.docx》；反之在 B 修改也会传回 A。',
    deleteRule: '注意：任意一端删除文件，另一端也会同步删除（建议开启简单文件版本控制防误删）。',
    summary: '真正的双向镜面同步，适合两台机器都需要编辑修改的工作目录。',
  },
  {
    id: 'sendonly',
    name: '仅发送（单向备份）',
    englishName: 'Send Only',
    recommendedFor: '手机相册备份到电脑 / NAS（强烈推荐小白开启！）',
    deviceAAction: '手机相册拍了一张新照片，或您从电脑里整理删除了旧照片',
    deviceBOutcome: '新照片会自动传到电脑备份；如果您在电脑上删了照片，手机里的原图不会被删掉！',
    deleteRule: '保护源端绝对安全：接收端任何误操作或删除，都不会反向影响发送端数据。',
    summary: '最稳妥的单向输出模式，把本机当成唯一数据源，只往外发、不往里改。',
  },
  {
    id: 'receiveonly',
    name: '仅接收（只读镜像）',
    englishName: 'Receive Only',
    recommendedFor: '资料分发终端、老人手机看家庭相册、只读归档目录',
    deviceAAction: '主控端更新了公司资料库或家庭照片墙',
    deviceBOutcome: '本机自动拉取最新文件保持一致；若本机误改了文件，不会污染主控端。',
    deleteRule: '本机可一键点击「恢复更改」把误修改的本地目录重新还原成和主控端完全一致。',
    summary: '适合用来接收别人分享给你的资料，确保不会因为自己手误改乱原始文件。',
  },
];

export const BEGINNER_STEPS: BeginnerStep[] = [
  {
    number: '01',
    title: '安装整合软件，打开本地控制台',
    duration: '耗时约 2 分钟',
    description:
      '告别去 GitHub 翻找全英文压缩包的痛苦。在淘宝拍下后获取整合包，根据您的系统双击安装 Windows 托盘版、Mac 客户端或手机 App，浏览器会自动打开本地管理界面（无需联网登录账号）。',
    checklist: [
      'Windows 遇到防火墙弹窗时，务必勾选「专用网络」和「公用网络」并允许访问',
      '整合包已默认配置好中文界面与开机自启托盘，关闭浏览器也不影响后台同步',
    ],
    proTip: '没有账号密码注册步骤，软件完全运行在您自己的设备上，打开即用。',
  },
  {
    number: '02',
    title: '两台设备扫码或复制「设备 ID」配对',
    duration: '耗时约 2 分钟',
    description:
      '每台安装好软件的设备都会生成一串类似身份证的加密字符（设备 ID）。在 A 设备点击「添加远程设备」，粘贴 B 设备的 ID 或用手机扫一扫二维码，B 设备点一下「确认添加」即完成绑定。',
    checklist: [
      '两台设备首次配对通常在 10–30 秒内自动完成加密握手',
      '可在设备名称栏备注「公司电脑」「我的小米手机」，方便后续一眼识别',
    ],
    proTip: '设备 ID 基于非对称加密证书生成，没有您的手动确认，外人无法连入。',
  },
  {
    number: '03',
    title: '勾选同步文件夹与版本防误删保护',
    duration: '耗时约 2 分钟',
    description:
      '点击「添加文件夹」，选好电脑里想同步的目录（例如 D:\\工作文档），在「共享」标签页勾上刚配对好的设备；最后按需选好「发送与接收」或「仅发送」，开启「回收站版本控制」，大功告成。',
    checklist: [
      '新手强烈建议开启「简单文件版本控制（保留 5 个版本）」，误改误删随时找回',
      '支持直接将同一份文件夹同时同步给电脑、手机和家里的 NAS',
    ],
    proTip: '初次同步大文件夹建议先在同一个 Wi-Fi 局域网下进行，百兆/千兆内网瞬间传完。',
  },
];

export const PLATFORM_TABLE_ROWS: PlatformDetailRow[] = [
  {
    os: 'Windows 10 / 11',
    versions: '64位 (x64) / ARM64',
    packageName: 'SyncTrayzor 中文整合托盘版',
    autoStart: '内置开机静默自启，无黑色命令行窗口',
    notes: '最推荐主力办公机使用，可直观查看实时传输速度与托盘状态',
  },
  {
    os: 'macOS 苹果电脑',
    versions: 'macOS 12+ (Intel & M1/M2/M3/M4)',
    packageName: 'Syncthing macOS 原生菜单栏版',
    autoStart: '支持登录项自动驻留顶部菜单栏',
    notes: '附带 .stignore 规则一键屏蔽 .DS_Store 系统隐藏垃圾文件',
  },
  {
    os: 'Android 安卓手机',
    versions: 'Android 8.0 – 15',
    packageName: 'Syncthing-Fork 稳定增强版 APK',
    autoStart: '可设置仅在 Wi-Fi 下或充电时自动同步',
    notes: '含小米/华为/OPPO/vivo 省电白名单与锁屏防杀保活步骤',
  },
  {
    os: 'iOS (iPhone / iPad)',
    versions: 'iOS 15 及以上',
    packageName: 'Mobius Sync 适配配置指南',
    autoStart: '配合 iOS 快捷指令定时唤起同步',
    notes: '提供苹果沙盒文件目录映射说明与防重复冲突技巧',
  },
  {
    os: 'Linux 桌面与服务器',
    versions: 'Ubuntu / Debian / CentOS / Arch',
    packageName: '官方二进制 + Systemd 守护服务脚本',
    autoStart: 'Systemd 开机后台守护进程',
    notes: '含 Web UI 反向代理与防火墙 ufw / firewalld 放行命令',
  },
  {
    os: 'NAS 私有云',
    versions: '群晖 DSM / 威联通 / 飞牛 fnOS / Docker',
    packageName: 'Docker Compose 标准模板与权限手册',
    autoStart: '随 NAS 开机自动拉起容器',
    notes: '重点解决 PUID/PGID 目录权限报错（支持付费远程代部署）',
  },
];

export const STIGNORE_PRESETS = [
  {
    title: '办公与跨系统通用忽略规则（防止垃圾文件和临时锁冲突）',
    code: `// macOS 与 Windows 系统缩略图垃圾文件
.DS_Store
Thumbs.db
desktop.ini

// Office Word / Excel / PPT 临时锁文件
~$*.doc*
~$*.xls*
~$*.ppt*
*.tmp`,
  },
  {
    title: '程序员 / 设计师专用（避免 node_modules 与缓存拖慢同步）',
    code: `// 前端与开发依赖目录
node_modules
.git
dist
build
__pycache__

// 视频剪辑与设计缓存
Adobe Premiere Pro Auto-Save
*.pek
*.cfa`,
  },
];

export const FAQ_ITEMS: FaqEntry[] = [
  {
    id: 'why-buy',
    category: '购买说明',
    question: 'Syncthing 本身是免费开源软件，为什么建议在淘宝店铺购买您的整合包？',
    answer:
      '官方原版发布在 GitHub 上，不仅全是英文、国内下载经常断线，而且官方默认只有纯命令行或英文界面——Windows 新手装完会一直弹出黑框，Mac/NAS 新手容易下错芯片架构或卡在权限报错。我们的店铺商品为您整理好了各平台免踩坑中文稳定整合包、开箱即用的防误删配置模板，以及一看就懂的小白图文避坑手册，帮您省下数小时折腾查资料的时间。',
  },
  {
    id: 'remote-fee',
    category: '远程服务',
    question: '在淘宝拍下软件包含远程安装吗？远程安装怎么收费？',
    answer:
      '请务必看清：基础商品出售的是【全平台软件整合包 + 小白中文图文教程】，拍下后发您资源自行对照安装。如果您是完全不想动手研究的新手，或需要配置群晖 NAS Docker 权限、跨网连接排查、多台电脑批量调试，我们支持工程师一对一远程安装调试，但【远程安装服务需要另外收费】，请在淘宝页面联系客服或直接拍下对应的「软件 + 远程安装」规格即可。',
  },
  {
    id: 'offline-sync',
    category: '同步原理',
    question: '两台电脑不同时开机，或者不在同一个 Wi-Fi 下还能同步吗？',
    answer:
      '可以跨外网同步，但点对点同步的前提是「至少有两台设备同时在线」。比如公司电脑关机了，家里电脑开机着，那么没传完的文件会在公司电脑下次开机上线的一瞬间自动续传。如果您希望随时随地 24 小时都能把手机/公司文件立刻同步保存，最推荐买一台低功耗 NAS 或家里留一台常开旧电脑作为中心节点。',
  },
  {
    id: 'conflict-safe',
    category: '数据安全',
    question: '会不会不小心用旧文件覆盖掉新文件？误删了怎么办？',
    answer:
      'Syncthing 内置非常严谨的冲突检测与版本保护：1）如果两台设备离线修改了同一个文件，它不会直接覆盖，而是自动把冲突副本改名为 sync-conflict-日期 保留下来让您对比；2）只要按照教程开启「简单文件版本控制」或「回收站版本控制」，任何设备删掉或改错的文件都会自动在隐藏目录留存历史备份，随时可以恢复。',
  },
  {
    id: 'ios-china-network',
    category: '跨平台网络',
    question: '国内网络环境下连接速度怎么样？苹果 iPhone 能用吗？',
    answer:
      '在同一个公司或家里 Wi-Fi 局域网下，传输完全不经过外网，直接跑满千兆内网（实测可达 80–110+ MB/s）。跨外网连接时支持 NAT 打洞直连与中继转发，跑满家庭宽带上行毫无压力。苹果 iOS/iPadOS 端由于系统限制，可配合 Mobius Sync 客户端实现文件同步，我们的教程里会详细说明苹果端的设置方法与注意事项。',
  },
];
