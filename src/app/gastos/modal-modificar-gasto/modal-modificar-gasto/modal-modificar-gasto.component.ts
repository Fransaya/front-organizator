import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-modificar-gasto',
  templateUrl: './modal-modificar-gasto.component.html',
  styleUrl: './modal-modificar-gasto.component.css',
  providers:[MessageService],
  
})
export class ModalModificarGastoComponent {

  constructor(public dialogRef: MatDialogRef<ModalModificarGastoComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private formBuilder:FormBuilder, public dialog:MatDialog, private messageService: MessageService,){}

  previusDate:any;

  ngOnInit(): void {
    this.initForm();
    this.gastoForm.patchValue(this.data);
    this.previusDate=this.data;
  }

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

  //* CIERRO MODAL
  onNoClick(): void {
    this.dialogRef.close({success:false,data:""});
  }
  //* CERRAR MODAL AL CANCELAR (BTN)
  public cancelarGasto(){
    this.dialogRef.close({success:false,data:""});
  };
  //* VALIDACION DE CAMBIOS DE DATOS CUANDO MODIFICA
  private validationChangeOnPutGastos(previusDate:putFormDates| {}  ,postDate:putFormDates ){
    return JSON.stringify(previusDate)===JSON.stringify(postDate);
  }

  //? ------------------------------ ENVIAR GATOS A COMPONENTE PRINCIPAL
  public enviarDatos(){
    const datos={
      categoria:this.gastoForm.get('categoria')!.value,
      descripcion:this.gastoForm.get('descripcion')!.value,
      monto:this.gastoForm.get('monto')!.value,
      fecha_gasto:this.gastoForm.get('fecha_gasto')!.value
    };
    if(!this.validationChangeOnPutGastos(datos,this.previusDate)){
      this.dialogRef.close({success:true,data:datos});
    }else{
      this.dialogRef.close({success:false,data:"Falta completar campos."});
    }
  }
};
//* INTERFAZ PARA VALIDACION MODIFICACION DATOS
interface putFormDates{
  categoria:string,
  descripcion:string,
  monto:number,
  fecha_gasto:Date
}
