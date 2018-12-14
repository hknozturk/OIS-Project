import { Component, OnInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  symptoms: [];

  constructor(private sparql: SparqlService) {}

  ngOnInit() {
    this.sparql.querySelectSymptom('symptom').subscribe(res => {
      console.log(res);
      this.symptoms = res.results.bindings;
    });
  }

  getSubClasses(symptomName: string) {
    this.sparql.querySelectSymptom(symptomName).subscribe(res => {
      console.log(res);
    });

    this.sparql.checkHasSubClass(symptomName).subscribe(res => {
      console.log(res);
    });
  }
}
