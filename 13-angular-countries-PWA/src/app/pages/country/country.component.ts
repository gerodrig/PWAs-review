import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountry, BordersFlag } from 'src/app/interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  country: ICountry;

  constructor(
    public countriesService: CountriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void | boolean> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    const country = await this.countriesService.getCountryById(id);

    if (!country) {
      return this.router.navigateByUrl('/');
    }

    if (country.borders) {
      country.bordersFlag = await Promise.all(
        country.borders.map(async (border) => {
          return await this.countriesService.getCountryFlag(border);
          
        })
      ) as unknown as BordersFlag[];
        // console.log(country.bordersFlag);

    }

    this.country = country;

    // console.log(country);
  }
}
