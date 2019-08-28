import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesEstadoComponent } from './estudiantes-estado.component';

describe('EstudiantesEstadoComponent', () => {
  let component: EstudiantesEstadoComponent;
  let fixture: ComponentFixture<EstudiantesEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
