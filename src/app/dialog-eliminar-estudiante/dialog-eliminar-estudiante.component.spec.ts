import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarEstudianteComponent } from './dialog-eliminar-estudiante.component';

describe('DialogEliminarEstudianteComponent', () => {
  let component: DialogEliminarEstudianteComponent;
  let fixture: ComponentFixture<DialogEliminarEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEliminarEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEliminarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
