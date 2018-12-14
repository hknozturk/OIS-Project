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

  constructor(private sparql: SparqlService) {}

  ngOnInit() {
    this.sparql.querySelectSymptom('symptom').subscribe(res => {
      console.log(res);
      this.symptoms = res.results.bindings;
    });
  }

  getSubClasses(symptomName: string) {
    this.sparql.querySelectSymptom(symptomName).subscribe(res => {
      this.subSymptoms = res.results.bindings;
      console.log(res);
    });

    this.sparql.checkHasSubClass(symptomName).subscribe(res => {
      Object.keys(res.results.bindings).forEach((key: string) => {
        this.hasSubClass.push(res.results.bindings[key].symptomName.value);
      });
      console.log(this.hasSubClass);
    });
  }
}
