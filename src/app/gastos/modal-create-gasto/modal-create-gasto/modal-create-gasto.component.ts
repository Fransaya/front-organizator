import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-create-gasto',
  templateUrl: './modal-create-gasto.component.html',
  styleUrl: './modal-create-gasto.component.css',
  providers:[MessageService]
})
export class ModalCreateGastoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalCreateGastoComponent>,private formBuilder:FormBuilder, public dialog:MatDialog, private messageService: MessageService,){}

  ngOnInit(): void {
    this.initForm();
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
    this.dialogRef.close({success:false});
  }
  //* CERRAR MODAL AL CANCELAR (BTN)
  public cancelarGasto(){
    this.dialogRef.close({success:false});
  }

  //? ------------------------------ ENVIAR GATOS A COMPONENTE PRINCIPAL
  public enviarDatos(){
    if(this.gastoForm.valid){
      this.dialogRef.close({success:true,data:this.gastoForm.value});
    }else{
      this.dialogRef.close({success:false,data:"Falta completar campos."});
    }
  }
}
