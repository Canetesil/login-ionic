import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
    canActivate():Promise<boolean>{
      return new Promise(resolve =>{
        this.authService.getAuth().onAuthStateChanged(usuario=>{
          if(usuario){
            this.router.navigate(['home']);
          }
          resolve(usuario ? true : false);
        });
      });
  }
  
}
