// Tasbeeh counter functionality
let count = 0;

document.addEventListener('DOMContentLoaded', function() {
  loadCount();
  setupEventListeners();
});

function loadCount() {
  const savedCount = localStorage.getItem('tasbeehCount');
  if (savedCount) {
    count = parseInt(savedCount, 10);
    updateDisplay();
  }
}

function setupEventListeners() {
  document.getElementById('increment-btn').addEventListener('click', increment);
  document.getElementById('reset-btn').addEventListener('click', reset);
  document.getElementById('save-btn').addEventListener('click', saveCount);
}

function increment() {
  count++;
  updateDisplay();
  autoSave();
}

function reset() {
  count = 0;
  updateDisplay();
  autoSave();
  showStatus('Count reset!');
}

function saveCount() {
  localStorage.setItem('tasbeehCount', count);
  showStatus('Count saved!');
}

function autoSave() {
  localStorage.setItem('tasbeehCount', count);
}

function updateDisplay() {
  document.getElementById('counter').textContent = count;
}

function showStatus(message) {
  const statusEl = document.getElementById('save-status');
  statusEl.textContent = message;
  statusEl.style.color = '#00d4ff';
  setTimeout(() => {
    statusEl.textContent = '';
  }, 2000);
}