import { Component, OnInit } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import moment from 'moment';
import { MatDialog,  } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';


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

  visible: boolean = false;

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
  //* FORMATEO DE MONTO DINERO
  public formatDinner(monto:number):any{
    let amoutn;
    if(monto){
      amoutn=formatCurrency(monto,'en-US', getCurrencySymbol('ARS $','wide'));
      return amoutn
    }
  }
  

  //* FILTRO DE DATOS
  public filterDate(event:any,idEvent:number){
    switch (idEvent){
      case 1:{ //todo filtro por categoria tabla
        let categoriaInput=event.target.value;
        if(categoriaInput){
        this.filterCategoria(categoriaInput)
        }else if(categoriaInput===""){
          this.getGastos();
        }
        break;
      }
      case 2:{ //todo filtro por precio (mayor-menor)
        let valueInput= event.target.previousElementSibling.value //todo obtengo fechas del envento previo
        let valorSelect= event.target.value;
        if(valueInput && valorSelect){
          this.filterPrice(valueInput,valorSelect); 
        }else if(valueInput==""){
          this.getGastos()
        }
        break;
      }
      case 3:{ //todo filtro por fecha
        let dateValue=event.target.value;
        if(dateValue){
          this.filterDateTable(dateValue);
        }else if(dateValue==""){
          this.getGastos()
        }
        break;
      }
      default:{
        let inputCategoria = document.querySelector('#filter-categoria') as HTMLInputElement;
        let inputImporte = document.getElementById('filter-precio') as HTMLInputElement;
        let inputDate = document.getElementById('filter-date') as HTMLInputElement;
        if(inputCategoria){
          inputCategoria.value=""
        }
        if(inputImporte){
          inputImporte.value=""
        }
        if(inputDate){
          inputDate.value=""
        }
        this.getGastos();
      }
    }
  };
  //* METODO FILTER POR CATEGORIA
  public filterCategoria(catInput:string){
    this.gastos=this.gastos.filter((val:any)=>{
      if(val.categoria.toLowerCase().includes(catInput)){
        return val.categoria
      }
    })
    
  }
  //* METODO FILTER X PRECIO
  private filterPrice(valNum:number, typeFilter:string):void{
    if(typeFilter=="mayor"){
      this.gastos=this.gastos.filter((val:any)=>{
        if(val.monto>=valNum){
          return val.monto;
        }
      })
    }else{
      this.gastos=this.gastos.filter((val:any)=>{
        if(val.monto<=valNum){
          return val.monto
        }
      })
    }
  };
  //* METODO FILTER X FECHA
  public filterDateTable(dateSelect:Date){
    this.gastos=this.gastos.filter((val:any)=>{
      if(val.fecha_gasto==dateSelect){
        return val.fecha_gasto
      }
    })
  };

  //* METODO OBTENER TOTAL GASTOS
  public getTotalGastos():any{
    let valInputGasto=document.querySelector('#val-gastos') as HTMLInputElement;
    let totalGastos:number=0;
    console.log("se esta llamadno")
    if(this.gastos.length>0){
      this.gastos.forEach((val:any) => {
        totalGastos+= Number(val.monto);
      });
      totalGastos= this.formatDinner(totalGastos);
      valInputGasto.value= totalGastos.toString();
    }else{
      valInputGasto.value="";
    }
  }


  

  //! ------------------------------------------------- METODOS GASTOS -------------------------------------------------
  //? ------------------------------------------------- GET GASTOS -------------------------------------------------
  public getGastos(){
    try{
        this.gastosServices.getGastos().subscribe({
          next:(res:any)=>{
            this.gastos=res.data;
            this.getTotalGastos();
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
        if(result.success){
          let categoria=result.data.categoria;
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
      //todo defino json para anviar datos
      const datos={
        categoria,
        descripcion,
        monto,
        fecha_gasto
      } 
      //todo abri el modal y envio datos
      const dialog=this.dialog.open(ModalModificarGastoComponent,{
        data:datos
      });
      //todo una vez cerrado
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
  //? ------------------------------------------------- DELETE ALL GASTOS ----------------------------------------------
  public showDeleteAll(){
    if(!this.visible){
      this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: 'Desea eliminar todos los gastos' });
      this.visible=true
    }
  }

  deleteAllGastos() {
    this.messageService.clear('confirm');
    console.log("entro aca")
    try{
      this.gastosServices.deleteAll().subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'success', summary: 'Gasto', detail: 'Se eliminaron todos los gastos.' });
          this.getGastos();

        },
        error:(err)=>{
          console.error("No se elliminar los gasots")
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No eliminaron todos los gastos.' });
        }
      })
    }catch(err){
      console.error("Error interno del servidor")
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar todos los gastos.' });
    }
    this.visible = false;
  }

candelDellGastos() {
    this.messageService.clear('confirm');
    this.visible = false;
  }


}


