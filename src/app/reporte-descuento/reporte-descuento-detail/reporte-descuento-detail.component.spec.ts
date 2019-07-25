import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDescuentoDetailComponent } from './reporte-descuento-detail.component';

describe('ReporteDescuentoDetailComponent', () => {
  let component: ReporteDescuentoDetailComponent;
  let fixture: ComponentFixture<ReporteDescuentoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDescuentoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDescuentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
