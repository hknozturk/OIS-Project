import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit {
  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.dataService.querySymptomOnt().subscribe(res => {
      console.log(res);
    });
  }
}
