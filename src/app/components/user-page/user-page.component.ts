import { Component, OnInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';
import { Symptoms } from '../../models/picked-symptoms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  symptoms: [];
  subSymptoms: [];
  hasSubClass: Array<string> = [];
  selectedSymptom = 'Symptoms';
  subLevel = 0;
  steps: Array<string> = [];
  healthCondition: Symptoms[] = [];

  constructor(private sparql: SparqlService) {}

  ngOnInit() {
    this.sparql.querySelectSymptom('symptom').subscribe(res => {
      this.symptoms = res.results.bindings;
    });
  }

  getSubClasses(symptomName: string) {
    this.sparql.querySelectSymptom(symptomName).subscribe(res => {
      this.subSymptoms = res.results.bindings;
    });

    this.sparql.checkHasSubClass(symptomName).subscribe(res => {
      Object.keys(res.results.bindings).forEach((key: string) => {
        this.hasSubClass.push(res.results.bindings[key].symptomName.value);
      });
    });
    this.selectedSymptom = symptomName;
    this.steps = new Array();
    this.steps.push(symptomName);
  }

  getSubLevel(symptomName: string) {
    this.sparql.querySelectSymptom(symptomName).subscribe(res => {
      this.subSymptoms = res.results.bindings;
    });

    this.sparql.checkHasSubClass(symptomName).subscribe(res => {
      Object.keys(res.results.bindings).forEach((key: string) => {
        this.hasSubClass.push(res.results.bindings[key].symptomName.value);
      });
    });
    this.selectedSymptom = symptomName;
    this.steps.push(symptomName);
    this.subLevel++;
  }

  backToParent() {
    const previousSymptom = this.steps[this.steps.length - 2];
    this.steps.pop();
    this.sparql.querySelectSymptom(previousSymptom).subscribe(res => {
      this.subSymptoms = res.results.bindings;
    });

    this.sparql.checkHasSubClass(previousSymptom).subscribe(res => {
      Object.keys(res.results.bindings).forEach((key: string) => {
        this.hasSubClass.push(res.results.bindings[key].symptomName.value);
      });
    });
    this.selectedSymptom = previousSymptom;
    this.subLevel--;
  }

  addSymptom(symtomName: string, symptomId: string) {
    this.healthCondition.push(new Symptoms(symtomName, symptomId));
  }

  removeSymptom(index: number) {
    this.healthCondition.splice(index, 1);
  }

  submit() {
    this.sparql.getRelatedDiseases(this.healthCondition);
  }
}
