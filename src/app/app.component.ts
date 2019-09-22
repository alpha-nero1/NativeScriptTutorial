import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
  challenge = '';

  onChallengeAdded(input) {
    this.challenge = input;
    console.log(this.challenge)
  }
}
