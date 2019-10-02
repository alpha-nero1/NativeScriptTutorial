import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppComponent } from "./app.component";
import { StackComponent } from './layouts/stack/stack.component';
import { FlexboxComponent } from './layouts/flexbox/flexbox.component';
import { GridComponent } from './layouts/grid/grid.component';
import { AbsoluteComponent } from './layouts/absolute/absolute.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { DayModalComponent } from './challenges/day-modal/day-modal.component'
import { ActionBarModule } from './shared/ui/action-bar/action-bar.module';
import { ChallengeActionsModule } from './challenges/challenge-actions/challenge-actions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

/**
 * @author Alessandro Alberga
 * @description main app module.
 */
@NgModule({
    bootstrap: [
      AppComponent
    ],
    imports: [
      ActionBarModule,
      AppRoutingModule,
      ChallengeActionsModule,
      NativeScriptFormsModule,
      NativeScriptModule,
      NativeScriptUISideDrawerModule,
      NativeScriptHttpClientModule,
      ReactiveFormsModule
    ],
    entryComponents: [
      // To prepare modal for construction.
      DayModalComponent
    ],
    declarations: [
      AppComponent,
      StackComponent,
      FlexboxComponent,
      GridComponent,
      AbsoluteComponent,
      AuthComponent,
      DayModalComponent
    ],
    schemas: [
      // Disables angulars standard error checks
      NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
