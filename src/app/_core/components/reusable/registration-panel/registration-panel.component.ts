import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrls: ['./registration-panel.component.scss']
})
export class RegistrationPanelComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
