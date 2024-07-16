// utils.js

export function findFirstAndLastWords(sentence) {
    sentence = sentence.trim();
    const words = sentence.split(/\s+/);
    const firstWord = words[0];
    const lastWord = words[words.length - 1];
    return { firstWord, lastWord };
  }
  