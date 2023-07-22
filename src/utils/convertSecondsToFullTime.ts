export function convertSecondsToFullTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  let mnts = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds >= 30) {
    mnts += 1;
  }

  return String(hrs).padStart(2, "0") + ":" + String(mnts).padStart(2, "0");
}
