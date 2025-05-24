export function formatNumber(num: number): string {
  if (num === 0) return '0';
  
  if (num < 1000) {
    return num.toString();
  } else if (num < 10000) {
    // For 1000-9999, show as 1K, 2.1K, etc.
    return (Math.floor(num / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'K';
  } else if (num < 1000000) {
    // For 10000-999999, show as 10K, 11K, 999K, etc.
    return Math.floor(num / 1000) + 'K';
  } else {
    // For 1000000+, show as 1M, 1.1M, etc.
    return (Math.floor(num / 100000) / 10).toFixed(1).replace(/\.0$/, '') + 'M';
  }
}