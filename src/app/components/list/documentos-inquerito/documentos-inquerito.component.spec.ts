import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosInqueritoComponent } from './documentos-inquerito.component';

describe('DocumentosInqueritoComponent', () => {
  let component: DocumentosInqueritoComponent;
  let fixture: ComponentFixture<DocumentosInqueritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosInqueritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosInqueritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
