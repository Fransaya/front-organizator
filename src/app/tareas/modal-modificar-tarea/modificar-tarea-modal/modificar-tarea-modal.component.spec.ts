import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTareaModalComponent } from './modificar-tarea-modal.component';

describe('ModificarTareaModalComponent', () => {
  let component: ModificarTareaModalComponent;
  let fixture: ComponentFixture<ModificarTareaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarTareaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarTareaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
