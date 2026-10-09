const numberFormatter = new Intl.NumberFormat('fa-IR');

export function fNumber(value: number) {
  return numberFormatter.format(value);
}
