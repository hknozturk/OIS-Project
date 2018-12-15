import { Component, OnInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';
import { Disease } from '../../models/disease';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  private diseases: Disease[];
  constructor(private sparql: SparqlService) {}

  ngOnInit() {
    this.diseases = this.sparql.diseaseResults;
    console.log(this.diseases);
  }
}
