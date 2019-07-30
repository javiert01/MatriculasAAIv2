import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFamiliaComponent } from './registro-familia.component';

describe('RegistroFamiliaComponent', () => {
  let component: RegistroFamiliaComponent;
  let fixture: ComponentFixture<RegistroFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
