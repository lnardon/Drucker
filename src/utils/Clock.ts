export class Clock {
  private timeStarted: number = 0;

  startTimer() {
    this.timeStarted = Date.now();
  }

  endTimer() {
    let endTime = Date.now();
    return {
      started: this.timeStarted,
      ended: endTime,
      totalTimeElapsedInSeconds: (endTime - this.timeStarted) / 1000,
    };
  }

  getElapsedTimeInSeconds() {
    if (this.timeStarted === 0) {
      return 0;
    } else {
      return Math.round((Date.now() - this.timeStarted) / 1000);
    }
  }
}
