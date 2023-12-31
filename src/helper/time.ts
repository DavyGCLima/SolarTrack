export function convertIntoHours(timeString: string): string {
  const [hours, minutes, seconds] = timeString.split(':');

  const date = new Date(0, 0, 0, Number(hours), Number(minutes), Number(seconds));

  const timeValueInHours = date.getHours() + date.getMinutes() / 60;

  return String(timeValueInHours);
}
export function convertIntoDays(timeString: string): string {
  const [year, month, day] = timeString.split('-');

  const date = new Date(Number(year), Number(month), Number(day), 0, 0, 0);

  const timeValueInHours = `${date.getMonth()}-${date.getDay()}`;

  return timeValueInHours;
}
export function convertIntoMonths(timeString: string): string {
  const [year, month, day] = timeString.split('-');

  const date = new Date(Number(year), Number(month), Number(day), 0, 0, 0);

  const timeValueInHours = `${date.getFullYear().toLocaleString().substring(2)}-${date.getMonth()}`;

  return timeValueInHours;
}
export function convertIntoYears(timeString: string): string {
  const [year, month, day] = timeString.split('-');

  const date = new Date(Number(year), Number(month), Number(day), 0, 0, 0);

  return date.getFullYear().toLocaleString()

}