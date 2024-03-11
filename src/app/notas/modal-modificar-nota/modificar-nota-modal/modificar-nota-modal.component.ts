import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotasService } from '../../../../Core/Services/notas/notas.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-modificar-nota-modal',
  templateUrl: './modificar-nota-modal.component.html',
  styleUrl: './modificar-nota-modal.component.css',
  providers:[MessageService]
})
export class ModificarNotaModalComponent implements OnInit {
  //* FORMULARIO PARA MODIFICAR NOTAS
  public form: FormGroup;
  //* VARIABLE PARA ALMACENAR NOTAS
  id_nota:number=0;

  constructor( public dialogRef: MatDialogRef<ModificarNotaModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private fb:FormBuilder, 
  private notasService: NotasService,private messageService: MessageService){
      this.form=this.fb.group({
        titulo:['', Validators.required],
        contenido:['', Validators.required],
      })
    }
    //? ---------------------------------------------------- FUNCIONALIDADES ----------------------------------------------------
  ngOnInit(): void {
    this.form.patchValue(this.data);
    //? guardo el id de la nota para realizar la modificacion
    this.id_nota=this.data.id;
  };
  //* CIERRO MODAL
  onNoClick(): void {
    this.dialogRef.close();
  }
  //* CERRAR MODAL AL CANCELAR (BTN)
  public cancelarNota(){
    this.dialogRef.close({result:false});
  }
  //! ---------------------------------------------------- PATCH NOTA ----------------------------------------------------
  public modificarNota(){
    try{
      const titulo= this.form.value.titulo;
      const contenido= this.form.value.contenido;
      if(titulo && contenido){
        this.notasService.modificarNota(this.id_nota, titulo,contenido).subscribe({
          next:(response)=>{
            if(response){
              this.messageService.add({ severity: 'success', summary: 'Modificada', detail: 'Nota modificada.' });
              this.dialogRef.close({result:true});
            }
          },  
          error:(err)=>{
            console.error("Erro del servidor", err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al modificar.' });
          }
        })
      }
    }catch(err){
      console.error("Error al modificar la nota", err);
    }
  }
}
