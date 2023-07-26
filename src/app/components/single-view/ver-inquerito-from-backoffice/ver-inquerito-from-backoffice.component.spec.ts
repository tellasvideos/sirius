import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInqueritoFromBackofficeComponent } from './ver-inquerito-from-backoffice.component';

describe('VerInqueritoFromBackofficeComponent', () => {
  let component: VerInqueritoFromBackofficeComponent;
  let fixture: ComponentFixture<VerInqueritoFromBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerInqueritoFromBackofficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInqueritoFromBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
