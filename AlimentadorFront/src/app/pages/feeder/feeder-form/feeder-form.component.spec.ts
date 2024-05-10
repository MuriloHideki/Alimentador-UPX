import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederFormComponent } from './feeder-form.component';

describe('FeederFormComponent', () => {
  let component: FeederFormComponent;
  let fixture: ComponentFixture<FeederFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeederFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
