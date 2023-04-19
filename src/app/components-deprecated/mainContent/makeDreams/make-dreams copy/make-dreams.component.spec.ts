import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDreamsComponent } from './make-dreams.component';

describe('MakeDreamsComponent', () => {
  let component: MakeDreamsComponent;
  let fixture: ComponentFixture<MakeDreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeDreamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
