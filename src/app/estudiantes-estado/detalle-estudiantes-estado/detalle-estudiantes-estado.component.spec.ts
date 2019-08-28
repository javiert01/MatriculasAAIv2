import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEstudiantesEstadoComponent } from './detalle-estudiantes-estado.component';

describe('DetalleEstudiantesEstadoComponent', () => {
  let component: DetalleEstudiantesEstadoComponent;
  let fixture: ComponentFixture<DetalleEstudiantesEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEstudiantesEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEstudiantesEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
