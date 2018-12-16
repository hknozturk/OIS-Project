import { Component, OnInit } from '@angular/core';
import { SparqlService } from 'src/app/services/sparql.service';
import { Disease } from '../../models/disease';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  private diseases: Disease[];
  constructor(private sparql: SparqlService) {}

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  long: number;
  lat: number;

  source: any;
  marker: any;

  ngOnInit() {
    this.diseases = this.sparql.diseaseResults;
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.buildMap();
  }

  buildMap() {
    const coordinates = this.zipToCoordinate('1050');
    this.long = coordinates['longitude'];
    this.lat = coordinates['latitude'];
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.long, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', event => {
      // Add the data to your map as a layer

      this.map.addLayer({
        id: 'hospitals',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: this.getClosestHospitals(this.long, this.lat)
        },
        layout: {
          'icon-image': 'hospital-15',
          'icon-allow-overlap': true
        }
      });
    });
  }

  zipToCoordinate(zipcode: string): any {
    const coords = { longitude: 4.367722, latitude: 50.84056 };
    const request =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      zipcode +
      '%20Belgium.json?access_token=' +
      environment.mapbox.accessToken;
    // data is the geocoding result as parsed JSON
    // res is the http response, including: status, headers and entity properties
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', request, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const content = JSON.parse(this.responseText);
        coords['longitude'] = content.features[0].geometry.coordinates[0];
        coords['latitude'] = content.features[0].geometry.coordinates[1];
      }
    };

    return coords;
  }

  getClosestHospitals(long: number, lat: number): any {
    let content = {};
    const url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/properties.category=hospital' +
      long +
      ',' +
      lat +
      '.json?types=poi&access_token=' +
      environment.mapbox.accessToken;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        content = this.response;
      }
    };

    return content;
  }
}
