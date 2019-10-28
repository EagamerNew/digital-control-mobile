import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RouterExtensions} from 'nativescript-angular';
import {User} from '@src/app/core/model/user';


@Injectable({
    providedIn: 'root'
})
export class NoneAuthGuard implements CanActivate {

    constructor(
        private router: RouterExtensions,
    ) {
    }

    user: User;

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        require('nativescript-localstorage');
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user) {
            if (this.user.type !== 'student') {
                this.router.navigate(['/teacherLesson'], {transition: {name: 'slide'}});
            } else {
                this.router.navigate(['/studentLesson'], {transition: {name: 'slide'}});
            }
        }

        return true;
    }
}
