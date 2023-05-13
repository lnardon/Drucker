export class Clock {
  private timeStarted: number = 0;
  private timeElapsed: number = 0;
  private currentInterval: any = null;

  startTimer() {
    this.timeStarted = Date.now();
    this.currentInterval = setInterval(() => {
      this.timeElapsed += 1000;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.currentInterval);
  }

  endTimer() {
    this.timeStarted = 0;
    this.timeElapsed = 0;
    return {
      started: this.timeStarted,
      totalTimeElapsedInSeconds: this.timeElapsed / 1000,
    };
  }

  getElapsedTimeInSeconds() {
    if (this.timeStarted === 0) {
      return 0;
    } else {
      return this.timeElapsed / 1000;
    }
  }
}
