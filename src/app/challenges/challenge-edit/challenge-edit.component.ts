import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent {

  @Output() public input = new EventEmitter<string>();
  public challengeDescription = '';

  public onSetChallenge() {
    this.input.emit(this.challengeDescription);
  }
}
