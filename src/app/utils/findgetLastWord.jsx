// Trong file utils.js

export function getLastWord(sentence) {
    sentence = sentence.trim();
    const words = sentence.split(/\s+/);
    const lastWorded = words[words.length - 1];
    return  lastWorded ;
  }
  