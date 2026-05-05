function loadSavedQuizResult() {
  const archetypeId = localStorage.getItem('formeArchetypeId');
  if (!archetypeId) return;

  const arch = getArchetypeContent(archetypeId);
  const archData = getArchetypeById(archetypeId);
  if (!arch || !archData) return;

  const set = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  set('profile-pattern-name', arch.name);
  set('profile-explanation', arch.explanation);
  set('profile-yarn', arch.meta.yarn);
  set('profile-hook', arch.meta.hook);
  set('profile-skill', arch.meta.skill);

  const modelViewer = document.getElementById('pattern-model-detail');
  renderArchetypePreview({ archetype: archData, modelViewer });
}

loadSavedQuizResult();
