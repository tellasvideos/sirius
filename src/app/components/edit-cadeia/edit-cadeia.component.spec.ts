import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCadeiaComponent } from './edit-cadeia.component';

describe('EditCadeiaComponent', () => {
  let component: EditCadeiaComponent;
  let fixture: ComponentFixture<EditCadeiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCadeiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCadeiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
