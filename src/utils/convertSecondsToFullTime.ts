export function convertSecondsToFullTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  const mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;
  return hrs + ":" + mnts + ":" + seconds;
}
