import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsViewerComponent } from './visits-viewer.component';

describe('VisitsViewerComponent', () => {
  let component: VisitsViewerComponent;
  let fixture: ComponentFixture<VisitsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
