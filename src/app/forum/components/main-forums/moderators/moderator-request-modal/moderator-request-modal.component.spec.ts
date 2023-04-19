import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorRequestModalComponent } from './moderator-request-modal.component';

describe('ModeratorRequestModalComponent', () => {
  let component: ModeratorRequestModalComponent;
  let fixture: ComponentFixture<ModeratorRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
