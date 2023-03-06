import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICountry, BordersFlag } from '../interfaces/country.interface';

const URL = 'https://restcountries.com/v2';

// https://restcountries.com/v2/{service}?fields={field},{field},{field}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countries: ICountry[] = [];

  constructor(private http: HttpClient) {}

  getCountries(): Promise<ICountry[]> {
    if (this.countries.length > 0) {
      return Promise.resolve(this.countries);
    }

    return new Promise((resolve) => {
      this.http.get(`${URL}/lang/es`).subscribe((countries: ICountry[]) => {
        // console.log(this.countries);
        this.countries = countries;
        resolve(countries);
      });
    });
  }

  getCountryById(id: string): Promise<ICountry> {
    if (this.countries.length > 0) {
      const country = this.countries.find((c) => c.alpha3Code === id);
      return Promise.resolve(country);
    }

    return this.getCountries().then((countries) => {
      const country = countries.find((c) => c.alpha3Code === id);
      return Promise.resolve(country);
    });
  }

  getCountryFlag(code: string): Promise<BordersFlag> {

    return new Promise((resolve) => {

      if(!code) return resolve(null);

      this.http.get(`${URL}/alpha/${code}`).subscribe((country: ICountry) => {
        resolve({ name: country.name, flag: country.flag, code: country.alpha3Code});
      });
    });
  }
}
