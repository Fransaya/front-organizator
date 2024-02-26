import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import moment from 'moment';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';


//? SERVICIO DE GASTO
import { GastosService } from '../../Core/Services/gastos/gastos.service';
//? MODELO DE GASTO
import { Gastos } from '../../Core/models/gastos.model';

//? MODAL CREA GASTO
import { ModalCreateGastoComponent } from './modal-create-gasto/modal-create-gasto/modal-create-gasto.component';
//? MODAL MODIFICAR GASTO
import { ModalModificarGastoComponent } from './modal-modificar-gasto/modal-modificar-gasto/modal-modificar-gasto.component';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css',
  providers: [MessageService]
})
export class GastosComponent implements  OnInit {


  constructor(private gastosServices: GastosService, private messageService: MessageService, private formBuilder:FormBuilder,public dialog:MatDialog){}

  ngOnInit(): void {
    this.getGastos();
    this.initForm();
    
  };
  //? ------------------------------------------------- FUNCIONALIDADE -------------------------------------------------

   //* ARRAY PARA GASTOS
  public gastos: Gastos[] | any= [];

  private idGasto:number=0;

  private latestDateFormExpense={};

  mostrarGasto=false;

  mostrarModificar=false;
  //* FORMULARIO DE GASTO
  public gastoForm: FormGroup= this.formBuilder.group({});

  //* INICIALIZACION DE FORMULARIO
  public initForm(){
    //* CREAR GASTO FORM
    this.gastoForm=this.formBuilder.group({
      categoria:['',Validators.required],
      descripcion:['',Validators.required],
      monto:[null,Validators.required],
      fecha_gasto:['',Validators.required]
    });
  };

  //* FORMATEO DE FECHA (DD-MM-YYYY)
  public formateDate(date:string):string{
    const fechaFormateada = moment(date).format('DD-MM-YYYY');
    return fechaFormateada;
  };

  public changeState(parameter:number,id:number,datos:any){
    if(parameter===1){
      this.mostrarGasto=true;
    }else if(parameter===2){
      this.mostrarModificar=true;
      this.idGasto=id;
      this.latestDateFormExpense=datos;
      this.completarForm(datos);
      
    }
    
  };

  public cerrarModal(paramer:number){
    if(paramer===1){
      this.mostrarGasto=false;
    }else{
      this.mostrarModificar=false;
    }
  };

   //* RELLENA EL FORMULARIO CON LOS DATOS OBTENIDOS EN DATA
  private completarForm(data:any){
    this.gastoForm.controls['categoria'].setValue(data.categoria);
    this.gastoForm.controls['descripcion'].setValue(data.descripcion);
    this.gastoForm.controls['monto'].setValue(data.monto);
    this.gastoForm.controls['fecha_gasto'].setValue(data.fecha_gasto);
  };

  
  

  //! ------------------------------------------------- METODOS GASTOS -------------------------------------------------
  //? ------------------------------------------------- GET GASTOS -------------------------------------------------
  public getGastos(){
    try{
        this.gastosServices.getGastos().subscribe({
          next:(res:any)=>{
            this.gastos=res.data;
            console.log("gastos", this.gastos)
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener gastos.' });
          }
        })
    }catch(err){
      console.error("Error interno del servidor", err);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error interno del servidor.' });
    }
  };
  //? ------------------------------------------------- POST GASTO -------------------------------------------------
  public postGasto(){
    try{
      const dialog=this.dialog.open(ModalCreateGastoComponent);
      //? cuando se cierra el modal se actualizar las notas disponibles
      dialog.afterClosed().subscribe(result=>{
        console.log("resultado devuelto",result);
        if(result.success){
          let categoria=result.data.categoria;
          console.log("categoria obtenida",categoria)
          let descripcion=result.data.descripcion;
          let monto=result.data.monto;
          let fecha_gasto=result.data.fecha_gasto;
          this.gastosServices.postGasto(categoria,descripcion,monto,fecha_gasto).subscribe({
                next:(res)=>{
                  this.messageService.add({ severity: 'success', summary: 'Gasto', detail: 'Creado correctamente.' });
                  this.getGastos();
                },
                error:(err)=>{
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se creo el gasto.' });
                  console.error("Error al crear gasto", err);
                }
            })
        }else{
          this.messageService.add({severity:'warn', summary:'Incompleto', detail:"No se creo"});
        }
      });
    }catch(err){
      console.error("Error interno del servidor", err);
    };
  };
  //? ------------------------------------------------- PATCH GASTO -------------------------------------------------
  public modificarGasto(id:number,categoria:string,descripcion:string,monto:number,fecha_gasto:Date){ 
    try{
      const datos={
        categoria,
        descripcion,
        monto,
        fecha_gasto
      }
      const dialog=this.dialog.open(ModalModificarGastoComponent,{
        data:datos
      });

      dialog.afterClosed().subscribe(result =>{
        if(result.success){
          let gastoId=id;
          let categoria=result.data.categoria;
          let descripcion=result.data.descripcion;
          let monto=result.data.monto;
          let fecha_gasto=result.data.fecha_gasto;
          this.gastosServices.patchGasto(gastoId,categoria,descripcion,monto,fecha_gasto).subscribe({
            next:(res)=>{
              this.messageService.add({ severity: 'success', summary: 'Gasto', detail: 'Actualizado correctamente.' });
              this.getGastos();
            },
            error:(err)=>{
                console.error("No se modificaron los gastos", err);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se modificaron los gastos.' });;
            }
          })
        }else{
          this.messageService.add({severity:'warn', summary:'Incompleto', detail:"No se modifico"});
        }
      });
    }catch(err){
      console.error("Error interno del servidor", err);
    };
  };
  //? ------------------------------------------------- DELETE GASTO -------------------------------------------------
  public deleteGasto(gastoId:number){
    console.log("id recibido", gastoId)
    try{
      this.gastosServices.deleteGasto(gastoId).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'success', summary: 'Gasto', detail: 'Eliminado correctamente.' });
          this.getGastos();
        },
        error:(error)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar.' });
          console.error("error al eliminar", error);
        }
      })
    }catch(err){
      console.error("Error interno del servidor", err)
    }
  }


}


