import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostReportBadgeComponent } from './post-report-badge.component';

describe('PostReportsComponent', () => {
  let component: PostReportBadgeComponent;
  let fixture: ComponentFixture<PostReportBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostReportBadgeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReportBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
