import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCambioFamiliaComponent } from './dialog-cambio-familia.component';

describe('DialogCambioFamiliaComponent', () => {
  let component: DialogCambioFamiliaComponent;
  let fixture: ComponentFixture<DialogCambioFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCambioFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCambioFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
