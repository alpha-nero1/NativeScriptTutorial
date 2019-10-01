import { NativeScriptRouterModule } from 'nativescript-angular';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent  },
  {
    path: 'challenges',
    loadChildren: '~/app/challenges/challenges.module#ChallengesModule'
  }
];

/**
 * @author Alessandro Alberga
 * @description Main ns router module for this app.
 */
@NgModule({
  imports: [
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
