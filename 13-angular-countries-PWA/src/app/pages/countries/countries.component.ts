import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/interfaces/country.interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: ICountry[] = [];

  constructor(
    public countriesService: CountriesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.countries = await this.countriesService.getCountries();

    // console.log(this.countries);
  }

}
