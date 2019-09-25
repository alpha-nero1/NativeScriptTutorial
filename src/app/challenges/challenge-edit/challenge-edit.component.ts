import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute } from 'nativescript-angular';
import { Subscription } from 'rxjs';

/**
 * @author Alessandro Alberga
 * @description edit challenge component.
 */
@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent implements OnInit, OnDestroy {

  /**
   * Easy toggle to see if we are editing.
   */
  public isEdit = false;

  /**
   * Cleanup subscription variable for the route.
   */
  private routeSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private pageRoute: PageRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this.pageRoute.activatedRoute
    .subscribe(this.receivedActivatedRouteHandler)
  }

  /**
   * Simple handler for receiving activated route.
   */
  private receivedActivatedRouteHandler = (activatedRoute) => {
    activatedRoute.paramMap.subscribe(paramMap => {
        // Retrieve the mode.
        if(!paramMap.has('mode')) {
          this.isEdit = false
        } else {
          this.isEdit = (paramMap.get('mode') === 'edit');
        }
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }


}
