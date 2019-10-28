import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {Page} from 'tns-core-modules/ui/page';
import {LocalStorage} from 'nativescript-localstorage';
import {AuthService} from '@src/app/core/services/auth.service';
import {SetPassword} from '@src/app/core/model/set-password';

@Component({
    selector: 'app-set-new-password',
    templateUrl: './set-new-password.component.tns.html',
    styleUrls: ['./set-new-password.component.tns.css']
})
export class SetNewPasswordComponent implements OnInit {
    setPassword: SetPassword = new SetPassword();
    repeadPassword = '';

    constructor(private router: RouterExtensions,
                private authService: AuthService,
                page: Page) {
        page.actionBarHidden = true;
    }

    ngOnInit() {
        require('nativescript-localstorage');
        this.setPassword = JSON.parse(localStorage.getItem('registration'));
        this.setPassword.password = '';
        console.log(this.setPassword);
    }

    Login($event) {
        if (this.setPassword.password !== '' && this.setPassword.password === this.repeadPassword) {
            this.authService.registrationSetPassword(this.setPassword)
                .subscribe(res => {
                    this.router.navigate(['/home'], {transition: {name: 'slide'}});
                });
        } else {
            alert({
                title: 'Ошибка',
                message: 'Пароль не совпадает',
                okButtonText: 'OK'
            });
        }

    }

    navigate(s: string) {
        this.router.navigate([s], {transition: {name: 'slide'}});

    }
}
