import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcordoComponent } from './edit-acordo.component';

describe('EditAcordoComponent', () => {
  let component: EditAcordoComponent;
  let fixture: ComponentFixture<EditAcordoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAcordoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAcordoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
