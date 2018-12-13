import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit {
  symptoms: [];
  symptomName = '';
  symptomDescription = '';
  selectedRow: number;
  symptomSearch: string;

  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.dataService.querySymptomOnt().subscribe(res => {
      console.log(res);
      this.symptoms = res.results.bindings;
    });
  }

  // getDescription(index: number, symptom: {}) {
  //   this.selectedRow = index;
  //   this.diseaseName = symptom['diseaseName'].value;
  //   this.diseaseDescription = disease['definition'].value;
  // }
}
