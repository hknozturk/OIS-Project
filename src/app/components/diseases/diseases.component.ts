import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {
  constructor(private sparql: SparqlService) {}
  diseases: [];
  diseaseName = '';
  diseaseDescription = '';
  selectedRow: number;
  diseaseSearch: string;

  ngOnInit() {
    this.sparql.queryDiseaseOnt().subscribe(res => {
      this.diseases = res.results.bindings;
    });
  }

  getDescription(index: number, disease: {}) {
    this.selectedRow = index;
    this.diseaseName = disease['diseaseName'].value;
    this.diseaseDescription = disease['definition'].value;
  }
}
