import {Component} from '@angular/core';
import {Country} from "../shared/country";
import {CountryService} from "../service/country.service";
import {CountryDetail} from "../shared/country-detail";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  providers: [CountryService]
})
export class CountriesComponent {

  selectedCountryDetail: CountryDetail | undefined;
  infoMessage: string = "Please select a Country!";
  isError: boolean = false;

  constructor(private countryService: CountryService) {
  }

  onCountrySelected(country: Country) {
    this._retrieveCountryDetail(country.name);
  }

  setError(errorMessage: string) {
    this.isError = true;
    this.selectedCountryDetail = undefined;
    this.infoMessage = errorMessage;
  }

  private _retrieveCountryDetail(countryName: string): void {
    this.countryService.getDetailsByName(countryName + (countryName === 'Algeria'? 'swdsw': ''))
      .subscribe({
        next: response => {
          this.isError = false;
          this.selectedCountryDetail = response;
        },
        error: (e) => {
          console.error(e);
          const {errorMessage} = e.error;
          this.setError(errorMessage);
        }
      });
  }

}
