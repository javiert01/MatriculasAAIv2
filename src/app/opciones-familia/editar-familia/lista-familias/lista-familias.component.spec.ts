import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFamiliasComponent } from './lista-familias.component';

describe('ListaFamiliasComponent', () => {
  let component: ListaFamiliasComponent;
  let fixture: ComponentFixture<ListaFamiliasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFamiliasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFamiliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
