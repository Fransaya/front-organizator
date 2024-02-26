import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarGastoComponent } from './modal-modificar-gasto.component';

describe('ModalModificarGastoComponent', () => {
  let component: ModalModificarGastoComponent;
  let fixture: ComponentFixture<ModalModificarGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalModificarGastoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalModificarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
