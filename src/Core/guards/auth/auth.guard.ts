import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router,UrlTree } from '@angular/router';
import { AuthService } from "../../Services/auth/auth.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.authService.isLogguedIn()) {
            return true; // El usuario está autenticado, permite el acceso a la ruta
        } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión
        return this.router.createUrlTree(['/login']);
        }
    }
};
