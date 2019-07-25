import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesFamiliaComponent } from './opciones-familia.component';

describe('OpcionesFamiliaComponent', () => {
  let component: OpcionesFamiliaComponent;
  let fixture: ComponentFixture<OpcionesFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
