import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenViduSessionComponent } from './openvidu-session.component';


describe('OpenViduSessionComponent', () => {
  let component: OpenViduSessionComponent;
  let fixture: ComponentFixture<OpenViduSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenViduSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenViduSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
