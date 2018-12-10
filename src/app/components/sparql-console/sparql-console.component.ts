import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as YASQE from 'node_modules/yasgui-yasqe';

@Component({
  selector: 'app-sparql-console',
  templateUrl: './sparql-console.component.html',
  styleUrls: ['./sparql-console.component.scss']
})
export class SparqlConsoleComponent implements OnInit, AfterViewInit {
  constructor() {}

  innerResults: HTMLElement;

  ngOnInit() {
    YASQE.defaults.sparql.showQueryButton = true;
    YASQE.defaults.sparql.endpoint = 'sparql';
    YASQE.defaults.sparql.callbacks.success = function(data) {
      console.log(data);
      this.innerResults = this.json2table(data);
    };
  }

  ngAfterViewInit() {
    const yasqe = YASQE(document.getElementById('yasqe'));
  }

  json2table(json, classes) {
    const cols = Object.keys(json[0]);

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
