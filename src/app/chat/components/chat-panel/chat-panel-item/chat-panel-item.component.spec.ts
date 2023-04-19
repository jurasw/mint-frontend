import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPanelItemComponent } from './chat-panel-item.component';

describe('ChatPanelItemComponent', () => {
  let component: ChatPanelItemComponent;
  let fixture: ComponentFixture<ChatPanelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPanelItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPanelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
