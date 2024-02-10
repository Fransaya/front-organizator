import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import moment from 'moment';





//? SERVICIO DE NOTAS
import { NotasService} from '../../Core/Services/notas/notas.service';
import { Notas } from '../../Core/models/notas.model';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css',
  
  
})
export class NotasComponent implements OnInit {

  notas: Notas[] | any=[];


  public notaForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder, private notasService: NotasService){ }

  ngOnInit(): void {
    this.initFomr();
    this.getNotas();
  }

  public initFomr():void{
    this.notaForm=this.formBuilder.group({
      titulo:['',[Validators.required]],
      descripcion:['',[Validators.required]]
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
        let titulo: string= this.notaForm.get("titulo")!.value;
        let descripcion: string =this.notaForm.get("descripcion")!.value;

        if(titulo!="" && descripcion!==""){
          this.notasService.crearNota( titulo, descripcion).subscribe({
            next:(response)=>{
              console.log("respuesta a crear notas", response);
              Swal.fire("Nota","Creada Correctamente","success")
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

  public modificarNota(id:number){
    try{
      if(id){
        
      }else{
        console.log("id no disponible")
      }
    }catch(err){
      console.error("No se pudo eliminar la nota", err)
    }
  };

  public eliminarNota(id:number){

  }

}
