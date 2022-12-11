import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPnComponent } from './status-pn.component';

describe('StatusPnComponent', () => {
  let component: StatusPnComponent;
  let fixture: ComponentFixture<StatusPnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusPnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusPnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
