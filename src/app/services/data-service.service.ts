import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Symptoms } from '../models/picked-symptoms';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  isLoggedIn = false;
  userEmail: string;
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
            this.userEmail = user_email;
            this.isLoggedIn = true;
          }
        }),
        catchError(this.handleError(`authenticate`, null))
      );
  }

  logout(): void {
    this.isLoggedIn = false;
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

  userAddAddress(user, address) {
    this.http
      .post('http://localhost:8000/useraddress', address, {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe(addr => {
        console.log(addr);
        this.http
          .post('http://localhost:8000/getuserid', user, {
            headers: { 'Content-Type': 'application/json' }
          })
          .subscribe(userid => {
            this.http
              .get('http://localhost:8000/getaddressid', {
                headers: { 'Content-Type': 'application/json' }
              })
              .subscribe(lastid => {
                this.http
                  .post(
                    'http://localhost:8000/userlocation',
                    {
                      userid: userid['data'][0].id,
                      addressid: lastid['data'][0].id
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                  )
                  .subscribe(anan => {
                    console.log(anan);
                  });
              });
          });
      });
  }

  addHealthCondition(symptoms: Symptoms[]) {
    Object.keys(symptoms).forEach(symptom => {
      const severity = symptoms[symptom].severity;
      const symp_id = symptoms[symptom].symptomId;

      this.http
        .post(
          'http://localhost:8000/addhealthcondition',
          { user_email: this.userEmail, severity: severity, symp_id: symp_id },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        .subscribe(res => {
          console.log(res);
        });
    });
  }
}
