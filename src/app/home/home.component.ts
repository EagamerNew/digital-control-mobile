import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {isIOS, Page} from 'tns-core-modules/ui/page';
import {Login} from '@src/app/core/model/login';
import {AuthService} from '@src/app/core/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.tns.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    login: Login = new Login();
    secure = true;
    ios:boolean;
    constructor(private router: RouterExtensions,
                page: Page,
                private authService: AuthService) {
        page.actionBarHidden = true;
        this.ios = isIOS;
    }

    ngOnInit() {

        require('nativescript-localstorage');
        localStorage.removeItem('user');
    }

    Login($event) {
        this.authService.login(this.login)
            .subscribe(res => {
                if (res.id) {
                    console.log(res);
                    require('nativescript-localstorage');
                    localStorage.setItem('user', JSON.stringify(res));
                    if (res.type !== 'student') {
                        this.router.navigate(['/teacherLesson'], {transition: {name: 'slide'}});
                    } else {
                        this.router.navigate(['/studentLesson'], {transition: {name: 'slide'}});
                    }
                } else {
                    alert({
                        title: 'Ошибка',
                        message: 'E-mail или пароль неправильный!',
                        okButtonText: 'OK'
                    });
                }
            });

    }

    navigate(s: string) {
        this.router.navigate([s], {transition: {name: 'slide'}});

    }

    secured() {
        this.secure = !this.secure;
    }
}
