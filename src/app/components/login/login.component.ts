import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_email: String;
  user_password: String;
  showAlert = false;
  constructor(private dataService: DataServiceService) {}

  ngOnInit() {}

  login() {
    if (this.user_email === '' || typeof this.user_email === 'undefined') {
      console.log('Please put your email address');
    }

    if (this.user_email.length > 0 && this.user_password.length > 0) {
      this.dataService
        .authenticate(this.user_email, this.user_password)
        .subscribe(res => {
          if (res.data.email) {
            // route to other page
          } else {
            this.showAlert = true;
          }
        });
    }
  }

  register() {
    this.dataService.registration().subscribe(res => {});
  }
}
