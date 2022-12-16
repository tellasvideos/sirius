import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInterestComponent } from './single-interest.component';

describe('SingleInterestComponent', () => {
  let component: SingleInterestComponent;
  let fixture: ComponentFixture<SingleInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
