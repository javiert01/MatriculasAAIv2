import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionPagoListaComponent } from './opcion-pago-lista.component';

describe('OpcionPagoListaComponent', () => {
  let component: OpcionPagoListaComponent;
  let fixture: ComponentFixture<OpcionPagoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionPagoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionPagoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
