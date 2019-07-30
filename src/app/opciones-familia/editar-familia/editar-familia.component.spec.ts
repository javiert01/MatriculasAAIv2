import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFamiliaComponent } from './editar-familia.component';

describe('EditarFamiliaComponent', () => {
  let component: EditarFamiliaComponent;
  let fixture: ComponentFixture<EditarFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
