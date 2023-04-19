import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBubblesViewComponent } from './chat-bubbles-view.component';

describe('ChatBubblesViewComponent', () => {
  let component: ChatBubblesViewComponent;
  let fixture: ComponentFixture<ChatBubblesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBubblesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBubblesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
