import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoambientalComponent } from './gestaoambiental.component';

describe('GestaoambientalComponent', () => {
  let component: GestaoambientalComponent;
  let fixture: ComponentFixture<GestaoambientalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoambientalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoambientalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
