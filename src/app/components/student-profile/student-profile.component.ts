import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import {isIOS, Page} from 'tns-core-modules/ui/page';
import {User} from '@src/app/core/model/user';

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.tns.html',
    styleUrls: ['./student-profile.component.tns.css']
})
export class StudentProfileComponent implements AfterViewInit, OnInit {
    user: User = new User();
    ios: boolean;

    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private router: RouterExtensions,
                page: Page) {
        this.ios = isIOS;
        page.actionBarHidden = true;
        if (this.progressValue <= 12) {
            this.progressColor = 'rgb(255,62,49)';
        } else if (this.progressValue >= 12 && this.progressValue <= 72) {
            this.progressColor = 'rgb(255,202,30)';
        } else {
            this.progressColor = 'rgb(62,194,95)';
        }
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
    navigate(link: string) {
        this.router.navigate([link], {transition: {name: 'slide'}});
    }
    @ViewChild(RadSideDrawerComponent, {static: false}) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    progressValue: any = 10;
    progressColor: any;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    public openDrawer() {
        console.log('asd');
        this.drawer.showDrawer();
    }

}
