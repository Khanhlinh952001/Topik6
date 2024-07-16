// randomUtils.js

export function renderRandomNumbers() {
    let numbers = [];
    
    // Sinh ngẫu nhiên 6 số từ 1 đến 100
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      numbers.push(randomNumber);
    }
    
    return numbers;
  }
  