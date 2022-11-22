import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndManifestComponent } from './add-and-manifest.component';

describe('AddAndManifestComponent', () => {
  let component: AddAndManifestComponent;
  let fixture: ComponentFixture<AddAndManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAndManifestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAndManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
