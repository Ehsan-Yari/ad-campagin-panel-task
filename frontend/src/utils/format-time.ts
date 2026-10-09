const jalaliDateTime = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const jalaliDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function fJalaliDateTime(isoDate: string) {
  return jalaliDateTime.format(new Date(isoDate));
}

export function fJalaliDate(isoDate: string) {
  return jalaliDate.format(new Date(isoDate));
}
