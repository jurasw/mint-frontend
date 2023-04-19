import { Component, OnInit } from '@angular/core';
import { IQuotes } from '../../models/quotes.interface';
import { QuotesService } from '../../services/quotes.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public quote: IQuotes[] = [];

  constructor(private quotesService: QuotesService){}

  public ngOnInit(): void {
    this.getQuotes();
  }

  public getQuotes(): void {
    this.quotesService.get().subscribe((quote: IQuotes) => {
      this.quote.push(quote);
    });
  }
}
