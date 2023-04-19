import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdvertisingModalComponent } from './contact-advertising-modal.component';

describe('ContactAdvertisingModalComponent', () => {
  let component: ContactAdvertisingModalComponent;
  let fixture: ComponentFixture<ContactAdvertisingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactAdvertisingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAdvertisingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
