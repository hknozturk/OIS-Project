export class Address {
  country: string;
  city: string;
  number: number;
  street_name: string;
  zip_code: number;
  id: number;

  constructor(
    country: string,
    city: string,
    number: number,
    street_name: string,
    zip_code: number,
    id?: number
  ) {
    this.country = country;
    this.city = city;
    this.number = number;
    this.street_name = street_name;
    this.zip_code = zip_code;
    this.id = id;
  }
}
