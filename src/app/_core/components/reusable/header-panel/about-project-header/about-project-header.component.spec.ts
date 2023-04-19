import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProjectHeaderComponent } from './about-project-header.component';

describe('AboutProjectHeaderComponent', () => {
  let component: AboutProjectHeaderComponent;
  let fixture: ComponentFixture<AboutProjectHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutProjectHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutProjectHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
