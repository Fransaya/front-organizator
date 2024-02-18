import { Component, OnInit,inject, TemplateRef } from '@angular/core';
import { FormBuilder,  } from '@angular/forms';
import {  FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';



//? SERVICIO DE NOTAS
import { NotasService} from '../../Core/Services/notas/notas.service';
import { Notas } from '../../Core/models/notas.model';
import { ModificarNotaModalComponent } from './modal-modificar-nota/modificar-nota-modal/modificar-nota-modal.component';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css',
  
  
})
export class NotasComponent implements OnInit {

  notas: Notas[] | any=[];



  public notaForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder, private notasService: NotasService, public dialog:MatDialog){ }

  ngOnInit(): void {
    this.initFomr();
    this.getNotas();
  }

  public initFomr():void{
    this.notaForm=this.formBuilder.group({
      titulo:['',[Validators.required]],
      contenido:['',[Validators.required]]
    })
  }

  public getNotas(){
    try{
      this.notasService.getNotas().subscribe({
        next:(response:any)=>{
          console.log("notas traidas", response)
          this.notas= response.data;
        },
        error:(err)=>{
          console.error("Error al traer las notas ", err)
        }
      })
    }catch(err){
      console.error("Error al traer las notas", err)
    }
  }

  //* funcion para formatear fechas:
  formateDate(fechaString: string): string {
    const fechaFormateada = moment(fechaString).format('DD-MM-YYYY');
    return fechaFormateada;
  }
  
  //? funcion para crear nota
  public crearNota():void{
      try{
        console.log("valor de form", this.notaForm.value)
        let titulo: string= this.notaForm.value.titulo;
        let descripcion: string =this.notaForm.value.contenido;

        if(titulo!="" && descripcion!==""){
          this.notasService.crearNota( titulo, descripcion).subscribe({
            next:(response)=>{
              console.log("respuesta a crear notas", response);
              this.notaForm.reset();
              Swal.fire("Nota","Creada Correctamente","success");
              this.getNotas();
            },
            error:(err)=>{
              console.log("respuesta de error", err)
            }
          })
        }
      }catch(err){
        console.error("Error interno del servidor",err)
      }
  };

  public modificarNota(id:number, titulo:string,contenido:string){
    console.log("datos", id, titulo, contenido)
    try{
      if( titulo && contenido){
        //? guardo los datos dentro de un objeto para pasar al modal
          const datos={
            id,
            titulo,
            contenido
          };
          //? paso los datos al modal
          const dialog=this.dialog.open(ModificarNotaModalComponent,{
            data:datos
          });
          //? cuando se cierra el modal se actualizar las notas disponibles
          dialog.afterClosed().subscribe(result=>{
            this.getNotas();
          })
        
      }else{
        console.log("id no disponible");
        Swal.fire("Error", "No se pudo modificar la nota", "error");
      }
    }catch(err){
      console.error("No se pudo modificar la nota", err)
    }
  };

  public eliminarNota(id:number){
    try{
      this.notasService.eliminarNota(id).subscribe({
        next:(response)=>{
          console.log("respuesta al eliminar nota", response)
          if(response){
            Swal.fire("Nota Eliminada", "","success");
            this.getNotas();
          }
        }, 
        error:(err)=>{
          console.error("Error interno del servidor", err)
          Swal.fire("Error", "No se pudo eliminar la nota", "error");
        }
      })
    }catch(err){
      console.log("Error al modificar nota", err)
    }
  }

}
