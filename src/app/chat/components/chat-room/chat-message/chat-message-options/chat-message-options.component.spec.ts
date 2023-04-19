import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageOptionsComponent } from './chat-message-options.component';

describe('ChatMessageOptionsComponent', () => {
  let component: ChatMessageOptionsComponent;
  let fixture: ComponentFixture<ChatMessageOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessageOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
