import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralInfoComponent } from './edit-general-info.component';

describe('EditGeneralInfoComponent', () => {
  let component: EditGeneralInfoComponent;
  let fixture: ComponentFixture<EditGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
