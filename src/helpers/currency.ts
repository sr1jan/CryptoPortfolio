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
  const name = from + to;
  let price: string;
  price = priceData[name].last;
  const converted: number = amount * parseFloat(price);
  return converted;
}

export function valueDisplay(value: number) {
  const symbol: string = '₹';
  const amount: string = numberWithCommas(value);

  return `${symbol} ${amount}`;
}
