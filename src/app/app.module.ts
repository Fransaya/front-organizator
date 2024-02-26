import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../Core/Services/GetToken/auth.interceptor';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { NotasComponent } from './notas/notas.component';
import { GastosComponent } from './gastos/gastos.component';
import { TareasComponent } from './tareas/tareas.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { ModificarNotaModalComponent } from './notas/modal-modificar-nota/modificar-nota-modal/modificar-nota-modal.component';
import { ModificarTareaModalComponent } from './tareas/modal-modificar-tarea/modificar-tarea-modal/modificar-tarea-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';
import { ModalCreateGastoComponent } from './gastos/modal-create-gasto/modal-create-gasto/modal-create-gasto.component';
import { ModalModificarGastoComponent } from './gastos/modal-modificar-gasto/modal-modificar-gasto/modal-modificar-gasto.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    CalendarioComponent,
    NotasComponent,
    GastosComponent,
    TareasComponent,
    ModificarNotaModalComponent,
    ModificarTareaModalComponent,
    ModalCreateGastoComponent,
    ModalModificarGastoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataViewModule,
    CardModule,
    ButtonModule,
    MatDialogModule,
    ToastModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
