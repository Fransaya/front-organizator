import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';



//? IMPORTACION DE MODAL
import { ModificarTareaModalComponent } from './modal-modificar-tarea/modificar-tarea-modal/modificar-tarea-modal.component';

//? SERVICIO DE TAREAS
import { TareasService } from '../../Core/Services/tareas/tareas.service';

//? MODELO DE TAREAS
import { Tarea } from '../../Core/models/tareas.model';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
  providers: [MessageService]
  
})
export class TareasComponent implements OnInit {
  
  //* VARIABLES
  crearTarea:number=0;
  public ocultarModal=false;

  //* ARRAYS PARA GUARDAR DATA
  public tareas:Tarea[] | any=[];
  public tareasPendientes:Tarea[] | any=[];
  @Input() currentPageTasks: Tarea[] = [];

  


  first: number  = 0;

  rows: number  = 3;

  //* array de prioridada
  prioridades=[
    {id:1, nombre:'Baja'},
    {id:2, nombre:'Media'},
    {id:3, nombre:'Alta'}
  ];

  //* array de estado de tareas
  estados=[
    {id:1, nombre:'Sin empezar'},
    {id:2, nombre:'En progreso'},
    {id:3, nombre:'Terminada'}
  ]
  //* FORMULARIO DE TAREA
  public tareaForm: FormGroup= this.formBuilder.group({})

  constructor(private tareaService: TareasService, private formBuilder: FormBuilder, private dialog:MatDialog,private messageService: MessageService){}

  ngOnInit(): void {
    this.getTareas();
    this.initForm();
    this.tareasPendientes=this.tareasPendientes.slice(0, 3);
  };
  //* INICIALIZACION DE FORMULARIO
  public initForm(){
    this.tareaForm=this.formBuilder.group({
      prioridad: [null, [Validators.required, Validators.min(1), Validators.max(3)]],
      descripcion: ['', Validators.required],
      estado: [null, [Validators.required, Validators.min(1), Validators.max(3)]]
    })
  };
  //? -------------------------------------------------- METODOS UTILES Y FUNCIONALIDADES -----------------------------------
  //* MOSTRAR MODAL
  public changeState(){
    this.ocultarModal=true;
  };
  //* CERRAR MODAL
  public cerrarModal(){
    this.ocultarModal=false;
  };
  //* FORMATEAR FECHAS (DD-MM-YYYY)
  public formateDate(date:string):string{
    const fechaFormateada = moment(date).format('DD-MM-YYYY');
    return fechaFormateada;
  };
  //*  CONVERTIR PRIORIDAD DE TAREA
  public convertPrioridad(id:number){
    let prioridad;
    switch(id){
      case 1: 
        prioridad='Baja';
        break;
      case 2: 
        prioridad='Media'
        break;
      case 3: 
        prioridad='Alta'
        break;
      default:
        prioridad='Indefinida';
        break;
    };
    return prioridad;
  };
  //*  CONVERTIR ESTADO DE TAREA
  public convertEstado(id:number){
    let estado;
    switch(id){
      case 1: 
        estado='Sin empezar';
        break;
      case 2: 
        estado='En progreso';
        break;
      case 3:
          estado='Terminada';
          break;
      default:
        estado='Indefinido';
        break;
    };
    return estado;
  };
  //* FILTRAR TAREAS TERMINADAS
  public tareasPendientesF(){
    this.tareasPendientes=this.tareas.filter((tarea:Tarea)=> tarea.estado==2);
    this.currentPageTasks  = this.tareasPendientes.slice(0, 3) as Tarea[];
  };
  //* PAGINADOR PARA TEREAS PENDIENTES
  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 3;
    this.currentPageTasks=this.tareasPendientes.slice(this.first, this.first+ this.rows)
  }

  //! --------------------------------------------------- METODOS DE TAREAS --------------------------------------------
  //? --------------------------------------------------- GET TAREAS --------------------------------------------------
  public getTareas(){
    try{
      this.tareaService.getTareas().subscribe({
        next:(res:any)=>{
          this.tareas=res.data;
          this.tareasPendientesF();
        },
        error:(err)=>{
          console.error("Error al traer tareas", err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error el obtener tareas.' });
        }
      })
    }catch(err){
      console.error("Error interno del servidor", err)
    }
  };
  //? --------------------------------------------------- POST TAREAS ---------------------------------------------------
  public postTareas(){
    try{
      let prioridadSelect= this.tareaForm.get('prioridad')!.value;
      let estadoSelect= this.tareaForm.get('estado')!.value;
      let descripcion= this.tareaForm.value.descripcion;
      if(prioridadSelect && estadoSelect && descripcion){
        this.tareaService.postTarea(prioridadSelect.id, descripcion, estadoSelect.id).subscribe({
          next:(res)=>{
            if(res){
              this.getTareas();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea creada.' });
            };
            this.cerrarModal();
          },
          error:(err)=>{
            console.error("Error al crear tarea", err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error el eliminar.' });
          }
        })
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Complete todos los campos' });
      }
    }catch(err){
      console.error("Error del servidor", err)
    };
  };
  //? --------------------------------------------------- PATCH TAREA (MODAL) ---------------------------------------------------
  public  modificarTarea(id:number,prioridad:number, descripcion:string, estado:number){
      try{
        const datos={
          id,
          prioridad, 
          descripcion,
          estado
        };
        const dialog=this.dialog.open(ModificarTareaModalComponent,{
          data:datos
        })

        dialog.afterClosed().subscribe(result=>{
          this.getTareas();
        })
      }catch (err){
        console.error("Error interno del servidor",err)
      }
  };
  
  //? --------------------------------------------------- DELETE TAREA ---------------------------------------------------
    public eliminarTarea(id:number){
      try{  
        this.tareaService.deleteTarea(id).subscribe({
          next:(res)=>{
            if(res){
              this.getTareas();
              this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Tarea eliminada.' });
            }
          },
          error:(err)=>{
            console.error("No se pudo eliminar la tarea", err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar.' });
          }
        })
      }catch (err){
        console.error("Error interno del servidor",err)
      }
    };
};

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
