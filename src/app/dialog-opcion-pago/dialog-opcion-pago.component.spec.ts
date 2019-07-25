import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOpcionPagoComponent } from './dialog-opcion-pago.component';

describe('DialogOpcionPagoComponent', () => {
  let component: DialogOpcionPagoComponent;
  let fixture: ComponentFixture<DialogOpcionPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOpcionPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOpcionPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
