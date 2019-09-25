import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '../../shared/ui/ui.service';

/**
 * @author Alessandro Alberga
 * @description current challenge component to view current challenge.
 */
@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css']
})
export class CurrentChallengeComponent {

  constructor(
    private modelDialogService: ModalDialogService,
    private uiService: UIService
  ) { }

  /**
   * Show the change status modal.
   */
  public onChangeStatus(): void {
    // We must pass in our component and the view container ref.
    this.modelDialogService.showModal(DayModalComponent, {
      fullscreen: true,
      viewContainerRef: this.uiService.getRootVCRef(),
      context: {
        date: new Date()
      }
    })
    .then((res: string) => {

    })
  }
}
