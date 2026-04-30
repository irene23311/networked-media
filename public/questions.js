const QUESTIONS = {
  en: [
    {
      id: "q1",
      type: "choice",
      text: "Your friend cancels plans last minute. You…",
      options: [
        { label: 'Text back "no worries :)" and mean it', traits: { calm: 0.9, social: 0.4, warmth: 0.6 } },
        { label: 'Text back "no worries :)" and do not mean it', traits: { calm: 0.5, social: 0.5, warmth: 0.4 } },
        { label: "Already had one foot out the door anyway", traits: { calm: 0.7, social: 0.15, density: 0.7 } },
        { label: "Suggest rescheduling immediately", traits: { calm: 0.4, social: 0.7, symmetry: 0.8 } },
      ]
    },
    {
      id: "q2",
      type: "choice",
      text: "Pick a Saturday.",
      options: [
        { label: "Farmers market then home by noon", traits: { calm: 0.85, density: 0.6, symmetry: 0.8 } },
        { label: "Woke up at 2pm, still deciding", traits: { calm: 0.4, density: 0.2, social: 0.3 } },
        { label: "Packed with plans I made 3 weeks ago", traits: { calm: 0.3, density: 0.9, symmetry: 0.85 } },
        { label: "Spontaneous - I'll know when I get there", traits: { calm: 0.2, symmetry: 0.1, social: 0.8 } },
      ]
    },
    {
      id: "q3",
      type: "choice",
      text: "How do you feel about following a recipe?",
      options: [
        { label: "I follow it exactly", traits: { symmetry: 0.95, calm: 0.8, density: 0.75 } },
        { label: "I follow it mostly, then improvise", traits: { symmetry: 0.6, calm: 0.6, density: 0.5 } },
        { label: "I read it once, then freestyle", traits: { symmetry: 0.2, calm: 0.3, warmth: 0.7 } },
        { label: "What recipe?", traits: { symmetry: 0.05, calm: 0.1, social: 0.85 } },
      ]
    },
    {
      id: "q4",
      type: "choice",
      text: "Be honest - your room is…",
      options: [
        { label: "Organized and I like it that way", traits: { symmetry: 0.95, density: 0.8, calm: 0.85 } },
        { label: "Organized chaos (I know where everything is)", traits: { symmetry: 0.5, density: 0.7, calm: 0.6 } },
        { label: "A project I'm always meaning to address", traits: { symmetry: 0.4, density: 0.5, warmth: 0.65 } },
        { label: "Cozy disaster, no notes", traits: { symmetry: 0.1, density: 0.3, warmth: 0.85 } },
      ]
    },
    {
      id: "q5",
      type: "slider",
      text: "You're most likely to start a new hobby because…",
      min: 0,
      max: 1,
      step: 0.01,
      defaultValue: 0.5,
      leftLabel: "It looked meditative - I needed stillness",
      rightLabel: "My brain needed something new to fixate on",
      traitKey: "calm",
      secondaryTrait: { key: "density", transform: v => 1 - v * 0.5 },
      displayValues: {
        0: "I needed something meditative",
        0.25: "I wanted a slow, calming ritual",
        0.5: "Both, honestly",
        0.75: "I needed a new project to dive into",
        1: "My brain demanded a new fixation",
      }
    },
  ],

  zh: [
    {
      id: "q1",
      type: "choice",
      text: "朋友临时取消了计划。你会……",
      options: [
        { label: '回复“没事 :)”，而且你是真心的', traits: { calm: 0.9, social: 0.4, warmth: 0.6 } },
        { label: '回复“没事 :)”，但其实不是这么想的', traits: { calm: 0.5, social: 0.5, warmth: 0.4 } },
        { label: "反正你本来就已经有点不想出了", traits: { calm: 0.7, social: 0.15, density: 0.7 } },
        { label: "立刻提议重新约时间", traits: { calm: 0.4, social: 0.7, symmetry: 0.8 } },
      ]
    },
    {
      id: "q2",
      type: "choice",
      text: "选一个理想的周六。",
      options: [
        { label: "逛完农贸市场，中午前回家", traits: { calm: 0.85, density: 0.6, symmetry: 0.8 } },
        { label: "下午两点才起床，还没决定要干嘛", traits: { calm: 0.4, density: 0.2, social: 0.3 } },
        { label: "行程排满，都是三周前就定好的", traits: { calm: 0.3, density: 0.9, symmetry: 0.85 } },
        { label: "随性一点，到了再看感觉", traits: { calm: 0.2, symmetry: 0.1, social: 0.8 } },
      ]
    },
    {
      id: "q3",
      type: "choice",
      text: "你怎么看待照着食谱做饭？",
      options: [
        { label: "我会完全照做", traits: { symmetry: 0.95, calm: 0.8, density: 0.75 } },
        { label: "大致照做，然后自己发挥", traits: { symmetry: 0.6, calm: 0.6, density: 0.5 } },
        { label: "看一遍就开始自由发挥", traits: { symmetry: 0.2, calm: 0.3, warmth: 0.7 } },
        { label: "什么食谱？", traits: { symmetry: 0.05, calm: 0.1, social: 0.85 } },
      ]
    },
    {
      id: "q4",
      type: "choice",
      text: "说实话，你的房间是……",
      options: [
        { label: "很整齐，而且我喜欢这样", traits: { symmetry: 0.95, density: 0.8, calm: 0.85 } },
        { label: "乱中有序（我知道每样东西在哪）", traits: { symmetry: 0.5, density: 0.7, calm: 0.6 } },
        { label: "一个我总说要收拾的长期项目", traits: { symmetry: 0.4, density: 0.5, warmth: 0.65 } },
        { label: "温馨的灾难现场，不接受反驳", traits: { symmetry: 0.1, density: 0.3, warmth: 0.85 } },
      ]
    },
    {
      id: "q5",
      type: "slider",
      text: "你最可能开始一个新爱好，是因为……",
      min: 0,
      max: 1,
      step: 0.01,
      defaultValue: 0.5,
      leftLabel: "它看起来很疗愈 - 我需要一点平静",
      rightLabel: "我的大脑需要新的东西去沉迷",
      traitKey: "calm",
      secondaryTrait: { key: "density", transform: v => 1 - v * 0.5 },
      displayValues: {
        0: "我需要一点疗愈感",
        0.25: "我想要一个缓慢、安静的仪式",
        0.5: "老实说，两者都有",
        0.75: "我需要一个新项目投入进去",
        1: "我的脑子必须马上找到新迷恋",
      }
    },
  ]
};
