import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenviduViewComponent } from './openvidu-view.component';

describe('OpenviduViewComponent', () => {
  let component: OpenviduViewComponent;
  let fixture: ComponentFixture<OpenviduViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenviduViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenviduViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
