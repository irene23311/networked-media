let currentQ = 0;
let traits = { playful: 0.5, cozy: 0.5, detail: 0.5 };
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
  traits = { playful: 0.5, cozy: 0.5, detail: 0.5 };
  goTo('quiz');
  renderQuestion(currentQ);
}

function renderQuestion(idx) {
  const q = getQ(idx);
  const quizPage = document.getElementById('page-quiz');
  const isLast = idx === qCount() - 1;
  let optionsHTML = '<div class="options-list">';
  q.options.forEach((opt, i) => {
    const prefix = opt.emoji ? `${opt.emoji} ` : '';
    optionsHTML += `<button class="option-btn" onclick="selectOption(${i})" id="opt-${i}">${prefix}${opt.label}</button>`;
  });
  optionsHTML += '</div>';

  quizPage.innerHTML = `
    <div class="question-card">
      <p>${q.text}</p>
      ${optionsHTML}
      <div class="quiz-footer">
        ${idx > 0 ? `<button class="back-btn" onclick="goBack()">${t('quiz.back')}</button>` : '<span></span>'}
        <button id="next-btn" onclick="nextQuestion()" disabled>
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

function nextQuestion() {
  const q = getQ(currentQ);
  if (selectedOptionIdx === null) return;
  const delta = q.options[selectedOptionIdx].traits;
  selectedOptionIdx = null;

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
    if (traits[key] === undefined) traits[key] = 0.5;
    traits[key] = clamp(traits[key] + (val - traits[key]) * weight, 0, 1);
  }
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function showResult() {
  goTo('result');
  const modelViewer = document.getElementById('pattern-model');

  const archetype = generatePattern(traits);
  renderArchetypePreview({ archetype, modelViewer });
  localStorage.setItem('formeArchetypeId', archetype.id);

  const localArch = getArchetypeContent(archetype.id);
  if (localArch) {
    document.getElementById('result-pattern-name').textContent = localArch.name;
    document.getElementById('result-explanation').textContent = localArch.explanation;
  }
}
