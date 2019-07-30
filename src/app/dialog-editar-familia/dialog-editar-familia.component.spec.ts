import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarFamiliaComponent } from './dialog-editar-familia.component';

describe('DialogEditarFamiliaComponent', () => {
  let component: DialogEditarFamiliaComponent;
  let fixture: ComponentFixture<DialogEditarFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
