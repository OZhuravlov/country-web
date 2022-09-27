import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Constants} from "../../shared/constants";
import {Country} from "../../shared/country";
import {CountryService} from "../../service/country.service";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers: [CountryService]
})
export class CountryListComponent implements OnInit {

  @Output() countrySelected = new EventEmitter<Country>();
  @Output() retrievalError = new EventEmitter<string>();

  countries: Country[] = [];
  pageSizes: number[] = Constants.PAGE_SIZES;
  pageSize = Constants.DEFAULT_PAGE_SIZE;
  total = 0;
  page = 1;
  selectedCountry!: Country;
  loading$ = this.loader.loading$;
  errorMessage!: string;

  constructor(private countryService: CountryService,
              private loader: LoadingService) {
  }

  ngOnInit(): void {
    this._retrieveCountries();
  }

  onSelectCountry(country: Country) {
    this.selectedCountry = country;
    this.countrySelected.emit(country);
  }

  handlePageChange(page: any): void {
    this.page = page;
    this._retrieveCountries();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this._retrieveCountries();
  }

  private _retrieveCountries(): void {
    this.loader.show();
    this.countryService.getAll()
      .subscribe({
        next: response => {
          this.countries = response.countries;
          this.total = this.countries.length;
          this.loader.hide();
        },
        error: (e) => {
          console.error(e);
          const {errorMessage} = e.error;
          this.countries = [];
          this.errorMessage = errorMessage;
          this.retrievalError.emit(errorMessage);
        }
      });
  }
}
