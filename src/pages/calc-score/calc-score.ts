import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { sprintf } from 'sprintf-js';

@Component({
  selector: 'page-calc-score',
  templateUrl: 'calc-score.html'
})
export class CalcScorePage {

  points : string;
  maxPoints : number;
  duration : number;
  codingTime : string;

  constructor(public navCtrl: NavController) {

  }

  calculate() {

    this.points = "";
    let hms = this.codingTime.split(":");
    if (hms.length !== 3) {
      return;
    }
    let hours = parseInt(hms[0]);
    let minutes = parseInt(hms[1]);
    let seconds = parseFloat(hms[2]);
    if (hours < 0 || hours > 6 || minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
      return;
    }
    if (this.duration == undefined || this.duration.toString() == "" || this.duration == 0 ||
        this.maxPoints == undefined || this.maxPoints.toString() == "" || this.maxPoints == 0) {
      return;
    }
    let PT = hours*3600+minutes*60+seconds;
    let TT = this.duration*60;

    if (PT > TT) {
      return;
    }

    let MP = this.maxPoints;

    let pts = MP*(0.3+(0.7*TT*TT)/(10*PT*PT+TT*TT));

    if (pts.toString() === "NaN") {
      this.points = "";
    }
    else {
      this.points = sprintf("%.2f", pts);
    }
  }
}
