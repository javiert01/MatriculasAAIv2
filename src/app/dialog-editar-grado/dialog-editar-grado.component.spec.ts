import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarGradoComponent } from './dialog-editar-grado.component';

describe('DialogEditarGradoComponent', () => {
  let component: DialogEditarGradoComponent;
  let fixture: ComponentFixture<DialogEditarGradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarGradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
