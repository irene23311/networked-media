function loadGalleryExamples() {
  document.querySelectorAll('.example-card').forEach((card) => {
    const archetypeId = card.getAttribute('data-archetype-id');
    const archetype = getArchetypeById(archetypeId);
    const content = getArchetypeContent(archetypeId);
    if (!archetype || !content) return;

    const modelViewer = card.querySelector('.example-model');
    const nameEl = card.querySelector('.example-name');
    const skillEl = card.querySelector('.example-skill');
    const descEl = card.querySelector('.example-description');

    if (modelViewer) {
      modelViewer.src = archetype.modelSrc;
      modelViewer.alt = content.name;
    }
    if (nameEl) nameEl.textContent = content.name;
    if (skillEl) skillEl.textContent = content.meta.skill;
    if (descEl) descEl.textContent = content.explanation;
  });
}

document.addEventListener('DOMContentLoaded', loadGalleryExamples);
