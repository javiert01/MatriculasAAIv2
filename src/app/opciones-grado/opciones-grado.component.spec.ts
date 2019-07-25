import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesGradoComponent } from './opciones-grado.component';

describe('OpcionesGradoComponent', () => {
  let component: OpcionesGradoComponent;
  let fixture: ComponentFixture<OpcionesGradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesGradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
