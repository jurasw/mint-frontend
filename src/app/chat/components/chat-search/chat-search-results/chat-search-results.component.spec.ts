import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSearchResultsComponent } from './chat-search-results.component';

describe('ChatSearchResultsComponent', () => {
  let component: ChatSearchResultsComponent;
  let fixture: ComponentFixture<ChatSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
