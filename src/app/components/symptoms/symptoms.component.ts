import { Component, OnInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit {
  symptoms: [];
  symptomName = '';
  selectedRow: number;
  symptomSearch: string;

  constructor(private sparql: SparqlService) {}

  ngOnInit() {
    this.sparql.querySymptomOnt().subscribe(res => {
      console.log(res);
      this.symptoms = res.results.bindings;
    });
  }

  getDescription(index: number, symptom: {}) {
    this.selectedRow = index;
    this.symptomName = symptom['symptomName'].value;
  }
}
