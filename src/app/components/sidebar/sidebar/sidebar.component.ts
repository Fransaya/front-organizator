import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router){};

  isExpanded = false;
  
  //* funcion para navegar y redirign a la ruta
  public routerTo(route:string):void{
    this.router.navigateByUrl(route)
  };

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }
}
