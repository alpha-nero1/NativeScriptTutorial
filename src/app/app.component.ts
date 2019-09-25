import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, ViewContainerRef } from "@angular/core";
import { UIService } from './shared/ui/ui.service';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(RadSideDrawerComponent, { static: true }) sideDrawer: RadSideDrawerComponent;

  private drawerListener: Subscription;

  constructor(
    private uiService: UIService,
    private changeDetectionRef: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.drawerListener = this.uiService.drawerState.subscribe(() => {
      if (this.sideDrawer) {
        this.sideDrawer.sideDrawer.toggleDrawerState();
      }
    })
    this.uiService.setRootVCRef(this.viewContainerRef);
  }

  ngAfterViewInit(): void {
    this.changeDetectionRef.detectChanges();
    this.drawerListener = this.uiService.drawerState.subscribe(() => {
      this.sideDrawer.sideDrawer.toggleDrawerState();
    })
  }

  public logout(): void {
    this.sideDrawer.sideDrawer.toggleDrawerState();
  }

  ngOnDestroy(): void {
    this.drawerListener.unsubscribe()
  }
}
