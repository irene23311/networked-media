function getLang() {
  return localStorage.getItem('formeLang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('formeLang', lang);
}

function t(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], TRANSLATIONS[getLang()]) ?? '';
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.getAttribute('data-i18n'));
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = t(el.getAttribute('data-i18n-placeholder'));
    if (val) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-value]').forEach(el => {
    const val = t(el.getAttribute('data-i18n-value'));
    if (val) el.value = val;
  });
  document.querySelectorAll('[data-lang-choice]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-choice') === getLang());
  });
}

function chooseLang(lang) {
  setLang(lang);
  applyTranslations();
  if (typeof loadSavedQuizResult === 'function') loadSavedQuizResult();
  if (typeof loadPatternDetail === 'function') loadPatternDetail();

  const quizPage = document.getElementById('page-quiz');
  if (quizPage && !quizPage.classList.contains('hidden') && typeof renderQuestion === 'function') {
    renderQuestion(currentQ);
  }

  const resultPage = document.getElementById('page-result');
  if (resultPage && !resultPage.classList.contains('hidden') && typeof showResult === 'function') {
    showResult();
  }
}

document.addEventListener('DOMContentLoaded', applyTranslations);
