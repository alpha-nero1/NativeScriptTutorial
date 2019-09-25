import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { TodayComponent } from './today/today.component';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { ActionBarModule } from '../shared/ui/action-bar/action-bar.module';

/**
 * @author Alessandro Alberga
 * @description challenges feature module.
 */
@NgModule({
  declarations: [
    ChallengeTabsComponent,
    CurrentChallengeComponent,
    TodayComponent
  ],
  imports: [
    ActionBarModule,
    ChallengesRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [
    // Disables angulars standard error checks
    NO_ERRORS_SCHEMA
  ]
})
export class ChallengesModule {}
