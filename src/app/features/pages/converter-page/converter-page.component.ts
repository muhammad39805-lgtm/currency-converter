import { Component } from "@angular/core";
import { CurrencyFormComponent } from "../../components/currency-form/currency-form.component";
import { HistoryListComponent } from "../../components/history-list/history-list.component";
import { HeaderComponent } from "../../../shared/header/header.component";



@Component({
  standalone: true,
  selector: 'app-converter-page',
  imports: [CurrencyFormComponent, HistoryListComponent,HeaderComponent],
  templateUrl: './converter-page.component.html',

})
export class ConverterPage {}
