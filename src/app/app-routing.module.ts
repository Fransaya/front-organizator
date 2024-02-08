import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tus componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Define las rutas de tu aplicación
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
