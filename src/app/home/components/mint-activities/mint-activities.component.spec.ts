import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintActivitiesComponent } from './mint-activities.component';

describe('MintActivitiesComponent', () => {
  let component: MintActivitiesComponent;
  let fixture: ComponentFixture<MintActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
