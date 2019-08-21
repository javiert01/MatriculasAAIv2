import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarListaEstudiantesComponent } from './editar-lista-estudiantes.component';

describe('EditarListaEstudiantesComponent', () => {
  let component: EditarListaEstudiantesComponent;
  let fixture: ComponentFixture<EditarListaEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarListaEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarListaEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
