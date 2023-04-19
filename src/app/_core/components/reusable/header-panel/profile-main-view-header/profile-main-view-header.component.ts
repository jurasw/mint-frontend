import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-main-view-header',
  templateUrl: './profile-main-view-header.component.html',
  styleUrls: ['./profile-main-view-header.component.scss', '../header-panel.component.scss']
})
export class ProfileMainViewHeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void { }

}
