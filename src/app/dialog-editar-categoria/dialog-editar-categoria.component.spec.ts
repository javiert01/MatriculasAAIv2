import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarCategoriaComponent } from './dialog-editar-categoria.component';

describe('DialogEditarCategoriaComponent', () => {
  let component: DialogEditarCategoriaComponent;
  let fixture: ComponentFixture<DialogEditarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
