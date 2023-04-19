import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOptionsComponent } from './event-options.component';

describe('EventOptionsComponent', () => {
  let component: EventOptionsComponent;
  let fixture: ComponentFixture<EventOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
