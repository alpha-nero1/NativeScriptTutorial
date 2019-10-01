import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

/**
 * @author Alessandro Alberga
 * @description
 */
@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css'],
  moduleId: module.id
})
export class ChallengeTabsComponent implements OnInit {

  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page
  ) { }

  ngOnInit(): void {
    // Configure our tab navigation.
    this.router.navigate([
      {
       outlets: {
         current: ['current'],
         today: ['today']
       }
      }
    ], {
        relativeTo: this.active
      })
    // Hide duplicate action bar.
    this.page.actionBarHidden = true;
  }

}
