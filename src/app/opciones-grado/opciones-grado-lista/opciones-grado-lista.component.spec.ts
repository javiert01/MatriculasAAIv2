import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesGradoListaComponent } from './opciones-grado-lista.component';

describe('OpcionesGradoListaComponent', () => {
  let component: OpcionesGradoListaComponent;
  let fixture: ComponentFixture<OpcionesGradoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesGradoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesGradoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
