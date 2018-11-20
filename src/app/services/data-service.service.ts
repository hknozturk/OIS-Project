import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

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
}
