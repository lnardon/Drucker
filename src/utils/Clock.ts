export class Clock {
  private startedDate: Date | null = null;
  private endDate: Date | null = null;

  startTimer() {
    this.startedDate = new Date();
  }

  stopTimer() {
    this.endDate = new Date();
  }

  endTimer() {
    this.endDate = new Date();
    return {
      started: this.startedDate,
      totalTimeElapsedInSeconds: Math.floor(
        (this.endDate.getTime() - this.startedDate.getTime()) / 1000
      ),
    };
  }

  resetTimer() {
    this.startedDate = null;
    this.endDate = null;
  }

  getElapsedTimeInSeconds() {
    if (this.endDate) {
      return Math.floor(
        (this.endDate.getTime() - this.startedDate.getTime()) / 1000
      );
    }
    if (this.startedDate) {
      return Math.floor(
        (new Date().getTime() - this.startedDate.getTime()) / 1000
      );
    } else {
      return 0;
    }
  }
}
