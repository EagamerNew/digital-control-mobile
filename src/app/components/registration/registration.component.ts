import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {Page} from 'tns-core-modules/ui/page';
import {Registration} from '@src/app/core/model/registration';
import {AuthService} from '@src/app/core/services/auth.service';
import {LocalStorageService} from '@src/app/core/services/local-storage.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.tns.html',
    styleUrls: ['./registration.component.tns.css']
})
export class RegistrationComponent implements OnInit {

    registration: Registration = new Registration();

    constructor(private router: RouterExtensions,
                private page: Page,
                private authService: AuthService,
                private _local: LocalStorageService
    ) {
        page.actionBarHidden = true;
    }

    ngOnInit() {
        this.registration.phone = '';
        this.registration.email = '';
    }

    Login() {
        this.authService.registration(this.registration)
            .subscribe(res => {
                if (res.id) {
                    require( "nativescript-localstorage" );
                    localStorage.setItem('registration', JSON.stringify(res));
                    this.router.navigate(['/setPassword'], {transition: {name: 'slide'}});
                }
            });
    }

    navigate(s: string) {
        this.router.navigate([s], {transition: {name: 'slide'}});

    }
}
