import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

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

  getEnumTypes(): Observable<any> {
    return this.http.get('http://localhost:8000/getenumtypes', {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  userRegistration(user): Observable<any> {
    return this.http.post('http://localhost:8000/postnewuser', user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}