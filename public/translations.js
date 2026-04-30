const TRANSLATIONS = {
  en: {
    nav: { about: 'About', gallery: 'Gallery', profile: 'Profile' },
    landing: { welcome: 'Welcome to Forme!', subtitle: "Let's find out the pattern for you", enter: 'Enter' },
    result: { yourPattern: 'Your pattern:', explanation: 'Explanation:', startCreating: 'Start Creating' },
    quiz: { back: '← Back', next: 'Next', submit: 'Submit' },
    home: {
      addPattern: 'Add a New Pattern', getStarted: 'Get Started', back: 'Back',
      placeholderTitle: 'Title', placeholderAuthor: 'Author',
      placeholderDesc: 'tell us about your pattern...', chooseImage: 'Choose Image', upload: 'Upload',
    },
    about: {
      kicker: 'About',
      heading: 'Making crochet patterns easier to learn and follow',
      para1: 'This is a beginner-friendly crochet website designed to make patterns easy to find, understand, and follow. Based on my own experience learning crochet, many existing websites feel overwhelming and difficult to navigate. Users often have to search through cluttered pages just to find the patterns, which is usually the main reason they visit the site.',
      para2: 'Even after finding a pattern, there is another barrier: crochet instructions rely heavily on abbreviations and specialized terminology. Beginners must first learn how to read these symbolic patterns before they can start creating, which makes crochet feel unnecessarily inaccessible.',
      para3: 'This website responds to these problems by focusing on clarity, simplicity, and accessibility. Each pattern page is meant to stay minimal, showing only the essential information: a clear photo of the finished object and the full pattern written in plain language without abbreviations. The interface also allows users to track their current progress so they can easily continue later.',
      para4: 'Another goal of this project is to make crochet more accessible across languages. Many existing crochet websites are English-only, which creates barriers for non-English speakers. To address this, the website aims to use graphic-based pattern representations and language-neutral symbols whenever possible, while also supporting multiple languages such as Chinese and Japanese.',
      browse: 'Browse patterns',
    },
    gallery: { title: 'Gallery', empty: 'No patterns yet', emptyDesc: 'Upload a pattern on the home page to start building the gallery.', goHome: 'Go to home' },
    profile: {
      title: 'Your Profile', patternType: 'Pattern type:', noMatch: 'Take the quiz to get your match',
      noTraits: 'Your quiz traits will appear here after you finish the quiz.', retake: 'Retake quiz',
      patternName: 'Your crochet pattern', noMaterials: 'Finish the quiz to see your recommended yarn and hook.',
      noSteps: 'Your personalized steps will appear here after the quiz.', materials: 'Materials:', steps: 'Steps:',
    },
    archetypes: {
      'quiet-grid': {
        name: 'The Quiet Grid', traits: ['Introspective', 'Methodical', 'Self-contained'],
        explanation: 'Your pattern is a meditative grid — each stitch placed with intention, never rushed. The tight, even spacing reflects someone who finds peace in consistency. You notice the small things others miss, and you give them care.',
        meta: { yarn: 'DK weight', hook: '4mm (US G)', skill: 'Beginner' },
        steps: ['Make a foundation chain of 20 stitches (ch 20).', 'Row 1: Single crochet (sc) in the 2nd chain from hook, sc across. (19 sc)', 'Chain 1, turn. Repeat Row 1 for every subsequent row.', "After 19 rows, you'll have a square. The tight grid is your pattern.", 'Fasten off. Weave in ends with a yarn needle in neat, small loops.', 'Optional: add a border of slip stitches (sl st) around all 4 edges.']
      },
      'scattered-blooms': {
        name: 'Scattered Blooms', traits: ['Spontaneous', 'Social', 'Expressive'],
        explanation: 'Your pattern bursts outward — open, warm, never the same twice. Like you, it fills any space it enters. The irregular blossoms signal someone who connects easily and brings color wherever they go.',
        meta: { yarn: 'Worsted weight', hook: '5mm (US H)', skill: 'Beginner' },
        steps: ['Create a magic ring: loop the yarn, insert hook, pull up a loop.', 'Ch 3 (counts as first dc), work 11 dc into the ring. (12 dc total)', 'Pull tail to close the ring. Sl st to top of ch-3 to join.', 'Round 2: Ch 1, *sc in next dc, ch 3, skip 1 dc* — repeat around. (6 loops)', 'Fasten off, leaving a long tail. Make several flowers in different colors.', 'Arrange on a background and sew in place with the tail — let them scatter freely.']
      },
      'spiral-garden': {
        name: 'The Spiral Garden', traits: ['Curious', 'Nurturing', 'Centred'],
        explanation: "Spirals from a still centre — your pattern expands outward in organized layers. You have an inner world that radiates warmth, but you're selective about where that warmth goes. Growth is part of your nature.",
        meta: { yarn: 'DK weight', hook: '4mm (US G)', skill: 'Beginner' },
        steps: ['Start with a magic ring. Ch 1, work 6 sc into ring. Do not join — work in a continuous spiral.', 'Round 2: Work 2 sc in every stitch around. (12 sc)', 'Round 3: *Sc in next st, inc* — repeat around. (18 sc)', 'Round 4: *Sc in next 2 sts, inc* — repeat around. (24 sc)', 'Continue the pattern: add 1 plain sc before each inc per round. This is how granny circles are made!', 'Fasten off after round 6 (36 sc) for a small coaster, or keep going for a larger piece.']
      },
      'dense-weave': {
        name: 'The Dense Weave', traits: ['Detail-oriented', 'Resilient', 'Focused'],
        explanation: 'Every element of your pattern is interlocked — nothing is left to chance. The dense, overlapping structure mirrors the way you build things to last. You process deeply and hold space for complexity.',
        meta: { yarn: 'Fingering weight', hook: '3mm (US C)', skill: 'Beginner' },
        steps: ['Ch 21 for your foundation. Sc in 2nd ch from hook, sc across. (20 sc)', 'Row 2: Ch 2, turn. Hdc in back loop only (BLO) of every stitch across. (20 hdc)', 'Row 3: Ch 1, turn. Sc in BLO of every stitch across. (20 sc)', 'Alternate rows 2 and 3. Working in BLO creates a ridge texture — dense and structured.', "After 30 rows, you'll have a firm, textured rectangle — a washcloth or coaster.", 'Fasten off and add a border of single crochets for clean edges.']
      },
      'wild-lace': {
        name: 'Wild Lace', traits: ['Free-spirited', 'Energetic', 'Adventurous'],
        explanation: "Open spaces and unexpected tangles — your pattern refuses to be contained. The lace-like gaps are where your energy breathes. You're someone who leaves room for improvisation and trusts the process.",
        meta: { yarn: 'Lace weight', hook: '3.5mm (US E)', skill: 'Beginner-friendly' },
        steps: ['Ch 28. Sc in 4th ch from hook, *ch 2, skip 2 ch, sc in next ch* — repeat to end.', 'Row 2: Ch 5, turn. *Sc in ch-2 space, ch 2* — repeat, ending with dc in last sc.', 'Row 3: Ch 3, turn. *Sc in ch-2 sp, ch 2* — repeat, dc in last ch-5 sp.', 'Repeat rows 2–3. The offset creates a diagonal mesh — airy and free.', 'Work as many rows as you like — the pattern grows naturally from there.', 'Fasten off. Block by pinning flat on foam and lightly dampening with water.']
      },
      'ripple-wave': {
        name: 'The Ripple Wave', traits: ['Balanced', 'Social', 'Calming'],
        explanation: 'Your pattern moves in waves — structured enough to feel safe, open enough to breathe. The ripple is both active and serene, like you: able to hold space for others without losing your own rhythm.',
        meta: { yarn: 'Worsted weight', hook: '5mm (US H)', skill: 'Beginner' },
        steps: ['Ch multiple of 12 + 3 (try ch 27 to start).', 'Row 1: Dc in 4th ch from hook, dc in next 3 sts, *skip 2, dc in next 5, 3 dc in next st, dc in next 5, skip 2* — repeat, ending 2 dc in last ch.', 'Row 2: Ch 3, turn. Dc in same st, dc in next 4, *skip 2, dc in next 5, 3 dc in next st, dc in next 5, skip 2* — repeat.', 'Rows 2 is the ripple repeat. Work it over and over.', 'Change yarn color every 2–3 rows for a classic chevron blanket effect.', 'The wave pattern grows quickly — great for a cozy scarf or baby blanket.']
      }
    }
  },

  zh: {
    nav: { about: '关于', gallery: '图库', profile: '我的' },
    landing: { welcome: '欢迎来到 Forme！', subtitle: '让我们为你找到专属花样', enter: '开始' },
    result: { yourPattern: '你的花样：', explanation: '解释：', startCreating: '开始创作' },
    quiz: { back: '← 返回', next: '下一题', submit: '提交' },
    home: {
      addPattern: '添加新花样', getStarted: '入门指南', back: '返回',
      placeholderTitle: '标题', placeholderAuthor: '作者',
      placeholderDesc: '介绍你的花样...', chooseImage: '选择图片', upload: '上传',
    },
    about: {
      kicker: '关于',
      heading: '让钩针花样更易学习和跟随',
      para1: '这是一个适合初学者的钩针网站，旨在让花样易于查找、理解和跟随。根据我自己学习钩针的经历，许多现有网站感觉令人不知所措且难以浏览。用户往往需要在杂乱的页面中搜索才能找到花样，而这通常是他们访问网站的主要原因。',
      para2: '即使找到了花样，还有另一个障碍：钩针说明严重依赖缩写和专业术语。初学者必须先学会如何阅读这些符号化的花样，才能开始创作，这使得钩针感觉不必要地难以接触。',
      para3: '本网站通过专注于清晰、简洁和可及性来回应这些问题。每个花样页面力求保持简洁，只显示必要信息：完成作品的清晰照片和用通俗语言书写的完整花样（无缩写）。界面还允许用户跟踪当前进度，以便日后轻松继续。',
      para4: '该项目的另一个目标是让钩针在不同语言中都更易接触。许多现有的钩针网站只有英文版本，这对非英语使用者造成了障碍。为此，网站旨在尽可能使用基于图形的花样表示和语言中性符号，同时也支持多种语言，如中文和日文。',
      browse: '浏览花样',
    },
    gallery: { title: '图库', empty: '暂无花样', emptyDesc: '在主页上传花样以开始构建图库。', goHome: '前往主页' },
    profile: {
      title: '我的主页', patternType: '花样类型：', noMatch: '完成测验以获取你的花样',
      noTraits: '完成测验后，你的性格特征将显示在这里。', retake: '重新测验',
      patternName: '你的钩针花样', noMaterials: '完成测验以查看推荐的毛线和钩针。',
      noSteps: '完成测验后，个性化步骤将显示在这里。', materials: '材料：', steps: '步骤：',
    },
    archetypes: {
      'quiet-grid': {
        name: '宁静方格', traits: ['内省', '有条理', '自足'],
        explanation: '你的花样是一个冥想般的方格——每一针都有意为之，从不仓促。紧密、均匀的间距反映了一个在规律中找到平静的人。你注意到别人忽略的细节，并给予它们关怀。',
        meta: { yarn: '中粗线（DK）', hook: '4mm 钩针（美码G）', skill: '入门级' },
        steps: ['起针链20针（ch 20）。', '第1行：从第2针开始单钩（sc），一路钩完。（19针）', '锁1针，翻转。每行重复第1行。', '钩完19行后，你将得到一个正方形，这就是你的花样。', '断线。用毛线针将线头整齐地藏入小环中。', '可选：沿四边加一圈引拔针（sl st）作为边框。']
      },
      'scattered-blooms': {
        name: '散落花朵', traits: ['随性', '社交', '富于表现力'],
        explanation: '你的花样向外迸发——开放、温暖，每次都不一样。就像你一样，它充满了进入的每一个空间。不规则的花朵象征着一个容易与人连接、所到之处都带来色彩的人。',
        meta: { yarn: '粗线（Worsted）', hook: '5mm 钩针（美码H）', skill: '入门级' },
        steps: ['创建魔法圈：绕线，插入钩针，拉起一个线圈。', '锁3针（算作第一个长针），在圈内钩11个长针（共12针）。', '拉紧线头收紧圈。用引拔针连接至锁3针顶端。', '第2圈：锁1针，*在下一个长针中钩短针，锁3针，跳过1个长针*——重复一圈（共6个环）。', '断线，留长线头。用不同颜色制作几朵花。', '在背景上自由排列并用线头缝合——让它们随意散落。']
      },
      'spiral-garden': {
        name: '螺旋花园', traits: ['好奇', '有爱心', '内心平静'],
        explanation: '从静止的中心螺旋而出——你的花样在有序的层次中向外扩展。你有一个向外散发温暖的内心世界，但你选择性地给予这份温暖。成长是你的本性。',
        meta: { yarn: '中粗线（DK）', hook: '4mm 钩针（美码G）', skill: '入门级' },
        steps: ['从魔法圈开始。锁1针，在圈内钩6个短针。不连接——以连续螺旋方式钩织。', '第2圈：每针钩2个短针。（共12针）', '第3圈：*在下一针钩短针，加针*——重复一圈。（共18针）', '第4圈：*在下两针钩短针，加针*——重复一圈。（共24针）', '继续该花样：每圈在加针前增加1个普通短针。这就是祖母圈的钩法！', '钩完第6圈（36针）可得一个小杯垫，或继续钩织更大的作品。']
      },
      'dense-weave': {
        name: '密织', traits: ['注重细节', '有韧性', '专注'],
        explanation: '你花样的每个元素都相互交织——没有任何东西被留给偶然。密集、交叠的结构反映了你构建经久耐用事物的方式。你处理深入且能接受复杂性。',
        meta: { yarn: '细线（Fingering）', hook: '3mm 钩针（美码C）', skill: '入门级' },
        steps: ['起针21针作为基础。从第2针钩短针，一路钩完。（20针）', '第2行：锁2针，翻转。在每针的后线圈（BLO）钩中长针。（20针）', '第3行：锁1针，翻转。在每针的后线圈（BLO）钩短针。（20针）', '交替第2行和第3行。在后线圈钩织会形成凸纹——密集而有结构感。', '钩完30行后，你将得到一个坚实、有纹理的长方形——可用作毛巾或杯垫。', '断线并加一圈短针边框，使边缘整洁。']
      },
      'wild-lace': {
        name: '野性蕾丝', traits: ['自由奔放', '充满活力', '爱冒险'],
        explanation: '开放的空间和意想不到的缠绕——你的花样拒绝被束缚。蕾丝般的空隙是你能量呼吸的地方。你是那种为即兴留有空间并信任过程的人。',
        meta: { yarn: '蕾丝线（Lace）', hook: '3.5mm 钩针（美码E）', skill: '适合初学者' },
        steps: ['起针28。从第4针钩短针，*锁2针，跳过2针，在下一针钩短针*——重复到末尾。', '第2行：锁5针，翻转。*在锁2空间钩短针，锁2针*——重复，最后在最后一个短针钩长针。', '第3行：锁3针，翻转。*在锁2空间钩短针，锁2针*——重复，在最后一个锁5空间钩长针。', '重复第2-3行。交错产生对角网状——轻盈而自由。', '随意钩织多少行——花样自然生长。', '断线。用大头针固定在泡沫板上，轻轻洒水定型。']
      },
      'ripple-wave': {
        name: '涟漪波浪', traits: ['平衡', '社交', '令人平静'],
        explanation: '你的花样以波浪形移动——有足够的结构让人感到安全，又有足够的开放让人自在呼吸。涟漪既活跃又宁静，就像你一样：能够为他人提供空间，同时不失去自己的节奏。',
        meta: { yarn: '粗线（Worsted）', hook: '5mm 钩针（美码H）', skill: '入门级' },
        steps: ['起针为12的倍数加3针（建议起27针）。', '第1行：从第4针钩长针，在下4针钩长针，*跳过2针，在下5针钩长针，在下一针钩3个长针，在下5针钩长针，跳过2针*——重复，最后在最后一针钩2个长针。', '第2行：锁3针，翻转。在同一针钩长针，在下4针钩长针，*跳过2针，在下5针钩长针，在下一针钩3个长针，在下5针钩长针，跳过2针*——重复。', '第2行即为涟漪重复花样。反复钩织。', '每2-3行换色，呈现经典锯齿毛毯效果。', '波浪花样生长迅速——非常适合做舒适的围巾或婴儿毯。']
      }
    }
  }
};
