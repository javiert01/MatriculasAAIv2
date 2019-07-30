import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFamiliaComponent } from './detalle-familia.component';

describe('DetalleFamiliaComponent', () => {
  let component: DetalleFamiliaComponent;
  let fixture: ComponentFixture<DetalleFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
