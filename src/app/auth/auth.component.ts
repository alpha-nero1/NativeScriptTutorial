import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AuthService } from './auth.service';

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

  isLoading = true;

  constructor(
    private router: RouterExtensions,
    private authService: AuthService
  ) { }

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
    this.form.reset()
    this.isLoading = true;
    if (this.isLogin) {
      this.authService.login(username.value, password.value).subscribe(this.loginToAppHandler, this.loginErrHandler)
    } else {
      this.authService.signUp(username.value, password.value).subscribe(this.loginToAppHandler, this.loginErrHandler)
    }
  }

  private loginErrHandler = (err) => {
    console.log(err)
    this.isLoading = false;
  }

  private loginToAppHandler = () => {
    this.router.navigate(['/challenges/'], { clearHistory: true });
    this.isLoading = false;
  }
}
