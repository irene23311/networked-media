const ARCHETYPES = [
  {
    id: "strawberry-keychain",
    modelSrc: "/models/strawberryKeychain.glb",
  },

  {
    id: "funny-worm",
    modelSrc: "/models/funnyWorm.glb",
  },

  {
    id: "beer-mug",
    modelSrc: "/models/beerMug.glb",
  },

  {
    id: "cat-keychain",
    modelSrc: "/models/catKeychain.glb",
  },
];


function selectArchetype(traits) {
  const playful = traits.playful ?? 0.5;
  const cozy    = traits.cozy    ?? 0.5;
  const detail  = traits.detail  ?? 0.5;

  if (playful >= cozy) {
    return detail >= 0.55
      ? ARCHETYPES.find(a => a.id === 'strawberry-keychain')
      : ARCHETYPES.find(a => a.id === 'funny-worm');
  } else {
    return detail >= 0.55
      ? ARCHETYPES.find(a => a.id === 'cat-keychain')
      : ARCHETYPES.find(a => a.id === 'beer-mug');
  }
}

function getArchetypeById(id) {
  return ARCHETYPES.find(a => a.id === id) || null;
}

function getArchetypeContent(id, lang = getLang()) {
  const localized = TRANSLATIONS[lang]?.archetypes?.[id];
  if (localized) return localized;
  return TRANSLATIONS.en?.archetypes?.[id] || null;
}

function generatePattern(traits) {
  return selectArchetype(traits);
}

function renderArchetypePreview({ archetype, modelViewer }) {
  if (!archetype) return;
  const archetypeContent = getArchetypeContent(archetype.id);
  if (!modelViewer) return;

  modelViewer.src = archetype.modelSrc || "";
  modelViewer.alt = archetypeContent?.name || "3D pattern preview";
}
