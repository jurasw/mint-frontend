import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  constructor() {}

  public ngOnInit(): void {}

  public showRegulations(link: string): void {
    window.open(link);
  }
}