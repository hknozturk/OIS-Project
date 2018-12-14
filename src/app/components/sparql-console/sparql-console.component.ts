import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sparql-console',
  templateUrl: './sparql-console.component.html',
  styleUrls: ['./sparql-console.component.scss']
})
export class SparqlConsoleComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() { 
  }
  
  ngAfterViewInit() {
    var yasqe = YASQE(document.getElementById("yasqe"), {
      sparql: {
        showQueryButton: true,
        endpoint: "http://localhost:8080/rdf4j-server/repositories/FINAL_FED "
      }
    });
    var yasr = YASR(document.getElementById("yasr"), {
      //this way, the URLs in the results are prettified using the defined prefixes in the query
      getUsedPrefixes: yasqe.getPrefixesFromQuery
    });

    yasqe.setSize(1100, 400);
    yasqe.options.sparql.callbacks.complete = yasr.setResponse;

  }
}