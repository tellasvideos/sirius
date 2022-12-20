import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordosComponent } from './acordos.component';

describe('AcordosComponent', () => {
  let component: AcordosComponent;
  let fixture: ComponentFixture<AcordosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcordosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcordosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
