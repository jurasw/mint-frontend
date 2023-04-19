import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfWarningsModalComponent } from './history-of-warnings-modal.component';

describe('HistoryOfWarningsModalComponent', () => {
  let component: HistoryOfWarningsModalComponent;
  let fixture: ComponentFixture<HistoryOfWarningsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOfWarningsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfWarningsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
