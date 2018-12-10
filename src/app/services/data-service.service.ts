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

  querySymptomOnt(): Observable<any> {
    const myQuery =
      'prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n\
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
    prefix owl: <http://www.w3.org/2002/07/owl#> \n\
    prefix xsd: <http://www.w3.org/2001/XMLSchema#> \n\
    prefix oboInOwl: <http://www.geneontology.org/formats/oboInOwl#> \n\
     \n\
    SELECT ?symptom ?symptomName \n\
    WHERE \n\
    { \n\
    ?symptom rdfs:label ?symtomName . \n\
     \n\
    FILTER REGEX(STR(?symptom), "SYMP_")}';

    return this.http.get('http://localhost:3030/ois/query', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json'
      },
      params: { query: myQuery }
    });
  }

  queryDiseaseOnt(): Observable<any> {
    const myQuery =
      'prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n\
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
    prefix owl: <http://www.w3.org/2002/07/owl#> \n\
    prefix xsd: <http://www.w3.org/2001/XMLSchema#> \n\
    prefix oboInOwl: <http://www.geneontology.org/formats/oboInOwl#> \n\
    prefix doid: <http://purl.obolibrary.org/obo/doid#> \n\
    prefix obo: <http://purl.obolibrary.org/obo/> \n\
     \n\
     SELECT DISTINCT ?diseaseID ?diseaseName ?definition \n\
    WHERE \n\
    { \n\
      ?diseaseID rdfs:label ?diseaseName . \n\
      ?diseaseID rdfs:subClassOf ?disease . \n\
      ?diseaseID obo:IAO_0000115 ?definition . \n\
      FILTER REGEX(STR(?diseaseID), "DOID_") \n\
    }';

    return this.http.get('http://localhost:3030/ois/query', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json'
      },
      params: { query: myQuery }
    });
  }
}
