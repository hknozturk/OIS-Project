import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {
  constructor(private http: HttpClient) {}

  symptomPrefix =
    'prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n\
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
  prefix owl: <http://www.w3.org/2002/07/owl#> \n\
  prefix xsd: <http://www.w3.org/2001/XMLSchema#> \n\
  prefix oboInOwl: <http://www.geneontology.org/formats/oboInOwl#> \n\
  \n\
  ';

  diseasePrefix =
    'prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n\
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
  prefix owl: <http://www.w3.org/2002/07/owl#> \n\
  prefix xsd: <http://www.w3.org/2001/XMLSchema#> \n\
  prefix oboInOwl: <http://www.geneontology.org/formats/oboInOwl#> \n\
  prefix doid: <http://purl.obolibrary.org/obo/doid#> \n\
  prefix obo: <http://purl.obolibrary.org/obo/> \n\
   \n\
   ';

  querySymptomOnt(): Observable<any> {
    const myQuery =
      this.symptomPrefix +
      'SELECT DISTINCT ?symptomName ?symptom \n\
    WHERE { \n\
    ?symptom rdfs:label ?symptomName . \n\
    FILTER REGEX(STR(?symptom), "SYMP_") \n\
    }';

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
      this.diseasePrefix +
      'SELECT DISTINCT ?diseaseID ?diseaseName ?definition \n\
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

  querySelectSymptom(subClassOf: string): Observable<any> {
    const myQuery =
      this.symptomPrefix +
      'SELECT DISTINCT ?symptomName ?symptomId \n\
      WHERE \n\
      { \n\
        ?symptom rdfs:label "' +
      subClassOf +
      '" . \n\
        ?symptoms rdfs:subClassOf ?symptom . \n\
        ?symptoms rdfs:label ?symptomName . \n\
        ?symptoms oboInOwl:id ?symptomId \n\
      }';

    return this.http.get('http://localhost:3030/ois/query', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json'
      },
      params: { query: myQuery }
    });
  }

  checkHasSubClass(subClassOf: string): Observable<any> {
    const myQuery =
      this.symptomPrefix +
      'SELECT DISTINCT ?symptomName (COUNT(*) AS ?nbOfSubClasses) \n\
      WHERE \n\
      { \n\
        ?symptom rdfs:label "' +
      subClassOf +
      '" . \n\
        ?symptoms rdfs:subClassOf ?symptom . \n\
        ?symptoms rdfs:label ?symptomName . \n\
        ?subSymptoms rdfs:subClassOf ?symptoms \n\
      } GROUP BY ?symptomName \n\
      HAVING (?nbOfSubClasses > 0)';

    return this.http.get('http://localhost:3030/ois/query', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/sparql-results+json'
      },
      params: { query: myQuery }
    });
  }
}
