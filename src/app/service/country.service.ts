import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _baseUrl = environment.apiURL + '/countries';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(this._baseUrl)
      .pipe();
  }

  public getDetailsByName(name: string): Observable<any> {
    return this.http.get<any>(this._baseUrl + '/' + name)
      .pipe();
  }
}
