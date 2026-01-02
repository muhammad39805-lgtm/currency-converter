import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversion } from '../models/conversion.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listCurrencies() {
    return this.http.get(`${this.baseUrl}/currency/list`);
  }

  convert(params: any) {
    return this.http.get<Conversion>(
      `${this.baseUrl}/currency/convert`,
      { params },
    );
  }

  history() {
    return this.http.get<Conversion[]>(
      `${this.baseUrl}/currency/history`,
    );
  }
}
