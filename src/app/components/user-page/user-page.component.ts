import { Component, OnInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';

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
  healthCondition: Array<number> = [];

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

  addSymptom(symtomName: string, symptomId: string) {
    this.healthCondition[symptomId] = 2;
    console.log(this.healthCondition);
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
}
