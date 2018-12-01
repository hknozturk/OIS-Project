export class User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  blood_type: string;

  constructor(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    age: number,
    gender: string,
    height: number,
    weight: number,
    blood_type: string
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.blood_type = blood_type;
  }
}
