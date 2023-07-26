import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCadeiaValorComponent } from './add-cadeia-valor.component';

describe('AddCadeiaValorComponent', () => {
  let component: AddCadeiaValorComponent;
  let fixture: ComponentFixture<AddCadeiaValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCadeiaValorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCadeiaValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
