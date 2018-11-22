import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  isLoggedIn = false;
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  authenticate(email, password): Observable<any> {
    const user_email = email;
    const user_password = password;

    return this.http
      .post(
        'http://localhost:8000/authenticate',
        { email: user_email, password: user_password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(
        tap(res => {
          console.log(res['message']);
          if (
            res['message'] === 'User Succesfully Authenticated' &&
            user_email === res['data'].email
          ) {
            this.isLoggedIn = true;
          }
        }),
        catchError(this.handleError(`authenticate`, null))
      );
  }

  registration(): Observable<any> {
    const user = new User(
      'hkn.ozturk@windowslive.com',
      'Hakan',
      'Yoztyurk',
      24,
      'Male',
      'hkn.230294xx'
    );

    return this.http
      .post('http://localhost:8000/register', user, {
        headers: { 'Content-Type': 'application/json' }
      })
      .pipe(catchError(this.handleError(`registration`, null)));
  }
}
