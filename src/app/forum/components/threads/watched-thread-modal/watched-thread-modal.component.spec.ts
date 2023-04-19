import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedThreadModalComponent } from './watched-thread-modal.component';

describe('WatchedThreadModalComponent', () => {
  let component: WatchedThreadModalComponent;
  let fixture: ComponentFixture<WatchedThreadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchedThreadModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedThreadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
