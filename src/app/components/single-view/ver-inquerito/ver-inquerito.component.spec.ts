import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInqueritoComponent } from './ver-inquerito.component';

describe('VerInqueritoComponent', () => {
  let component: VerInqueritoComponent;
  let fixture: ComponentFixture<VerInqueritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerInqueritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInqueritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
