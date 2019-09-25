import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

/**
 * @author Alessandro Alberga
 * @description auth component handling user authentication.
 */
@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private router: RouterExtensions) { }

  /**
   * Sign in.
   */
  public onSignIn(): void {
    //this.router.navigate(['/challenges/tabs'], { clearHistory: true })
  }
}
