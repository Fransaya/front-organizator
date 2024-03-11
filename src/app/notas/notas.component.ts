import { Component, OnInit,inject, TemplateRef } from '@angular/core';
import { FormBuilder,  } from '@angular/forms';
import {  FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';


//? SERVICIO DE NOTAS
import { NotasService} from '../../Core/Services/notas/notas.service';
//? MODELO DE NOTAS
import { Notas } from '../../Core/models/notas.model';
//? MODAL DE MODIFICAR NOTAS
import { ModificarNotaModalComponent } from './modal-modificar-nota/modificar-nota-modal/modificar-nota-modal.component';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css',
  providers:[MessageService]
  
})
export class NotasComponent implements OnInit {
  //* MODELO DE NOTAS
  notas: Notas[] | any=[];
  //* FORM PARA MODIFICAR NOTA
  public notaForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder, private notasService: NotasService, public dialog:MatDialog,private messageService: MessageService){ }

  ngOnInit(): void {
    this.initFomr();
    this.getNotas();
  }
  //? --------------------------------------------------- FUNCIONALIDADES ---------------------------------------------------
  //* INICIALIZACION DE FORMULARIO
  public initFomr():void{
    this.notaForm=this.formBuilder.group({
      titulo:['',[Validators.required]],
      contenido:['',[Validators.required]]
    })
  };
  //* FORMATEO DE FECHA (DD-MM-YYYY)
  formateDate(fechaString: string): string {
    const fechaFormateada = moment(fechaString).format('DD-MM-YYYY');
    return fechaFormateada;
  }
  //! --------------------------------------------------- METODOS DE NOTAS ---------------------------------------------------
  //? --------------------------------------------------- GET NOTAS ---------------------------------------------------
  public getNotas(){
    try{
      this.notasService.getNotas().subscribe({
        next:(response:any)=>{
          this.notas= response.data;
        },
        error:(err)=>{
          console.error("Error al traer las notas ", err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error obtener notas.' });
        }
      })
    }catch(err){
      console.error("Error interno del servidor", err);
    }
  }
  //? --------------------------------------------------- POST NOTA ---------------------------------------------------
  public crearNota():void{
      try{
        let titulo: string= this.notaForm.value.titulo;
        let descripcion: string =this.notaForm.value.contenido;
        if(titulo!="" && descripcion!==""){
          this.notasService.crearNota( titulo, descripcion).subscribe({
            next:()=>{
              this.notaForm.reset();
              this.getNotas();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Nota creada.' });
            },
            error:(err)=>{
              console.error("respuesta de error", err);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear nota.' });
            }
          })
        }
      }catch(err){
        console.error("Error interno del servidor",err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error del servidor.' });
      }
  };
  //? --------------------------------------------------- PATCH NOTAS (MODAL)---------------------------------------------------
  public modificarNota(id:number, titulo:string,contenido:string){
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
            if(result.result){
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Nota modificada.' });
              this.getNotas();
            }else{
              this.messageService.add({ severity: 'info', summary: 'Informacion', detail: 'No se modifico la nota.' });
            }
            
          })
        
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'Complete los campo.' });
      }
    }catch(err){
      console.error("No se pudo modificar la nota", err)
    }
  };
  //? --------------------------------------------------- DELETE NOTA ---------------------------------------------------
  public eliminarNota(id:number){
    try{
      this.notasService.eliminarNota(id).subscribe({
        next:(response)=>{
          if(response){
            this.getNotas();
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Nota eliminada.' });
          }
        }, 
        error:(err)=>{
          console.error("Error interno del servidor", err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error el eliminar.' });
        }
      })
    }catch(err){
      console.error("Error interno del servidor", err);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error del servidor.' });
    };
  };
}
