export function convertIntoHours(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(':');

  const date = new Date(0, 0, 0, Number(hours), Number(minutes), Number(seconds));

  const timeValueInHours = date.getHours() + date.getMinutes() / 60;

  return timeValueInHours;
}