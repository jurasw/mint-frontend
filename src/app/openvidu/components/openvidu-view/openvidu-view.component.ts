import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-openvidu-view',
  templateUrl: './openvidu-view.component.html',
  styleUrls: ['./openvidu-view.component.scss']
})
export class OpenviduViewComponent implements OnInit {
  public showChat = false;
  constructor() { }

  public ngOnInit(): void {}

}
