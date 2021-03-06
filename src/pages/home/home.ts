import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { sprintf } from 'sprintf-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  points : number;
  maxPoints : number;
  duration : number;
  codingTime : string;

  constructor(public navCtrl: NavController) {

  }

  /*
  ** Reference: https://apps.topcoder.com/wiki/display/tc/Competing+in+a+Rated+Algorithm+Competition
  ** MP = maximum points of problem
  ** TT = total time in seconds for the contest
  ** PT = time in seconds to solve the problem
  ** points = the score awarded at time of first submission
  **
  ** points = MP*(0.3+(0.7*TT^2)/(10*PT^2+TT^2))
  ** PT = sqrt(((0.7*TT^2)/((points/MP)-0.3)-TT^2)/10.0)
   */
  calculate() {
    this.codingTime = "";
    if (!this.points || !this.maxPoints || !this.duration) {
      return;
    }
    let TT = this.duration*60;
    let MP = this.maxPoints;
    let PT = Math.sqrt(((0.7*TT*TT)/((this.points/MP)-0.3)-TT*TT)/10.0);

    if (PT.toString() == "NaN" || PT > TT) {
      return;
    }

    let hours = Math.floor(PT/3600);
    let seconds = PT-hours*3600;
    let minutes = Math.floor(seconds/60);
    seconds -= minutes*60;
    this.codingTime = sprintf("%02d:%02d:%06.3f", hours, minutes, seconds);
  }
}
