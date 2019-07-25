import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaldoPendienteComponent } from './dialog-saldo-pendiente.component';

describe('DialogSaldoPendienteComponent', () => {
  let component: DialogSaldoPendienteComponent;
  let fixture: ComponentFixture<DialogSaldoPendienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSaldoPendienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaldoPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
