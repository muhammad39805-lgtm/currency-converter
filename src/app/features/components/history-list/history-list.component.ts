import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../../core/services/currency.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LoaderService } from '../../../shared/loader/loader.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

interface ConversionHistory {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  conversionDate: string;
  createdAt: string;
  status: string;
}

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
})
export class HistoryListComponent implements OnInit {
  history: ConversionHistory[] = [];
 displayedColumns: string[] = ['fromCurrency','toCurrency','amount','convertedAmount','rate','conversionDate'];


  constructor(
    private currencyService: CurrencyService,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.show();
    this.currencyService.history().subscribe({
      next: (res: any[]) => {
        this.history = res.map((h) => ({
          ...h,
          status: 'Success',
        }));
      },
      error: () => {},
      complete: () => this.loader.hide(),
    });
  }
}
