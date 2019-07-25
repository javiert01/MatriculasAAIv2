import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesEstudianteComponent } from './opciones-estudiante.component';

describe('OpcionesEstudianteComponent', () => {
  let component: OpcionesEstudianteComponent;
  let fixture: ComponentFixture<OpcionesEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
