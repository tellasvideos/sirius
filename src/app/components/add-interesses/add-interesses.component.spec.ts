import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInteressesComponent } from './add-interesses.component';

describe('AddInteressesComponent', () => {
  let component: AddInteressesComponent;
  let fixture: ComponentFixture<AddInteressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInteressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInteressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
