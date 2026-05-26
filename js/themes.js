/* SocialPulse - Theme Management */
const SocialPulseThemes = (function () {
  const STORAGE_KEY = 'socialpulse-theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
    document.querySelectorAll('.theme-preview').forEach(el => {
      el.classList.toggle('active', el.dataset.theme === theme);
    });
  }

  function toggle() {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    setTheme(getTheme());
    document.getElementById('theme-toggle')?.addEventListener('click', toggle);
    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      btn.addEventListener('click', () => setTheme(btn.dataset.setTheme));
    });
    document.querySelectorAll('.theme-preview').forEach(el => {
      el.addEventListener('click', () => setTheme(el.dataset.theme));
    });
  }

  return { init, getTheme, setTheme, toggle };
})();
