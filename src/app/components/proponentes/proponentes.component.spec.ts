import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponentesComponent } from './proponentes.component';

describe('ProponentesComponent', () => {
  let component: ProponentesComponent;
  let fixture: ComponentFixture<ProponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProponentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
