import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTypePanelComponent } from './notification-type-panel.component';

describe('NotificationTypePanelComponent', () => {
  let component: NotificationTypePanelComponent;
  let fixture: ComponentFixture<NotificationTypePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationTypePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTypePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
