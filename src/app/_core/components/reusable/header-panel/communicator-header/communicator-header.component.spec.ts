import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicatorHeaderComponent } from './communicator-header.component';

describe('CommunicatorHeaderComponent', () => {
  let component: CommunicatorHeaderComponent;
  let fixture: ComponentFixture<CommunicatorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicatorHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicatorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
