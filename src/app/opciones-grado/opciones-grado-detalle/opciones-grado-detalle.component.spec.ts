import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesGradoDetalleComponent } from './opciones-grado-detalle.component';

describe('OpcionesGradoDetalleComponent', () => {
  let component: OpcionesGradoDetalleComponent;
  let fixture: ComponentFixture<OpcionesGradoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesGradoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesGradoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
