export class User {
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  password: string;

  constructor(
    email: string,
    first_name: string,
    last_name: string,
    age: number,
    gender: string,
    password: string
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
    this.gender = gender;
    this.password = password;
  }
}
