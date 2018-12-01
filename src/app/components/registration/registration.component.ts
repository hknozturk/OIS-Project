import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  gendertypes: Observable<any[]>;
  bloodtypes: Observable<any[]>;
  emailWarning: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  bloodType: string;
  age: number;
  height: number;
  weight: number;
  showAlert = false;

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getEnumTypes().subscribe(res => {
      const genders = res.data[0].Type.split('(')
        .pop()
        .slice(0, -1)
        .replace(/'/g, '');
      const bloods = res.data[1].Type.split('(')
        .pop()
        .slice(0, -1)
        .replace(/'/g, '');
      this.gendertypes = genders.split(',');
      this.bloodtypes = bloods.split(',');
    });
  }

  submit() {
    document.getElementById('cancel').style.visibility = 'hidden';
    document.getElementById('submit').style.visibility = 'hidden';

    const user = new User(null, null, null, null, null, null, null, null, null);
    if (typeof this.firstname === 'undefined' || this.firstname === '') {
      document.getElementById('firstname').classList.add('is-invalid');
    } else {
      document.getElementById('firstname').classList.remove('is-invalid');
      document.getElementById('firstname').classList.add('is-valid');
      user.first_name = this.firstname;
    }

    if (typeof this.lastname === 'undefined' || this.lastname === '') {
      document.getElementById('lastname').classList.add('is-invalid');
    } else {
      document.getElementById('lastname').classList.remove('is-invalid');
      document.getElementById('lastname').classList.add('is-valid');
      user.last_name = this.lastname;
    }

    if (typeof this.email === 'undefined' || this.email === '') {
      this.emailWarning = 'Please enter your email address';
      document.getElementById('email').classList.add('is-invalid');
    } else {
      // To-Do: implement e-mail format check in server
      document.getElementById('email').classList.remove('is-invalid');
      document.getElementById('email').classList.add('is-valid');
      user.email = this.email;
    }

    if (typeof this.password === 'undefined' || this.password.length < 6) {
      document.getElementById('password').classList.add('is-invalid');
    } else {
      document.getElementById('password').classList.remove('is-invalid');
      document.getElementById('password').classList.add('is-valid');
      user.password = this.password;
    }

    if (typeof this.gender === 'undefined') {
      document.getElementById('gender').classList.add('is-invalid');
    } else {
      document.getElementById('gender').classList.remove('is-invalid');
      document.getElementById('gender').classList.add('is-valid');
      user.gender = this.gender;
    }

    if (typeof this.bloodType === 'undefined') {
      document.getElementById('blood').classList.add('is-invalid');
    } else {
      document.getElementById('blood').classList.remove('is-invalid');
      document.getElementById('blood').classList.add('is-valid');
      user.blood_type = this.bloodType;
    }

    if (typeof this.age === 'undefined' || this.age === 0) {
      document.getElementById('age').classList.add('is-invalid');
    } else {
      document.getElementById('age').classList.remove('is-invalid');
      document.getElementById('age').classList.add('is-valid');
      user.age = this.age;
    }

    if (typeof this.height === 'undefined' || this.height === 0) {
      document.getElementById('height').classList.add('is-invalid');
    } else {
      document.getElementById('height').classList.remove('is-invalid');
      document.getElementById('height').classList.add('is-valid');
      user.height = this.height;
    }

    if (typeof this.weight === 'undefined' || this.weight === 0) {
      document.getElementById('weight').classList.add('is-invalid');
    } else {
      document.getElementById('weight').classList.remove('is-invalid');
      document.getElementById('weight').classList.add('is-valid');
      user.weight = this.weight;
    }

    if (
      user.first_name !== null &&
      user.last_name !== null &&
      user.email !== null &&
      user.password !== null &&
      user.gender !== null &&
      user.blood_type !== null &&
      user.age !== null &&
      user.height !== null &&
      user.weight !== null
    ) {
      this.dataService.userRegistration(user).subscribe(res => {
        document.getElementById('cancel').style.visibility = 'visible';
        document.getElementById('submit').style.visibility = 'visible';

        if (res.message === 'Registration successful') {
          this.router.navigate(['/login']);
        } else {
          this.emailWarning =
            'Email you entered already exists. Please try another email address';
          document.getElementById('email').classList.add('is-invalid');
          this.showAlert = true;
        }
      });
    }
  }

  clickOnEmail() {
    document.getElementById('email').classList.remove('is-invalid');
    document.getElementById('email').classList.remove('is-valid');
    this.showAlert = false;
  }

  getBloodType(selectedBloodType) {
    // blood-type set
  }

  getGenderValue(selectedGender) {
    // gender set
  }
}
