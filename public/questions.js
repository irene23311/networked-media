const QUESTIONS = {
  en: [
    {
      id: "q1",
      type: "choice",
      text: "Your ideal Saturday looks like…",
      options: [
        { label: "Farmers market, cozy coffee, home by noon", traits: { cozy: 0.9, playful: 0.1 } },
        { label: "Spontaneous plans that keep changing", traits: { cozy: 0.1, playful: 0.9 } },
        { label: "A long creative project at home", traits: { cozy: 0.6, playful: 0.4, detail: 0.7 } },
        { label: "Whatever looks fun when I open my phone", traits: { cozy: 0.3, playful: 0.8 } },
      ]
    },
    {
      id: "q2",
      type: "choice",
      text: "When you make or buy something, you care more about…",
      options: [
        { label: "How cute or funny it is", traits: { playful: 0.9, detail: 0.3 } },
        { label: "How well it's made", traits: { playful: 0.2, detail: 0.9 } },
        { label: "Whether it feels cozy and personal", traits: { cozy: 0.9, detail: 0.5 } },
        { label: "Whether it'll make someone smile", traits: { playful: 0.7, cozy: 0.5 } },
      ]
    },
    {
      id: "q3",
      type: "choice",
      text: "How do you feel about small details?",
      options: [
        { label: "I obsessed over them, the tiny parts are the best part", traits: { detail: 0.95, cozy: 0.4 } },
        { label: "I appreciate them but lose patience fast", traits: { detail: 0.4, playful: 0.6 } },
        { label: "I prefer the big picture", traits: { detail: 0.1, playful: 0.5, cozy: 0.5 } },
        { label: "Depends on my mood honestly", traits: { detail: 0.5, playful: 0.5, cozy: 0.5 } },
      ]
    },
    {
      id: "q4",
      type: "choice",
      text: "Pick the vibe that's most you:",
      options: [
        { label: "Cottagecore ", traits: { cozy: 0.95, detail: 0.5, playful: 0.1 } },
        { label: "Humor in a unexpected way", traits: { playful: 0.95, detail: 0.3, cozy: 0.2 } },
        { label: "Dark (moody, precise, aesthetic)", traits: { cozy: 0.5, detail: 0.9, playful: 0.2 } },
        { label: "Kawaii (sweet, fun, bright colors)", traits: { playful: 0.8, detail: 0.7, cozy: 0.3 } },
      ]
    },
    {
      id: "q5",
      type: "choice",
      text: "You'd crochet something to…",
      options: [
        { label: "Keep for myself, somewhere cozy in my room", traits: { cozy: 0.9, playful: 0.1 } },
        { label: "Gift to someone, the reaction is the reward", traits: { playful: 0.7, cozy: 0.5 } },
        { label: "Post it! I want people to see it", traits: { playful: 0.8, detail: 0.6 } },
        { label: "Use it every day (bag, keychain, etc.)", traits: { detail: 0.6, cozy: 0.5, playful: 0.5 } },
      ]
    },
    {
      id: "q6",
      type: "choice",
      text: "If you started a new project, your project would probably…",
      options: [
        { label: "Be finished perfectly, I don't quit", traits: { detail: 0.9, cozy: 0.6 } },
        { label: "Turn out slightly different but still cute", traits: { playful: 0.7, detail: 0.4 } },
        { label: "Take forever because I kept restarting", traits: { detail: 0.8, playful: 0.3 } },
        { label: "Get done in one sitting out of excitement", traits: { playful: 0.8, cozy: 0.4, detail: 0.2 } },
      ]
    },
  ]
};