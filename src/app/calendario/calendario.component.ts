import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MatDialog,  } from '@angular/material/dialog';
import moment from 'moment';

//! MODELO CALENDARIO
import { Calendario } from '../../Core/models/calendario.model';
//! SERVICO DE CALENDARIO
import { CalendarioService } from '../../Core/Services/calendario/calendario.service';
import { every } from 'rxjs';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
  providers:[MessageService]
})
export class CalendarioComponent implements OnInit {

  constructor(private calendarioServices: CalendarioService,private messageService: MessageService, private formBuilder:FormBuilder,public dialog:MatDialog ){}

  ngOnInit(): void {
    this.getEventos();
    this.initForm();
  };
  
  private idEvent:number=0;
  eventSeleccionada:number=1;

  public evento:Calendario[] | any=[];

  public eventoForm:FormGroup= this.formBuilder.group({})


  //* INICIALIZACION DE FORMULARIO
  public initForm(){
    this.eventoForm=this.formBuilder.group({
      fecha_seleccionada:['',Validators.required],
      titulo:['',Validators.required],
      descripcion:['',Validators.required]
    })
  };

  public formateDate(date:string):string{
    const fechaFormateada = moment(date).format('DD-MM-YYYY');
    return fechaFormateada;
  };

  public cancelEvent(eventSeleccionado:number){
    this.eventoForm.reset();
    if(eventSeleccionado==2){
      this.eventSeleccionada=1;
    }
  }
  
  //? ------------------------------------------------- GET EVENTOS -------------------------------------------------
  public getEventos(){
    try{
      this.calendarioServices.getEventos().subscribe({
        next:(res:any)=>{
          this.evento=res.data;
        },
        error:(err)=>{
          console.error("Error al traer eventos", err)
        }
      })
    }catch(err){
      console.error("Error al obtener los gastos,",err);
    }
  }

  //?  -------------------------------------------------POST EVENTO -------------------------------------------------
  public Evento(param:number,dates:any){
    if(param===1){
      //* Asigno 1 cuando se crea evento
      this.eventSeleccionada=1;
      this.postEvent();
    }else{
      //* Asigno 2 cuando se modifica evento
      this.eventSeleccionada=2;
      //* extraigo datos del array
      if(dates){
        this.idEvent=dates.id;
        const datos={
          titulo:dates.titulo,
          descripcion:dates.descripcion,
          fecha_seleccionada:(dates.fecha_seleccionada)
        }
        this.eventoForm.patchValue(datos)
      }
      
    }
  };

  //? POST EVENTO
  public postEvent(){
    if(this.eventoForm.valid){
      let fecha_creacion=this.eventoForm.value.fecha_seleccionada;
      let titulo=this.eventoForm.value.titulo;
      let descripcion=this.eventoForm.value.descripcion;
      if(fecha_creacion && titulo && descripcion){
        this.calendarioServices.postEvento(fecha_creacion,titulo,descripcion).subscribe({
          next:(res)=>{
            this.getEventos();
            this.eventoForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Evento', detail: 'creado correctamente.' });
          },
          error:(err)=>{
            console.error("Error al crear evento", err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear evento.' });
          }
        })
      }
    }else{
      console.log("datos del form invalido")
    }
  }

  //? ------------------------------------------------- PATCH EVENT -------------------------------------------------
  public modEvent(){
      let id=this.idEvent;
      let fecha_seleccionada=this.eventoForm.value.fecha_seleccionada;
      let titulo=this.eventoForm.value.titulo;
      let descripcion=this.eventoForm.value.descripcion;
    console.log("datos", id, titulo, descripcion, fecha_seleccionada)
    this.eventSeleccionada=1
    try{
      this.calendarioServices.patchEvent(id,titulo,descripcion,new Date(fecha_seleccionada)).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'success', summary: 'Modificado', detail: 'se ha modifico correctamente.' });
          this.getEventos();
          this.eventoForm.reset();
          
          
        },
        error:(err)=>{
          console.error("Error al modificar evento", err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se modifico el evento.' });
        }
      })
    }catch(err){
      console.error("Error al modificar nota")
    }
  }

  //? ------------------------------------------------- DELETE EVENT -------------------------------------------------
  public deleteEvent(id:number){
    console.log("id",id)
    try{
      this.calendarioServices.deleteEvent(id).subscribe({
        next:(res)=>{
          this.getEventos();
          this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'eliminado correctamente.' });
        },
        error:(err)=>{
          console.error("Error al eliminar evento", err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se elimino el evento.' });
        }
      })
    }catch(err){
      console.error("Error al eliminar evento", err)

    }
  }

  


}
