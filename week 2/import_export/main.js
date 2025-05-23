//Dynamic Import

async function loadMathModule() {
  const mathModule = await import('./math.js'); 
  console.log(mathModule.add(2, 3)); 
  console.log(mathModule.subtract(5, 3)); 
}

loadMathModule();
