import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {
  constructor(private dataService: DataServiceService) {}
  diseases: [];
  diseaseName = '';
  diseaseDescription = '';
  selectedRow: number;
  diseaseSearch: string;

  ngOnInit() {
    this.dataService.queryDiseaseOnt().subscribe(res => {
      console.log(res);
      this.diseases = res.results.bindings;
    });
  }

  getDescription(index: number, disease: {}) {
    this.selectedRow = index;
    this.diseaseName = disease['diseaseName'].value;
    this.diseaseDescription = disease['definition'].value;
  }
}
