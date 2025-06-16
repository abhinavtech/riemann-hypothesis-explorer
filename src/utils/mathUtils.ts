export const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

export const generatePrimes = (limit: number): number[] => {
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
};

export const primePi = (n: number): number => {
  let count = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) count++;
  }
  return count;
};

export const primeApproximation = (n: number): number => {
  if (n < 2) return 0;
  return n / Math.log(n);
};

export const calculateZeta = (s: number, terms: number = 1000): number => {
  if (s <= 1) return NaN;
  
  let sum = 0;
  for (let n = 1; n <= terms; n++) {
    sum += 1 / Math.pow(n, s);
  }
  return sum;
};

export const zetaKnownValues: Record<number, number> = {
  2: Math.PI * Math.PI / 6,
  4: Math.PI ** 4 / 90,
  6: Math.PI ** 6 / 945,
  8: Math.PI ** 8 / 9450,
  10: Math.PI ** 10 / 93555,
};

export const riemannZetaZeros = [
  14.134725142,
  21.022039639,
  25.010857580,
  30.424876126,
  32.935061588,
  37.586178159,
  40.918719012,
  43.327073281,
  48.005150881,
  49.773832478,
];

export const formatNumber = (num: number, decimals: number = 6): string => {
  if (Math.abs(num) < 1e-10) return '0';
  if (Math.abs(num) > 1e6) return num.toExponential(decimals);
  return num.toFixed(decimals);
};

export const generateComplexZeros = (count: number): Array<{real: number, imaginary: number}> => {
  return riemannZetaZeros.slice(0, count).map(zero => ({
    real: 0.5,
    imaginary: zero
  }));
}; 