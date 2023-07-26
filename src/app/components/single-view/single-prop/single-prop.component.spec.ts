import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePropComponent } from './single-prop.component';

describe('SinglePropComponent', () => {
  let component: SinglePropComponent;
  let fixture: ComponentFixture<SinglePropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
