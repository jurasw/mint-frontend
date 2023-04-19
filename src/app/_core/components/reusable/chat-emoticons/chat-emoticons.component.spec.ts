import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEmoticonsComponent } from './chat-emoticons.component';

describe('ChatEmoticonsComponent', () => {
  let component: ChatEmoticonsComponent;
  let fixture: ComponentFixture<ChatEmoticonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatEmoticonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEmoticonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
