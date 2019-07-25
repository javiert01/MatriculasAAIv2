import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDescuentoComponent } from './reporte-descuento.component';

describe('ReporteDescuentoComponent', () => {
  let component: ReporteDescuentoComponent;
  let fixture: ComponentFixture<ReporteDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDescuentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
