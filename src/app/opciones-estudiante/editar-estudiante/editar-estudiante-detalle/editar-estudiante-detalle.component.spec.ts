import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstudianteDetalleComponent } from './editar-estudiante-detalle.component';

describe('EditarEstudianteDetalleComponent', () => {
  let component: EditarEstudianteDetalleComponent;
  let fixture: ComponentFixture<EditarEstudianteDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEstudianteDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstudianteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
