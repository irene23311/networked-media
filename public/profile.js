function loadSavedQuizResult() {
  const savedTraits = localStorage.getItem('formeTraits');
  const archetypeId = localStorage.getItem('formeArchetypeId');
  if (!savedTraits || !archetypeId) return;

  const traits = JSON.parse(savedTraits);
  const arch = TRANSLATIONS[getLang()].archetypes[archetypeId];
  if (!arch) return;

  const profileName = document.getElementById('profile-pattern-name');
  if (profileName) profileName.textContent = arch.name;

  const profileTraits = document.getElementById('profile-traits');
  if (profileTraits) profileTraits.textContent = arch.traits.join(' · ');

  const patternName = document.getElementById('pattern-name');
  if (patternName) patternName.textContent = arch.name;

  const patternMaterials = document.getElementById('pattern-materials');
  if (patternMaterials) patternMaterials.textContent = `${arch.meta.yarn} · ${arch.meta.hook}`;

  const stepsEl = document.getElementById('pattern-steps');
  if (stepsEl) {
    stepsEl.innerHTML = arch.steps.map((step, i) => `${i + 1}. ${step}<br><br>`).join('');
  }

  const detailCanvas = document.getElementById('pattern-canvas-detail');
  if (detailCanvas) {
    detailCanvas.width = 340;
    detailCanvas.height = 240;
    generatePattern(traits, detailCanvas);
  }
}

loadSavedQuizResult();
