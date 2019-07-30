import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesCategoriaListaComponent } from './opciones-categoria-lista.component';

describe('OpcionesCategoriaListaComponent', () => {
  let component: OpcionesCategoriaListaComponent;
  let fixture: ComponentFixture<OpcionesCategoriaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesCategoriaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesCategoriaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
