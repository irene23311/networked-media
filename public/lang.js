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
}

function chooseLang(lang) {
  setLang(lang);
  applyTranslations();
  goTo('landing');
}

document.addEventListener('DOMContentLoaded', applyTranslations);
