export class Clock {
  private timeStarted: number = Date.now();

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
    return Math.round((Date.now() - this.timeStarted) / 1000);
  }
}
