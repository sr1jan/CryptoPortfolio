export function numberWithCommas(x: number): string {
  const num = x.toFixed(2);
  return num.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

export function currencyConversion({
  amount,
  from,
  to,
  priceData,
}: {
  amount: number;
  from: string;
  to: string;
  priceData: object;
}): number {
  let price: string;
  let name: string;
  let converted: number;
  try {
    name = from.toLowerCase() + to.toLowerCase();
    price = priceData[name].last;
    converted = amount * parseFloat(price);
  } catch (e) {
    name = to.toLowerCase() + from.toLowerCase();
    price = priceData[name].last;
    converted = amount / parseFloat(price);
  }
  return converted;
}

export function valueDisplay(value: number, currency: string) {
  const currencySign = {
    ['inr']: '\u20b9',
    ['usdt']: '\u0024',
  };

  const symbol: string = currencySign[currency];
  const amount: string = numberWithCommas(value);

  return `${symbol} ${amount}`;
}
