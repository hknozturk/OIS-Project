import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {
  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.dataService.queryDiseaseOnt().subscribe(res => {
      console.log(res);
    });
  }
}
