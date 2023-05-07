export function convertSecondsToFullTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  const mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;
  if (hrs > 0) {
    return String(hrs).padStart(2, "0") + ":" + mnts + ":" + seconds;
  } else {
    return (
      String(mnts).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
    );
  }
}
