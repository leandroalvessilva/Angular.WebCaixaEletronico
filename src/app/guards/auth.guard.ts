import { LoginService } from './../login/service/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.verificarAcesso();
  }

  private verificarAcesso() {
    let validarLogin;
    this.loginService.data.subscribe(data => {
      validarLogin = data;
    });
    if (validarLogin) {
      return true;
    }
    this.router.navigate(['/login']);

    return false;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.verificarAcesso();
  }
}
