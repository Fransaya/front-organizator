import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateGastoComponent } from './modal-create-gasto.component';

describe('ModalCreateGastoComponent', () => {
  let component: ModalCreateGastoComponent;
  let fixture: ComponentFixture<ModalCreateGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateGastoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreateGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
