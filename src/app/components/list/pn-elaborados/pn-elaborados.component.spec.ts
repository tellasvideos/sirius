import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnElaboradosComponent } from './pn-elaborados.component';

describe('PnElaboradosComponent', () => {
  let component: PnElaboradosComponent;
  let fixture: ComponentFixture<PnElaboradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnElaboradosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnElaboradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
