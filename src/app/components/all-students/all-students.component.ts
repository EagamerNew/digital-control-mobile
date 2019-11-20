import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import {isIOS, Page} from 'tns-core-modules/ui/page';
import {User} from '@src/app/core/model/user';

@Component({
    selector: 'app-all-students',
    templateUrl: './all-students.component.tns.html',
    styleUrls: ['./all-students.component.tns.css']
})
export class AllStudentsComponent implements AfterViewInit, OnInit {
    user: User = new User();
    ios: boolean;

    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private router: RouterExtensions,
                page: Page) {
        page.actionBarHidden = true;
        this.ios = isIOS;
    }

    ngOnInit() {
        require('nativescript-localstorage');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    @ViewChild(RadSideDrawerComponent, {static: false}) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    logout() {
        require('nativescript-localstorage');
        localStorage.removeItem('user');
        this.router.navigate(['/home'], {transition: {name: 'slide'}});

    }

    public openDrawer() {
        console.log('asd');
        this.drawer.showDrawer();
    }

    navigate(link: string) {
        this.router.navigate([link], {transition: {name: 'slide'}});


    }
}
