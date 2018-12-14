import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import * as YASQE from 'node_modules/yasgui-yasqe';
import * as YASR from 'yasgui-yasr';


@Component({
  selector: 'app-sparql-console',
  templateUrl: './sparql-console.component.html',
  styleUrls: ['./sparql-console.component.scss']
})
export class SparqlConsoleComponent implements OnInit, AfterViewInit {
  constructor(
    private dataService: DataServiceService,
  ) {}

  innerResults: HTMLElement;

  ngOnInit() {  

    const yasqe = YASQE(document.getElementById('yasqe'));

    const yasr = YASR(document.getElementById("yasr"), {
      //this way, the URLs in the results are prettified using the defined prefixes in the query
      getUsedPrefixes: yasqe.getPrefixesFromQuery,
      useGoogleCharts: false
    });

    YASQE.defaults.sparql.showQueryButton = true;
    YASQE.defaults.sparql.endpoint = "http://localhost:8080/rdf4j-server/repositories/FINAL_FED";
    YASQE.defaults.sparql.callbacks.success =  yasr.setResponse;

  }
  
  ngAfterViewInit() {
  }

  json2table(json, classes) {
    const cols = Object.keys(json);

    let headerRow = '';
    let bodyRows = '';

    classes = classes || '';

    cols.map(function(col) {
      headerRow += '<th>' + this.capitalizeFirstLetter(col) + '</th>';
    });

    json.map(function(row) {
      bodyRows += '<tr>';

      cols.map(function(colName) {
        bodyRows += '<td>' + row[colName] + '</td>';
      });

      bodyRows += '</tr>';
    });

    return (
      '<table class="' +
      classes +
      '"><thead><tr>' +
      headerRow +
      '</tr></thead><tbody>' +
      bodyRows +
      '</tbody></table>'
    );
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
}

// YASQE.defaults.sparql.showQueryButton = true;
// YASQE.defaults.sparql.endpoint = "sparql";
// YASQE.defaults.sparql.callbacks.success = function(data){ $('#results').html(json2table(data));  };

// //finally, initialize YASQE
// var yasqe = YASQE(document.getElementById("yasqe"));

// function json2table(json, classes) {
//   var cols = Object.keys(json[0]);

//   var headerRow = '';
//   var bodyRows = '';

//   classes = classes || '';

//   function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   cols.map(function(col) {
//     headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
//   });

//   json.map(function(row) {
//     bodyRows += '<tr>';

//     cols.map(function(colName) {
//       bodyRows += '<td>' + row[colName] + '</td>';
//     })

//     bodyRows += '</tr>';
//   });

//   return '<table class="' +
//         classes +
//         '"><thead><tr>' +
//         headerRow +
//         '</tr></thead><tbody>' +
//         bodyRows +
//         '</tbody></table>';
// }
