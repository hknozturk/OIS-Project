import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Symptoms } from '../models/picked-symptoms';
import { Disease } from '../models/disease';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {
  constructor(private http: HttpClient, private router: Router) {}
  diseaseResults: Disease[] = [];

  symptomPrefix =
    'prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n\
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
  prefix owl: <http://www.w3.org/2002/07/owl#> \n\
  prefix xsd: <http://www.w3.org/2001/XMLSchema#> \n\
  prefix oboInOwl: <http://www.geneontology.org/formats/oboInOwl#> \n\
  prefix obo: <http://purl.obolibrary.org/obo/> \n\
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
      'SELECT DISTINCT ?symptomName ?symptom ?definition \n\
    WHERE { \n\
    ?symptom obo:IAO_0000115 ?definition . \n\
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

  getRelatedDiseases(symptoms: Symptoms[]) {
    const diseaseCollection: Disease[] = [];
    const diseaseNameCollection: string[] = [];
    Object.keys(symptoms).forEach((key: string) => {
      const currentSymptom = symptoms[key].symptomName;

      const myQuery =
        this.diseasePrefix +
        'SELECT DISTINCT ?diseaseName ?diseaseID \n\
      WHERE \n\
      { \n\
        ?diseaseID rdfs:label ?diseaseName . \n\
        ?diseaseID rdfs:subClassOf ?disease . \n\
        ?disease owl:onProperty doid:has_symptom . \n\
        ?disease owl:someValuesFrom ?symptomID . \n\
        ?symptomID rdfs:label "' +
        currentSymptom +
        '" \n\
      }';

      const diseases = [];
      const diseaseIds = [];

      this.http
        .get('http://localhost:3030/ois/query', {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Accept: 'application/sparql-results+json'
          },
          params: { query: myQuery }
        })
        .subscribe(diseaseResults => {
          Object.keys(diseaseResults['results'].bindings).forEach(
            (k: string) => {
              if (diseaseCollection.length === 0) {
                diseaseNameCollection.push(
                  diseaseResults['results'].bindings[k].diseaseName.value
                );
                diseaseCollection.push(
                  new Disease(
                    diseaseResults['results'].bindings[k].diseaseName.value,
                    diseaseResults['results'].bindings[k].diseaseID.value,
                    symptoms[key].severity
                  )
                );
              } else {
                if (
                  diseaseNameCollection.includes(
                    diseaseResults['results'].bindings[k].diseaseName.value
                  )
                ) {
                  Object.keys(diseaseCollection).forEach((dis: string) => {
                    if (
                      diseaseCollection[dis].diseaseName ===
                      diseaseResults['results'].bindings[k].diseaseName.value
                    ) {
                      diseaseCollection[dis].probability = diseaseCollection[
                        dis
                      ].probability =
                        diseaseCollection[dis].probability +
                        symptoms[key].severity;
                    }
                  });
                } else {
                  diseaseCollection.push(
                    new Disease(
                      diseaseResults['results'].bindings[k].diseaseName.value,
                      diseaseResults['results'].bindings[k].diseaseID.value,
                      symptoms[key].severity
                    )
                  );
                }
              }

              diseases.push(
                diseaseResults['results'].bindings[k].diseaseName.value
              );
              diseaseIds.push(
                diseaseResults['results'].bindings[k].diseaseID.value
              );
            }
          );

          symptoms[key].relatedDiseaseId = diseaseIds;
          symptoms[key].relatedDiseaseName = diseases;
        });
    });
    this.diseaseResults = diseaseCollection;
    this.router.navigate(['/results']);
  }
}

// get all diseases according to all symptoms
// const myQuery =
//   this.diseasePrefix +
//   'SELECT (COUNT(*) AS ?nbOfDiseases) ?diseaseName ?diseaseID \n\
// WHERE \n\
// { \n\
//   VALUES ?value \n\
//   { \n ' +
//   symptomIds +
//   '} \n\
//   ?diseaseID rdfs:label ?diseaseName . \n\
//   ?diseaseID rdfs:subClassOf ?disease . \n\
//   ?disease owl:onProperty doid:has_symptom . \n\
//   ?disease owl:someValuesFrom ?symptomID . \n\
//   ?symptomID rdfs:label ?value \n\
// } GROUP BY ?diseaseName ?diseaseID';

// return this.http.get('http://localhost:3030/ois/query', {
//   headers: {
//     'Content-type': 'application/x-www-form-urlencoded',
//     Accept: 'application/sparql-results+json'
//   },
//   params: { query: myQuery }
// });
