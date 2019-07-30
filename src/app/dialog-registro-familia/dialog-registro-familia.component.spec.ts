import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistroFamiliaComponent } from './dialog-registro-familia.component';

describe('DialogRegistroFamiliaComponent', () => {
  let component: DialogRegistroFamiliaComponent;
  let fixture: ComponentFixture<DialogRegistroFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegistroFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegistroFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
