import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgasComponent } from './pgas.component';

describe('PgasComponent', () => {
  let component: PgasComponent;
  let fixture: ComponentFixture<PgasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
