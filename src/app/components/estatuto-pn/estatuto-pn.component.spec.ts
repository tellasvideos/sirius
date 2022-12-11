import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatutoPnComponent } from './estatuto-pn.component';

describe('EstatutoPnComponent', () => {
  let component: EstatutoPnComponent;
  let fixture: ComponentFixture<EstatutoPnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatutoPnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatutoPnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
