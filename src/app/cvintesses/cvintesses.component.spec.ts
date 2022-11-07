import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvintessesComponent } from './cvintesses.component';

describe('CvintessesComponent', () => {
  let component: CvintessesComponent;
  let fixture: ComponentFixture<CvintessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvintessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvintessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
