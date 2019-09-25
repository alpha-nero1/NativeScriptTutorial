import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit {
  /**
   * Date loaded to display in ui.
   */
  public loadedDate: Date;

  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
    this.loadedDate = (this.modalParams.context as { date: Date }).date
  }

  public onHandleInput(input: string) {
    this.modalParams.closeCallback(input)
  }
}
