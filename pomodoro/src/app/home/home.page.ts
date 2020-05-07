import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  time: BehaviorSubject<string> = new BehaviorSubject("00:00");
  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  timer: number;
  interval;
  state: "start" | "stop" = "stop";
  startDuration = 5;
  circleR = circleR;
  circleDasharray = circleDasharray;

  constructor() {}

  toggleStartStop() {
    if (this.state === "start") {
      this.stopTimer();
    } else {
      this.startTimer(this.startDuration);
    }
  }

  swapDuration() {
    this.startDuration = this.startDuration === 25 ? 5 : 25;
  }

  startTimer(duration: number) {
    this.state = "start";
    clearInterval(this.interval);
    this.timer = duration * 60;
    this.updateTimeValue();
    this.interval = setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.time.next("00:00");
    this.state = "stop";
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String("0" + Math.floor(minutes)).slice(-2);
    seconds = String("0" + Math.floor(seconds)).slice(-2);

    const text = minutes + ":" + seconds;
    this.time.next(text);

    const totalTime = this.startDuration * 60;
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);

    --this.timer;

    if (this.timer < -1) {
      this.startTimer(this.startDuration);
    }
  }

  percentageOffset(percent) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }
}
