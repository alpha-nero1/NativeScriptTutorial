import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
  challenges = [];

  onChallengeAdded(input) {
    this.challenges.push(input);
  }
}
