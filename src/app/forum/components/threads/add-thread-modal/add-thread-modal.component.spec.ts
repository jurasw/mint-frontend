import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThreadModalComponent } from './add-thread-modal.component';

describe('AddThreadModalComponent', () => {
  let component: AddThreadModalComponent;
  let fixture: ComponentFixture<AddThreadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThreadModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThreadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
