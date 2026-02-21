// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', function() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
});

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}