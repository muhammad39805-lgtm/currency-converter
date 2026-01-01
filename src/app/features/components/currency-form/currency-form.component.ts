import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CurrencyService } from '../../../core/services/currency.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Conversion } from '../../../core/models/conversion.model';
import { LoaderService } from '../../../shared/loader/loader.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-currency-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule

  ],
  templateUrl: './currency-form.component.html',
  styleUrl: './currency-form.component.css',
})
export class CurrencyFormComponent implements OnInit {
  currencies: string[] = [];
  from = 'USD';
  to = 'EUR';
  amount = 1;
  date?: Date;
  result?: Conversion;
  loading = false;

  constructor(private currencyService: CurrencyService, public loader: LoaderService, private router: Router) { }


  ngOnInit(): void {
    this.currencyService.listCurrencies().subscribe((res: any) => {
      this.currencies = Object.keys(res.data).sort();
    });
  }

  convert() {
    const params: any = {
      from: this.from,
      to: this.to,
      amount: this.amount,
    };

    if (this.date) {
      const year = this.date.getFullYear();
      const month = String(this.date.getMonth() + 1).padStart(2, '0');
      const day = String(this.date.getDate()).padStart(2, '0');
      params.date = `${year}-${month}-${day}`;
    }

    this.loader.show();

    this.currencyService.convert(params).subscribe({
      next: (res) => {
        this.result = res;
         this.router.navigate(['/history']);
      },
      error: (err) => {
        alert(err.error?.message || 'Conversion failed');
      },
      complete: () => {
        this.loader.hide();
      },
    });
  }
}
