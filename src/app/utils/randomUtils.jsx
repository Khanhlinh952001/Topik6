// randomUtils.js

export function generateRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}
