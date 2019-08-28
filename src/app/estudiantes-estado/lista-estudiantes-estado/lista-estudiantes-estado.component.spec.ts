import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstudiantesEstadoComponent } from './lista-estudiantes-estado.component';

describe('ListaEstudiantesEstadoComponent', () => {
  let component: ListaEstudiantesEstadoComponent;
  let fixture: ComponentFixture<ListaEstudiantesEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEstudiantesEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEstudiantesEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
