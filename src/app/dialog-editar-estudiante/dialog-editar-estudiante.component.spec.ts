import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarEstudianteComponent } from './dialog-editar-estudiante.component';

describe('DialogEditarEstudianteComponent', () => {
  let component: DialogEditarEstudianteComponent;
  let fixture: ComponentFixture<DialogEditarEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
