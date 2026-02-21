// Quran reader
document.addEventListener('DOMContentLoaded', function() {
  fetchSurahs();
  document.getElementById('back-btn').addEventListener('click', showSurahList);
  document.getElementById('surah-select').addEventListener('change', function(e) {
    const surahNumber = e.target.value;
    if (surahNumber) {
      loadSurah(surahNumber);
    }
  });
});

function fetchSurahs() {
  fetch('https://api.alquran.cloud/v1/surah')
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        displaySurahs(data.data);
        populateDropdown(data.data);
      } else {
        document.getElementById('surah-grid').innerHTML = '<p class="text-center text-red-600 dark:text-red-400">Error loading surahs.</p>';
      }
    })
    .catch(error => {
      document.getElementById('surah-grid').innerHTML = '<p class="text-center text-red-600 dark:text-red-400">Error fetching surahs.</p>';
    });
}

function displaySurahs(surahs) {
  const grid = document.getElementById('surah-grid');
  grid.innerHTML = surahs.map(surah => `
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-100 dark:border-gray-700" onclick="loadSurah(${surah.number})">
      <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">${surah.number}</span>
      </div>
      <div class="text-lg font-bold text-gray-900 dark:text-white mb-2">${surah.name}</div>
      <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">${surah.englishName}</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">${surah.numberOfAyahs} verses • ${surah.revelationType}</div>
    </div>
  `).join('');
}

function populateDropdown(surahs) {
  const select = document.getElementById('surah-select');
  select.innerHTML = '<option value="">Choose a Surah...</option>' +
    surahs.map(surah => `<option value="${surah.number}">${surah.number}. ${surah.englishName} (${surah.name})</option>`).join('');
}

function loadSurah(number) {
  document.getElementById('loading').classList.remove('hidden');
  fetch(`https://api.alquran.cloud/v1/surah/${number}`)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        displayVerses(data.data);
      } else {
        alert('Error loading surah.');
      }
    })
    .catch(error => {
      alert('Error fetching surah.');
    })
    .finally(() => {
      document.getElementById('loading').classList.add('hidden');
    });
}

function displayVerses(surah) {
  // Hide surah selection and show verses
  document.getElementById('surah-grid').classList.add('hidden');
  document.getElementById('verses-container').classList.remove('hidden');

  // Update surah title and info
  document.getElementById('surah-title').textContent = `${surah.name} (${surah.englishName})`;
  document.getElementById('surah-info').textContent = `${surah.numberOfAyahs} verses • Revealed in ${surah.revelationType} • ${surah.englishNameTranslation}`;

  // Display verses with modern styling
  const versesDiv = document.getElementById('verses');
  versesDiv.innerHTML = surah.ayahs.map(ayah => `
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-8 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-shrink-0 w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-4">
          <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">${ayah.numberInSurah}</span>
        </div>
        <div class="flex-1">
          <p class="text-right text-2xl leading-relaxed text-gray-900 dark:text-white mb-4 font-arabic" dir="rtl">
            ${ayah.text}
          </p>
          <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              ${ayah.numberInSurah}. ${ayah.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function showSurahList() {
  document.getElementById('verses-container').classList.add('hidden');
  document.getElementById('surah-grid').classList.remove('hidden');
  document.getElementById('surah-select').value = '';
}