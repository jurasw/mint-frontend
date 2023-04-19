import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomTitleComponent } from './chat-room-title.component';

describe('ChatRoomTitleComponent', () => {
  let component: ChatRoomTitleComponent;
  let fixture: ComponentFixture<ChatRoomTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRoomTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
