import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, ViewContainerRef } from "@angular/core";
import { UIService } from './shared/ui/ui.service';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
  moduleId: module.id
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(RadSideDrawerComponent, { static: true }) sideDrawer: RadSideDrawerComponent;

  private drawerListener: Subscription;

  private drawer: RadSideDrawer;

  constructor(
    private uiService: UIService,
    private changeDetectionRef: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.drawerListener = this.uiService.drawerState.subscribe(() => {
      if (this.drawer) {
        this.drawer.toggleDrawerState();
      }
    })
    this.uiService.setRootVCRef(this.viewContainerRef);
  }

  ngAfterViewInit(): void {
    this.drawer = this.sideDrawer.sideDrawer;
    this.changeDetectionRef.detectChanges();
  }

  public logout(): void {
    this.uiService.toggleDrawer();
  }

  ngOnDestroy(): void {
    if (this.drawerListener) {
      this.drawerListener.unsubscribe()
    }
  }
}
