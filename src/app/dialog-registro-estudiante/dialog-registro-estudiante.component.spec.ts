import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistroEstudianteComponent } from './dialog-registro-estudiante.component';

describe('DialogRegistroEstudianteComponent', () => {
  let component: DialogRegistroEstudianteComponent;
  let fixture: ComponentFixture<DialogRegistroEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRegistroEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegistroEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
