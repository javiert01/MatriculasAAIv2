import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarDetalleEstudianteComponent } from './eliminar-detalle-estudiante.component';

describe('EliminarDetalleEstudianteComponent', () => {
  let component: EliminarDetalleEstudianteComponent;
  let fixture: ComponentFixture<EliminarDetalleEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarDetalleEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarDetalleEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
