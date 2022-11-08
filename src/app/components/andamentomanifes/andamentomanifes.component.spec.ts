import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndamentomanifesComponent } from './andamentomanifes.component';

describe('AndamentomanifesComponent', () => {
  let component: AndamentomanifesComponent;
  let fixture: ComponentFixture<AndamentomanifesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndamentomanifesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndamentomanifesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
