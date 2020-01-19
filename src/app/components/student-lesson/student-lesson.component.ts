import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import {BarcodeScanner} from 'nativescript-barcodescanner';
import variables from './variables';
import {isIOS, Page} from 'tns-core-modules/ui/page';
import {User} from '@src/app/core/model/user';
import {QrStudent} from '@src/app/core/model/qr-student';
import {AuthService} from '@src/app/core/services/auth.service';
import {StudentLesson} from '@src/app/core/model/student-lesson';

@Component({
    selector: 'app-student-lesson',
    templateUrl: './student-lesson.component.tns.html',
    styleUrls: ['./student-lesson.component.tns.css']
})
export class StudentLessonComponent implements AfterViewInit, OnInit {
    user: User = new User();
    QR: QrStudent = new QrStudent();
    progressColor: any;
    progressValue = 85;
    ios: boolean;
    request: StudentLesson = new StudentLesson();
    lessons: any[] = [];

    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private barcodeScanner: BarcodeScanner,
                private router: RouterExtensions,
                private service: AuthService,
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
        this.QR.studentId = this.user.id;
        require('nativescript-localstorage');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.request.day = new Date().getDay().toString();
        if (new Date().getHours() == 9) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '1';
            } else {
                this.request.hour = '2';
            }
        } else if (new Date().getHours() == 10) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '2';
            } else {
                this.request.hour = '3';
            }
        } else if (new Date().getHours() == 11) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '3';
            } else {
                this.request.hour = '4';
            }
        } else if (new Date().getHours() == 12) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '4';
            } else {
                this.request.hour = '5';
            }
        } else if (new Date().getHours() == 13) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '5';
            } else {
                this.request.hour = '6';
            }
        } else if (new Date().getHours() == 14) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '6';
            } else {
                this.request.hour = '7';
            }
        } else if (new Date().getHours() == 15) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '7';
            } else {
                this.request.hour = '8';
            }
        } else if (new Date().getHours() == 16) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '8';
            } else {
                this.request.hour = '9';
            }
        } else if (new Date().getHours() == 17) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '9';
            } else {
                this.request.hour = '10';
            }
        } else if (new Date().getHours() == 18) {
            if (new Date().getMinutes() < 20) {
                this.request.hour = '10';
            } else {
                this.request.hour = '1';
                this.request.day = (parseInt(this.request.day) + 1).toString();
            }
        } else if (new Date().getHours() > 19 && new Date().getHours() <= 23) {
            this.request.hour = '1';
            this.request.day = (parseInt(this.request.day) + 1).toString();
        } else if (new Date().getHours() < 9) {
            this.request.hour = '1';
        }
        if (parseInt(this.request.day) > 5) {
            this.request.day = '1';
        }
        this.request.studentId = this.user.id;

        console.log(this.request);
        this.service.getLessonsTeacher(this.request)
            .subscribe(res => {
                this.lessons = res;
            });
    }

    @ViewChild(RadSideDrawerComponent, {static: false}) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

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

    Registration(lesson) {
        this.barcodeScanner.scan(variables.scanOptions).then((result) => {
            this.QR.qrText = result.text;
            this.service.checkQR(this.QR)
                .subscribe(res => {
                    if (res) {
                        require('nativescript-localstorage');
                        localStorage.setItem('lessonTittle', lesson.name);

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

    getRowsLesson() {
        let list = [];
        for (let i = 0; i < this.lessons.length; i++) {
            list.push('*,');
        }
        return list;
    }
}
