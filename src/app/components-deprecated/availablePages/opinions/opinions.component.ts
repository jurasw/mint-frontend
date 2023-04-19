import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendMessageService } from './services/send-message.service';
@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.scss']
})
export class OpinionsComponent implements OnInit {

  constructor(
    private sendMessageService: SendMessageService,
  ) {}
  public maxChars = 2000;
  public role = '';
  public chars = 0;
  public stars = [1, 2, 3, 4, 5];
  public rating = 0;
  public hoverState = 0;
  public isSend = false;
  
  public opinionForm = new FormGroup({
    'text': new FormControl("", {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]})
  });

  public onStarEnter(starId: number): void {
    this.hoverState = starId;
  }
  public onStarLeave(): void {
    this.hoverState = 0;
  }
  public onStarClicked(starId: number): void {
    this.rating = starId;
  }

  onSubmit() {
    this.opinionForm.value.score = this.rating;
    this.sendMessageService.sendMessage(this.opinionForm.value).subscribe(
      ()=>{
        this.isSend = true;
      },
      (err) => {
        this.isSend = false;
      }
    );
  }

  public ngOnInit(): void {}
}
