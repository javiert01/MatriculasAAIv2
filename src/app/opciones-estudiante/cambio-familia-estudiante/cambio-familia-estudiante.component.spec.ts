import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioFamiliaEstudianteComponent } from './cambio-familia-estudiante.component';

describe('CambioFamiliaEstudianteComponent', () => {
  let component: CambioFamiliaEstudianteComponent;
  let fixture: ComponentFixture<CambioFamiliaEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioFamiliaEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioFamiliaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
