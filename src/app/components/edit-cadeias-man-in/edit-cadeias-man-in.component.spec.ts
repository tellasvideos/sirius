import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCadeiasManInComponent } from './edit-cadeias-man-in.component';

describe('EditCadeiasManInComponent', () => {
  let component: EditCadeiasManInComponent;
  let fixture: ComponentFixture<EditCadeiasManInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCadeiasManInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCadeiasManInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
