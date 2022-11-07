import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InqueritoComponent } from './inquerito.component';

describe('InqueritoComponent', () => {
  let component: InqueritoComponent;
  let fixture: ComponentFixture<InqueritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InqueritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InqueritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
