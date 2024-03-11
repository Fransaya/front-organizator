import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tus componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../Core/guards/auth/auth.guard';
import { CalendarioComponent } from './calendario/calendario.component';
import { NotasComponent } from './notas/notas.component';
import { TareasComponent } from './tareas/tareas.component';
import { GastosComponent } from './gastos/gastos.component';

// Define las rutas de tu aplicación
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'register', component: RegisterComponent},
  {path:'calendario', component:CalendarioComponent},
  {path:'notas', component:NotasComponent},
  {path:'tareas', component: TareasComponent},
  {path:'gastos', component:GastosComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// canActivate:[AuthGuard]