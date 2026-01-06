import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CurrencyService } from '../../../core/services/currency.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { finalize } from 'rxjs';
import { Currency } from '../../../core/models/conversion.model';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.css'
})
export class CurrencyListComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'symbol', 'type'];
  dataSource: Currency[] = [];



  constructor(
    private currencyService: CurrencyService,
    public loader: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrencies();
  }


loadCurrencies() {
  this.loader.show();

  this.currencyService.listCurrencies()
    .pipe(finalize(() => this.loader.hide()))
    .subscribe({
      next: (res: any) => {
        this.dataSource = Object.keys(res.data).map(code => ({
          code,
          name: res.data[code].name,
          symbol: res.data[code].symbol,
          type: res.data[code].type
        }));
      },
      error: (err) => {
        console.error(err);
      }
    });
}

}
