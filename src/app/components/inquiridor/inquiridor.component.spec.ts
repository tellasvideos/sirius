import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiridorComponent } from './inquiridor.component';

describe('InquiridorComponent', () => {
  let component: InquiridorComponent;
  let fixture: ComponentFixture<InquiridorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiridorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiridorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
