import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarListaEstudianteComponent } from './eliminar-lista-estudiante.component';

describe('EliminarListaEstudianteComponent', () => {
  let component: EliminarListaEstudianteComponent;
  let fixture: ComponentFixture<EliminarListaEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarListaEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarListaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
