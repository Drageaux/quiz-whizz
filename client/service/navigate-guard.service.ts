import { Injectable }       from '@angular/core';
import {
    CanActivate, CanActivateChild, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';

@Injectable()
export class NavigateGuard implements CanActivate, CanActivateChild {
    constructor(private router:Router) {
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        return localStorage.getItem("playing") != "true";
    }

    canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        return this.canActivate(route, state);
    }

}