function getPatternProgressKey(archetypeId) {
  return `formePatternProgress:${archetypeId}`;
}

function getSavedStepProgress(archetypeId) {
  try {
    const saved = localStorage.getItem(getPatternProgressKey(archetypeId));
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    return {};
  }
}

function saveStepProgress(archetypeId, progress) {
  localStorage.setItem(getPatternProgressKey(archetypeId), JSON.stringify(progress));
}

function renderSteps(stepsEl, archetypeId, steps) {
  const savedProgress = getSavedStepProgress(archetypeId);

  stepsEl.innerHTML = steps
    .map((step, index) => {
      const isChecked = Boolean(savedProgress[index]);

      return `
        <li class="pattern-step${isChecked ? ' is-complete' : ''}">
          <label class="pattern-step-row">
            <span class="pattern-step-text">${step}</span>
            <input
              class="pattern-step-checkbox"
              type="checkbox"
              data-step-index="${index}"
              ${isChecked ? 'checked' : ''}
              aria-label="Mark step ${index + 1} as complete"
            />
          </label>
        </li>
      `;
    })
    .join('');

  stepsEl.addEventListener('change', (event) => {
    const checkbox = event.target.closest('.pattern-step-checkbox');
    if (!checkbox) return;

    const stepIndex = checkbox.dataset.stepIndex;
    const progress = getSavedStepProgress(archetypeId);
    progress[stepIndex] = checkbox.checked;
    saveStepProgress(archetypeId, progress);

    const stepItem = checkbox.closest('.pattern-step');
    if (stepItem) {
      stepItem.classList.toggle('is-complete', checkbox.checked);
    }
  });
}

function loadPatternDetail() {
  const params = new URLSearchParams(window.location.search);
  const requestedArchetypeId = params.get('id');
  const archetypeId = requestedArchetypeId || localStorage.getItem('formeArchetypeId');

  if (!archetypeId) {
    window.location.href = '/';
    return;
  }

  if (requestedArchetypeId) {
    localStorage.setItem('formeArchetypeId', requestedArchetypeId);
  }

  const arch = getArchetypeContent(archetypeId);
  const archData = getArchetypeById(archetypeId);

  if (!arch || !archData) {
    window.location.href = '/';
    return;
  }

  // Header
  const nameEl = document.getElementById('pattern-name');
  if (nameEl) nameEl.textContent = arch.name;

  // Explanation
  const explEl = document.getElementById('pattern-explanation');
  if (explEl) explEl.textContent = arch.explanation;

  // 3D model
  const modelViewer = document.getElementById('pattern-model-detail');
  if (modelViewer && archData.modelSrc) {
    modelViewer.src = archData.modelSrc;
    modelViewer.alt = arch.name;
  }

  // Materials
  const materialsEl = document.getElementById('pattern-materials');
  if (materialsEl) materialsEl.textContent = `${arch.meta.yarn} · ${arch.meta.hook}`;

  // Difficulty
  const skillEl = document.getElementById('pattern-skill');
  if (skillEl) skillEl.textContent = arch.meta.skill;

  // Steps
  const stepsEl = document.getElementById('pattern-steps');
  if (stepsEl) {
    renderSteps(stepsEl, archetypeId, arch.steps);
  }
}

loadPatternDetail();
