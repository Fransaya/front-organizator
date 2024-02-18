import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotasService } from '../../../../Core/Services/notas/notas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modificar-nota-modal',
  templateUrl: './modificar-nota-modal.component.html',
  styleUrl: './modificar-nota-modal.component.css'
})
export class ModificarNotaModalComponent implements OnInit {

  public form: FormGroup;
  id_nota:number=0;

  constructor( public dialogRef: MatDialogRef<ModificarNotaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder, private notasService: NotasService){
      this.form=this.fb.group({
        titulo:['', Validators.required],
        contenido:['', Validators.required],
      })
    }

  ngOnInit(): void {
    this.form.patchValue(this.data);
    //? guardo el id de la nota para realizar la modificacion
    this.id_nota=this.data.id;
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  public modificarNota(){
    console.log("valores del form", this.form.value, "id de la nota", this.id_nota);
    try{
      const titulo= this.form.value.titulo;
      const contenido= this.form.value.contenido;
      if(titulo && contenido){
        this.notasService.modificarNota(this.id_nota, titulo,contenido).subscribe({
          next:(response)=>{
            console.log("respuesta de nota modificada", response);
            if(response){
              this.dialogRef.close();
              Swal.fire("Nota Modificada", "","success");
              
            }
          },  
          error:(err)=>{
            console.error("Erro del servidor", err)
          }
        })
      }
    }catch(err){
      console.error("Error al modificar la nota", err);
    }
  }

  public cancelarNota(){
    this.dialogRef.close();
  }
  
  
}
