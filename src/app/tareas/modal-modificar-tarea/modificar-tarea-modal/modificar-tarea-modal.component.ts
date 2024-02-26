import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

//? SERVICIO DE TAREAS
import { TareasService } from '../../../../Core/Services/tareas/tareas.service';

//? MODELO DE TAREAS
import { Tarea } from '../../../../Core/models/tareas.model';

@Component({
  selector: 'app-modificar-tarea-modal',
  templateUrl: './modificar-tarea-modal.component.html',
  styleUrl: './modificar-tarea-modal.component.css',
  providers:[MessageService]
})
export class ModificarTareaModalComponent implements OnInit {
  //* FORM GROUP 
  public form: FormGroup;

  //* VARIABLE PARA ID TAREA
  id_tarea:number=0;

  //* ARRAY PARA TAREA
  tareas:Tarea[] | any=[];

  constructor(public dialogRef:MatDialogRef<ModificarTareaModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any ,private tareaService: TareasService, 
    private formBuilder: FormBuilder, private messageService: MessageService){
      this.form=this.formBuilder.group({
        titulo:['', Validators.required],
        contenido:['', Validators.required],
      })
    }
  //* INICIALIZACION DE COMPONENTE
  ngOnInit(): void {
    this.initForm();
    this.id_tarea=this.data.id; //. asigno el id de la tarea que se trae en la data
    this.completarForm();
  }
  //? --------------------------------------------------- FUNCIONALIDADES ---------------------------------------------------
  //* CIERRA MODAL
  onNoClick(): void {
    this.dialogRef.close();
  }

  public cancelar(){
    this.dialogRef.close();
  };

  //* INICIALIZACION DE FORMULARIO
  public initForm(){
    this.form=this.formBuilder.group({
      prioridad: [null, [Validators.required, Validators.min(1), Validators.max(3)]],
      descripcion: ['', Validators.required],
      estado: [null, [Validators.required, Validators.min(1), Validators.max(3)]]
    })
  };

  //* ARRAY CONTIENE PRIORIDADES
  prioridades=[
    {id:1, nombre:'Baja'},
    {id:2, nombre:'Media'},
    {id:3, nombre:'Alta'}
  ];

  //* ARRAY PARA ESTADO DE TAREAS
  estados=[
    {id:1, nombre:'Sin empezar'},
    {id:2, nombre:'En progreso'},
    {id:3, nombre:'Terminada'}
  ];
  //* RELLENA EL FORMULARIO CON LOS DATOS OBTENIDOS EN DATA
  private completarForm(){
    this.form.controls['prioridad'].setValue(this.data.prioridad);
    this.form.controls['descripcion'].setValue(this.data.descripcion);
    this.form.controls['estado'].setValue(this.data.estado);
  }
  //! --------------------------------------------------- PATH TAREA ---------------------------------------------------
  public modificarTarea(){
    try{
      const prioridad= this.form.value.prioridad;
      const descripcion= this.form.value.descripcion;
      const estado= this.form.value.estado;
      if(prioridad && descripcion && estado ){
        this.tareaService.patchTarea(this.id_tarea, prioridad, descripcion, estado).subscribe({
          next:(response)=>{
            if(response){
              this.dialogRef.close();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea modificada.' });
            }
          },  
          error:(err)=>{
            console.error("Erro del servidor", err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error el modificar tarea.' });
          }
        })
      }
    }catch(err){
      console.error("Error interno del servidor", err)
    }
  };
}
