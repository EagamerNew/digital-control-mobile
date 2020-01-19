import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import * as imgSource from 'tns-core-modules/image-source';
import * as shajs from 'sha.js';
import {Page} from 'tns-core-modules/ui/page';
import {User} from '@src/app/core/model/user';
import {AuthService} from '@src/app/core/services/auth.service';
import {QrGenerate} from '@src/app/core/model/qr-generate';

@Component({
    selector: 'app-generate-qr',
    templateUrl: './generate-qr.component.tns.html',
    styleUrls: ['./generate-qr.component.tns.css']
})
export class GenerateQrComponent implements AfterViewInit, OnInit, OnDestroy {

    qrCode: any;
    time = 0;
    finish = false;
    user: User = new User();
    lesson: any;
    newQR: QrGenerate = new QrGenerate();
    students: any[] = [];
    list: any[];
    timing: any;
    timeOutIDs: any[] = [];
    lessonTittle: any;

    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private router: RouterExtensions,
                private service: AuthService,
                page: Page) {
        page.actionBarHidden = true;
    }

    ngOnInit() {
        this.finish = false;
        require('nativescript-localstorage');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.newQR.lessonId = localStorage.getItem('lesson');
        this.lessonTittle = localStorage.getItem('lessonTittle');
        this.generateQRCodeText();
        this.getStudents();
    }

    getStudents() {
        if (localStorage.getItem('lesson')) {
            this.service.getStudentsByLessonActive(localStorage.getItem('lesson'))
                .subscribe(res => {
                    this.students = res;
                    console.log(res);
                });
        }
    }

    getRows() {
        this.list = [];
        for (let i = 0; i < this.students.length; i++) {
            this.list.push('*,');
        }
        return this.list;
    }

    ngOnDestroy(): void {
        this.finish = true;
    }

    stop() {
        this.timeOutIDs.forEach(id => clearTimeout(id));
        this.generateQRCodeText();
    }

    generateQRCodeText() {
        this.time = 13;
        this.newQR.qrText = shajs('sha256').update(this.lesson + new Date().toLocaleString()).digest('hex');
        this.service.newQR(this.newQR)
            .subscribe(res => {
                this.qrCode = this.newQR.qrText;
                console.log(this.qrCode + '==');
                this.getStudents();
                this.timeOut();
            });
    }

    logout() {
        require('nativescript-localstorage');
        localStorage.removeItem('user');
        this.router.navigate(['/home'], {transition: {name: 'slide'}});

    }

    timeOut() {
        if (this.time != 0 && !this.finish) {
            this.timeOutIDs.push(setTimeout(() => {
                this.time -= 1;
                if (this.time == 0) {
                    this.generateQRCodeText();
                } else {
                    this.timeOut();
                }
            }, 1000));
        }
    }

    navigate(link) {
        this.router.navigate([link], {transition: {name: 'slide'}});
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

    end() {
        this.finish = true;
        if (!this.students) {
            this.students = [];
        }
        this.service.closeLesson(this.lesson)
            .subscribe(res => {
                this.router.navigate(['/endregistration/' + this.students.length], {transition: {name: 'slide'}});
            }, error => {
                this.router.navigate(['/endregistration/' + this.students.length], {transition: {name: 'slide'}});
            });
    }
}
