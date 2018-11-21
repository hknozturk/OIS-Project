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
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  getUsers(): Observable<any> {
    return this.http
      .get<any>('http://localhost:8000/users', {
        headers: { 'Content-Type': 'application/json' }
      })
      .pipe(
        tap(users => console.log('fetched users: ', users)),
        catchError(this.handleError<JSON>(`getUsers`, null))
      );
  }

  authenticate(): Observable<any> {
    const user_email = 'hkn.ozturk@windowslive.com';
    const user_password = 'hkn.230294xx';

    return this.http
      .post(
        'http://localhost:8000/authenticate',
        { email: user_email, password: user_password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(
        tap(authUser => console.log('auth User: ', authUser)),
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
      .pipe(
        tap(res => console.log('registered user: ', res)),
        catchError(this.handleError(`registration`, null))
      );
  }
}
