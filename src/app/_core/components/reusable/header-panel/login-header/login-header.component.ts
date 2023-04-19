import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss', '../header-panel.component.scss']
})
export class LoginHeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
  }

}
