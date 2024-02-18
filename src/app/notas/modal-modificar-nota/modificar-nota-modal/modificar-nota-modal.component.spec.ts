import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarNotaModalComponent } from './modificar-nota-modal.component';

describe('ModificarNotaModalComponent', () => {
  let component: ModificarNotaModalComponent;
  let fixture: ComponentFixture<ModificarNotaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarNotaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarNotaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
