import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstatutoComponent } from './edit-estatuto.component';

describe('EditEstatutoComponent', () => {
  let component: EditEstatutoComponent;
  let fixture: ComponentFixture<EditEstatutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEstatutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEstatutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
