import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountryComponent } from './pages/country/country.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
  },
  {
    path: 'country/:id',
    component: CountryComponent,
  },
  {
    path: '**',
    component: CountriesComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
