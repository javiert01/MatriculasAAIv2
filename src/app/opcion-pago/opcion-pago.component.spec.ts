import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionPagoComponent } from './opcion-pago.component';

describe('OpcionPagoComponent', () => {
  let component: OpcionPagoComponent;
  let fixture: ComponentFixture<OpcionPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
