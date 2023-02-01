import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInquiridorComponent } from './edit-inquiridor.component';

describe('EditInquiridorComponent', () => {
  let component: EditInquiridorComponent;
  let fixture: ComponentFixture<EditInquiridorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInquiridorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInquiridorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
