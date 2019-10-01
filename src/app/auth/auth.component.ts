import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';

/**
 * @author Alessandro Alberga
 * @description auth component handling user authentication.
 */
@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})
export class AuthComponent implements OnInit {

  /**
   * Ref to the password element.
   */
  @ViewChild('usernameElement', { static: false }) usernameElement: ElementRef<TextField>;

  /**
   * Ref to the password element.
   */
  @ViewChild('passwordElement', { static: false }) passwordElement: ElementRef<TextField>;

  /**
   * Programmatic ref to the form.
   */
  public form: FormGroup;

  usernameIsValid = true;

  passwordIsValid = true;

  isLogin = true;

  constructor(private router: RouterExtensions) { }

  ngOnInit(): void {
    // Configure the form.
    this.form = new FormGroup({
      username: new FormControl(null, { updateOn: 'change', validators: [Validators.required] }),
      password: new FormControl(null, { updateOn: 'change', validators: [Validators.required] })
    });
    this.form.get('username').statusChanges.subscribe(status => {
      this.usernameIsValid = status === 'VALID';
    })
    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordIsValid = status === 'VALID';
    })
  }

  public onDone():void {
    this.usernameElement.nativeElement.focus();
    this.passwordElement.nativeElement.focus();
    this.passwordElement.nativeElement.dismissSoftInput();
  }

  private resetValidity() {
    this.passwordIsValid = true;
    this.usernameIsValid = true;
  }

  public onSwitch(): void {
    this.isLogin = !this.isLogin;
    this.resetValidity();
  }

  /**
   * Sign in.
   */
  public onSignIn(): void {
    this.onDone();
    if (!this.form.valid) { return; }
    const username = this.form.get('username');
    const password = this.form.get('password');
    this.router.navigate(['/challenges/'], { clearHistory: true });
    this.form.reset()
  }
}
