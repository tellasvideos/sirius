import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInqueritoComponent } from './edit-inquerito.component';

describe('EditInqueritoComponent', () => {
  let component: EditInqueritoComponent;
  let fixture: ComponentFixture<EditInqueritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInqueritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInqueritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
