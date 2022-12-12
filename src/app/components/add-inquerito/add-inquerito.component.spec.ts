import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInqueritoComponent } from './add-inquerito.component';

describe('AddInqueritoComponent', () => {
  let component: AddInqueritoComponent;
  let fixture: ComponentFixture<AddInqueritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInqueritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInqueritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
