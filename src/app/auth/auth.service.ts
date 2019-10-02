import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from '../../constants';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private signupUrl =
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${constants.firebaseAPIToken}`

  private signinUrl =
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${constants.firebaseAPIToken}`

  constructor(private http: HttpClient) { }

  public signUp(email: string, password: string) {
    return this.http.post(this.signupUrl, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleErr));
  }

  public login(email: string, password: string) {
    return this.http.post(this.signinUrl, { email, password, returnSecureToken: true })
  }

  private handleErr(error: any) {
    const errMessage = error.error.message ? error.error.message : null;
    return throwError(error);
  }
}
