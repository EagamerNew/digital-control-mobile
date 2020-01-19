import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import {Page} from 'tns-core-modules/ui/page';
import {User} from '@src/app/core/model/user';

@Component({
    selector: 'app-register-finish',
    templateUrl: './register-finish-student.component.tns.html',
    styleUrls: ['./register-finish-student.component.tns.css']
})
export class RegisterFinishStudentComponent implements OnInit, AfterViewInit {
    user: User = new User();
    tittle: any;

    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private router: RouterExtensions,
                page: Page) {
        page.actionBarHidden = true;
        this.tittle = localStorage.getItem('lesson');

    }

    ngOnInit() {
        require('nativescript-localstorage');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.tittle = localStorage.getItem('lessonTittle');

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

    navigate() {
        this.router.navigate(['/studentLesson'], {transition: {name: 'slide'}});
    }

    navigated(link) {
        this.router.navigate([link], {transition: {name: 'slide'}});
    }
}
