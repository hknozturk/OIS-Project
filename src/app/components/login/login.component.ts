import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.dataService.authenticate().subscribe(res => {
      console.log('First Try Out Baby: ', res);
    });
  }

  register() {
    this.dataService.registration().subscribe(res => {
      console.log('Registration Process: ', res);
    });
  }
}
