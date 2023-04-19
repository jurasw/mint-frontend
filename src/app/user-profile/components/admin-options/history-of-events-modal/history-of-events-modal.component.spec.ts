import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfEventsModalComponent } from './history-of-events-modal.component';

describe('HistoryOfEventsModalComponent', () => {
  let component: HistoryOfEventsModalComponent;
  let fixture: ComponentFixture<HistoryOfEventsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOfEventsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfEventsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
