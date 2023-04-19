import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumLayoutComponent } from './forum-layout.component';

describe('ForumLayoutComponent', () => {
  let component: ForumLayoutComponent;
  let fixture: ComponentFixture<ForumLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
