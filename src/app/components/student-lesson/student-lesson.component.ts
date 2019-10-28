import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import {BarcodeScanner} from 'nativescript-barcodescanner';
import variables from './variables';
import {Page} from 'tns-core-modules/ui/page';
import {User} from '@src/app/core/model/user';
import {QrStudent} from '@src/app/core/model/qr-student';
import {AuthService} from '@src/app/core/services/auth.service';

@Component({
    selector: 'app-student-lesson',
    templateUrl: './student-lesson.component.tns.html',
    styleUrls: ['./student-lesson.component.tns.css']
})
export class StudentLessonComponent implements AfterViewInit, OnInit {
    user: User = new User();
    QR: QrStudent = new QrStudent();

    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private barcodeScanner: BarcodeScanner,
                private router: RouterExtensions,
                private service: AuthService,
                page: Page) {
        page.actionBarHidden = true;
    }

    ngOnInit() {
        require('nativescript-localstorage');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.QR.studentId = this.user.id;
    }

    @ViewChild(RadSideDrawerComponent, {static: false}) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    progressValue = 85;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    navigate(link: string) {
        this.router.navigate([link], {transition: {name: 'slide'}});
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    logout() {
        require('nativescript-localstorage');
        localStorage.removeItem('user');
        this.router.navigate(['/home'], {transition: {name: 'slide'}});

    }

    Registration() {
        console.log(this.QR);
        this.barcodeScanner.scan(variables.scanOptions).then((result) => {
            this.QR.qrText = result.text;
            alert(this.QR.qrText);
            this.service.checkQR(this.QR)
                .subscribe(res => {
                    if (res) {
                        this.router.navigate(['/registeredStudent'], {transition: {name: 'slide'}});
                    } else {
                        alert({
                            title: 'Ошибка',
                            message: 'QR код не действителен!',
                            okButtonText: 'OK'
                        });
                    }

                });
        }, (message) => {
            this.barcodeScanner.stop();
        });
    };
}
