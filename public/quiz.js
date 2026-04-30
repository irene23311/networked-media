let currentQ = 0;
let traits = { calm: 0.5, density: 0.5, social: 0.5, symmetry: 0.5, warmth: 0.5 };
let answers = [];
let selectedOptionIdx = null;

function getQuestions() { return QUESTIONS[getLang()] || QUESTIONS.en; }
function getQ(idx) { return getQuestions()[idx]; }
function qCount() { return getQuestions().length; }

function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.add('hidden');
    p.classList.remove('active');
  });
  const target = document.getElementById('page-' + pageId);
  target.classList.remove('hidden');
  target.classList.add('active');
}

function startQuiz() {
  currentQ = 0;
  answers = [];
  selectedOptionIdx = null;
  traits = { calm: 0.5, density: 0.5, social: 0.5, symmetry: 0.5, warmth: 0.5 };
  goTo('quiz');
  renderQuestion(currentQ);
}

function renderQuestion(idx) {
  const q = getQ(idx);
  const quizPage = document.getElementById('page-quiz');
  const isLast = idx === qCount() - 1;
  let optionsHTML = '';

  if (q.type === 'choice') {
    optionsHTML = '<div class="options-list">';
    q.options.forEach((opt, i) => {
      const prefix = opt.emoji ? `${opt.emoji} ` : '';
      optionsHTML += `<button class="option-btn" onclick="selectOption(${i})" id="opt-${i}">${prefix}${opt.label}</button>`;
    });
    optionsHTML += '</div>';
  }

  if (q.type === 'slider') {
    optionsHTML = `
      <div class="slider-scale-labels">
        <span>${q.leftLabel}</span><span>${q.rightLabel}</span>
      </div>
      <input type="range" min="0" max="1" step="0.01" value="${q.defaultValue}"
        id="slider-input" class="slider-input"
        oninput="document.getElementById('slider-label').textContent = getSliderLabel(this.value, getQ(${idx}))"
      />
      <p id="slider-label" class="slider-label">${getSliderLabel(q.defaultValue, q)}</p>
    `;
  }

  quizPage.innerHTML = `
    <div class="question-card">
      <p>${q.text}</p>
      ${optionsHTML}
      <div class="quiz-footer">
        ${idx > 0 ? `<button class="back-btn" onclick="goBack()">${t('quiz.back')}</button>` : '<span></span>'}
        <button id="next-btn" onclick="nextQuestion()" ${q.type === 'choice' ? 'disabled' : ''}>
          ${isLast ? t('quiz.submit') : t('quiz.next')}
        </button>
      </div>
    </div>
  `;
}

function selectOption(idx) {
  selectedOptionIdx = idx;
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('opt-' + idx).classList.add('selected');
  document.getElementById('next-btn').removeAttribute('disabled');
}

function getSliderLabel(val, q) {
  val = parseFloat(val);
  const keys = Object.keys(q.displayValues).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  keys.forEach(k => { if (Math.abs(k - val) < Math.abs(closest - val)) closest = k; });
  return q.displayValues[closest];
}

function nextQuestion() {
  const q = getQ(currentQ);
  let delta = {};

  if (q.type === 'choice') {
    if (selectedOptionIdx === null) return;
    delta = q.options[selectedOptionIdx].traits;
    selectedOptionIdx = null;
  }

  if (q.type === 'slider') {
    const val = parseFloat(document.getElementById('slider-input').value);
    delta[q.traitKey] = val;
    if (q.secondaryTrait) delta[q.secondaryTrait.key] = q.secondaryTrait.transform(val);
  }

  answers.push({ delta });
  applyDelta(delta, 0.55);
  currentQ++;

  if (currentQ < qCount()) {
    renderQuestion(currentQ);
  } else {
    showResult();
  }
}

function goBack() {
  if (currentQ === 0) return;
  const last = answers.pop();
  applyDelta(last.delta, -0.4);
  currentQ--;
  selectedOptionIdx = null;
  renderQuestion(currentQ);
}

function applyDelta(delta, weight) {
  for (const [key, val] of Object.entries(delta)) {
    if (traits[key] !== undefined) {
      traits[key] = clamp(traits[key] + (val - traits[key]) * weight, 0, 1);
    }
  }
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function showResult() {
  goTo('result');
  const canvas = document.getElementById('pattern-canvas');
  canvas.width = 160;
  canvas.height = 160;

  const archetype = generatePattern(traits, canvas);
  localStorage.setItem('formeTraits', JSON.stringify(traits));
  localStorage.setItem('formeArchetypeId', archetype.id);

  const localArch = TRANSLATIONS[getLang()].archetypes[archetype.id];
  document.getElementById('result-explanation').textContent = localArch.explanation;
}
