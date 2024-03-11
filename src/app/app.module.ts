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
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { NotasComponent } from './notas/notas.component';
import { GastosComponent } from './gastos/gastos.component';
import { TareasComponent } from './tareas/tareas.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ModificarNotaModalComponent } from './notas/modal-modificar-nota/modificar-nota-modal/modificar-nota-modal.component';
import { ModificarTareaModalComponent } from './tareas/modal-modificar-tarea/modificar-tarea-modal/modificar-tarea-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';
import { ModalCreateGastoComponent } from './gastos/modal-create-gasto/modal-create-gasto/modal-create-gasto.component';
import { ModalModificarGastoComponent } from './gastos/modal-modificar-gasto/modal-modificar-gasto/modal-modificar-gasto.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrderListModule } from 'primeng/orderlist';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';




@NgModule({
  declarations: [
    AppComponent,
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
    ToastModule,
    TableModule,
    PaginatorModule,
    MatFormFieldModule,
    OrderListModule,
    PanelModule,
    CalendarModule
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
