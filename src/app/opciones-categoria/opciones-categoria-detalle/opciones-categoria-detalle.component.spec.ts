import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesCategoriaDetalleComponent } from './opciones-categoria-detalle.component';

describe('OpcionesCategoriaDetalleComponent', () => {
  let component: OpcionesCategoriaDetalleComponent;
  let fixture: ComponentFixture<OpcionesCategoriaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesCategoriaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesCategoriaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
