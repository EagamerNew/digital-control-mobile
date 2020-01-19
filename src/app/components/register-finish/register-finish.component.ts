import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import {Page} from 'tns-core-modules/ui/page';
import {User} from '@src/app/core/model/user';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-register-finish',
    templateUrl: './register-finish.component.tns.html',
    styleUrls: ['./register-finish.component.tns.css']
})
export class RegisterFinishComponent implements OnInit, AfterViewInit {
    user: User = new User();
    size = 0;
    tittle: any;

    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private router: RouterExtensions,
                page: Page,
                private route: ActivatedRoute) {
        this.route.params
            .forEach((params) => {
                this.size = +params['size'];
            });
        this.tittle = localStorage.getItem('lessonTittle');

        page.actionBarHidden = true;
    }

    ngOnInit() {
        require('nativescript-localstorage');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        require('nativescript-localstorage');
        localStorage.removeItem('user');
        this.router.navigate(['/home'], {transition: {name: 'slide'}});
    }

    @ViewChild(RadSideDrawerComponent, {static: false}) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    navigate(link) {

        this.router.navigate([link], {transition: {name: 'slide'}});
    }
}
