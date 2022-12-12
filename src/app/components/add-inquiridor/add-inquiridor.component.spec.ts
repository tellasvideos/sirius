import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInquiridorComponent } from './add-inquiridor.component';

describe('AddInquiridorComponent', () => {
  let component: AddInquiridorComponent;
  let fixture: ComponentFixture<AddInquiridorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInquiridorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInquiridorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
