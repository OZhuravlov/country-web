import {Component, Input} from '@angular/core';
import {CountryDetail} from "../../shared/country-detail";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent {

  @Input() countryDetail!: CountryDetail;

  constructor() {
  }

}
