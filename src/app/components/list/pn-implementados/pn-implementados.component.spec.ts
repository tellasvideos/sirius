import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnImplementadosComponent } from './pn-implementados.component';

describe('PnImplementadosComponent', () => {
  let component: PnImplementadosComponent;
  let fixture: ComponentFixture<PnImplementadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnImplementadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnImplementadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
