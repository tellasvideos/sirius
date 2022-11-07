import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiadevalorComponent } from './cadeiadevalor.component';

describe('CadeiadevalorComponent', () => {
  let component: CadeiadevalorComponent;
  let fixture: ComponentFixture<CadeiadevalorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadeiadevalorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadeiadevalorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
