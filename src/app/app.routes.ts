import { Routes } from '@angular/router';
import { ConverterPage } from './features/pages/converter-page/converter-page.component';
import { CurrencyFormComponent } from './features/components/currency-form/currency-form.component';
import { HistoryListComponent } from './features/components/history-list/history-list.component';
import { CurrencyListComponent } from './features/components/currency-list/currency-list.component';


export const routes: Routes = [
  { path: '', redirectTo: '/convert', pathMatch: 'full' },
  { path: 'convert', component: ConverterPage },
  { path: 'currencies', component: CurrencyFormComponent },
  { path: 'history', component: HistoryListComponent },
  { path: 'currencies-list', component: CurrencyListComponent }
];
