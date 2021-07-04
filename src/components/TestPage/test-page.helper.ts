function padNumber(no: number): string {
  const num = !Number.isNaN(+no) ? +no : 0;
  return parseInt(num.toString(), 10).toString().padStart(2, '0');
}

export function formatSecondsToClockTime(seconds: number): string {
  const minutesStr = seconds / 60;
  const secondsStr = seconds % 60;

  return `${padNumber(minutesStr)}:${padNumber(secondsStr)}`;
}
