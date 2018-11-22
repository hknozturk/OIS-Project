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
  warning_message: String;
  showAlert = false;
  constructor(private dataService: DataServiceService) {}

  ngOnInit() {}

  login() {
    if (
      typeof this.user_email === 'undefined' ||
      typeof this.user_password === 'undefined'
    ) {
      // to-do: alert doesn't show up. Implement new alert or animations.
      this.warning_message = 'Please fill areas';
      this.showAlert = true;
    } else if (this.user_email.length > 0 && this.user_password.length > 0) {
      this.dataService
        .authenticate(this.user_email, this.user_password)
        .subscribe(res => {
          console.log(res);
          if (res.data.email) {
            // route to other page
          } else if (res.message === 'Email does not exists') {
            this.warning_message = `Email doesn't exists!`;
            this.showAlert = true;
          } else if (res.message === 'User Authenticated Failed!') {
            this.warning_message = `Email and password does not match. Please check your email and password.`;
            this.showAlert = true;
          }
        });
    }
  }
}
