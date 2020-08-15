export function numberWithCommas(x: number): string {
  const num = x.toFixed(2);
  return num.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

export function currencyConversion(
  amount: number,
  from: string,
  to: string,
  priceData: object,
): number {
  if (from !== 'usdt') return null;
  const name = from + to;
  let price: string;
  try {
    price = priceData[name].last;
  } catch (e) {
    return null;
  }
  const converted: number = amount * parseFloat(price);
  return converted;
}

export function valueDisplay(value: number) {
  const symbol: string = '₹';
  const amount: string = numberWithCommas(value);

  return `${symbol} ${amount}`;
}
