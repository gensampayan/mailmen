const API_TOKEN = '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';

const urls = {
  filipino: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-tl-en',
  spanish: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-es-en',
  french: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-fr-en',
  japanese: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-jap-en',
  korean: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-ko-en'
};

const sourceInputElem = document.getElementById('source');
const targetOutputElem = document.getElementById('target');
const sourceLangElem = document.getElementById('source-lang');

initializeLanguageSelector();

document.addEventListener('DOMContentLoaded', restoreFromLocalStorage);
sourceInputElem.addEventListener('keypress', handleTranslationRequest);

function initializeLanguageSelector() {
  const languages = document.createElement('ul');
  languages.classList.add('languages');

  for(const lang in urls) {
    const langItem = createLanguageItem(lang);
    languages.append(langItem);
  }

  sourceLangElem.append(languages);
}

function createLanguageItem(lang) {
  const langItem = document.createElement('li');
  langItem.textContent = lang;
  langItem.classList.add('selected-lang');
  langItem.addEventListener('click', () => {
    sourceInputElem.dataset.url = urls[lang];
    sourceInputElem.value = '';
    targetOutputElem.value = '';
  });
  return langItem;
}

async function handleTranslationRequest(e) {
  if (e.key === 'Enter') {
    const selectedUrl = sourceInputElem.dataset.url;
    const inputValue = sourceInputElem.value;
    try {
      targetOutputElem.value = 'Translating...';

      let translation = getCachedTranslation(inputValue);
      if (!translation) {
        translation = await translateText(inputValue, selectedUrl);
        cacheTranslation(inputValue, translation);
      }

      targetOutputElem.value = translation;
      saveToLocalStorage(inputValue, translation);
    } catch (error) {
      console.error('Translation request failed:', error);    
      targetOutputElem.value = 'Translation failed. Please try again.';
    }
  }
}

async function translateText(input, url) {
  const response = await fetchWithTimeout(url, {
    headers: { 'Authorization': `Bearer ${API_TOKEN}` },
    method: "POST",
    body: JSON.stringify({ inputs: input }),
  });
  const result = await response.json();
  console.log(result)
  return result[0].translation_text;
}

function fetchWithTimeout(url, options, timeout = 50000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ]);
}

function restoreFromLocalStorage() {
  const output = localStorage.getItem('output');
  const input = localStorage.getItem('input');
  if (input && output) {
    targetOutputElem.value = output;
    sourceInputElem.value = input;
  }
}

function saveToLocalStorage(input, output) {
  localStorage.setItem('input', input);
  localStorage.setItem('output', output);
}

function getCachedTranslation(input) {
  return sessionStorage.getItem(input);
}

function cacheTranslation(input, translation) {
  sessionStorage.setItem(input, translation);
}