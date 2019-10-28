import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RouterExtensions} from 'nativescript-angular';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: RouterExtensions,
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        require('nativescript-localstorage');
        if (JSON.parse(localStorage.getItem('user'))) {
           return true;
        }
        this.router.navigate([`/home`], {transition: {name: 'slide'}});

        return false;
    }
}
