import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiasComponent } from './cadeias.component';

describe('CadeiasComponent', () => {
  let component: CadeiasComponent;
  let fixture: ComponentFixture<CadeiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadeiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
