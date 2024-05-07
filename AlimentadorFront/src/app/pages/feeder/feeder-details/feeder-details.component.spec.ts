import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederDetailsComponent } from './feeder-details.component';

describe('FeederDetailsComponent', () => {
  let component: FeederDetailsComponent;
  let fixture: ComponentFixture<FeederDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeederDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
