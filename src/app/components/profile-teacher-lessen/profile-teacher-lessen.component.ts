import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import {RouterExtensions} from 'nativescript-angular';
import {isIOS, Page} from 'tns-core-modules/ui/page/page';
import {TeacherLesson} from '@src/app/core/model/teacher-lesson';
import {User} from '@src/app/core/model/user';
import {AuthService} from '@src/app/core/services/auth.service';

@Component({
    selector: 'app-profile-teacher-lessen',
    templateUrl: './profile-teacher-lessen.component.tns.html',
    styleUrls: ['./profile-teacher-lessen.component.css'],
})
export class ProfileTeacherLessenComponent implements AfterViewInit, OnInit {
    request: TeacherLesson = new TeacherLesson();
    user: User = new User();
    reponse: any;
    students: any[] = [];
    list: any[];
    ios: boolean;
    lessonId: any;
    lessons: [] = [];

    constructor(private _changeDetectionRef: ChangeDetectorRef,
                private router: RouterExtensions,
                private service: AuthService,
                page: Page) {

        page.actionBarHidden = true;
        this.ios = isIOS;
    }

    ngOnInit() {
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
        this.request.teacherId = this.user.id;
        let date = new Date();
        if (date.getDate().toString().length == 1) {
            this.request.created = '0' + date.getDate() + '.';
        } else {
            this.request.created = date.getDate() + '.';
        }
        if (date.getMonth().toString().length == 1) {
            this.request.created += '0' + date.getMonth() + 1 + '.';
        } else {
            this.request.created += date.getMonth() + '.';
        }
        this.request.created += date.getFullYear().toString();
        console.log(this.request);
        this.service.getLessonsTeacher(this.request)
            .subscribe(res => {
                this.lessons = res.data;
            });
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

    Registration(lesson) {
        require('nativescript-localstorage');
        localStorage.setItem('lesson', lesson.id);
        localStorage.setItem('lessonTittle', lesson.name);
        this.router.navigate(['/qr'], {transition: {name: 'slide'}});
    }


    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    navigate(link: string) {
        this.router.navigate([link], {transition: {name: 'slide'}});
    }

    checkLessonTime(less) {
        let timeCode = this.getHourCode();
        if (parseInt(less.timeStartId) <= timeCode && parseInt(less.timeEndId) >= timeCode) {
            return true;
        } else {
            return false;
        }
    }

    getHourCode() {
        let hour = new Date().getHours();
        if (hour == 9) {
            return 1;
        } else if (hour == 10) {
            return 1;
        } else if (hour == 11) {
            return 3;
        } else if (hour == 12) {
            return 4;
        } else if (hour == 13) {
            return 5;
        } else if (hour == 14) {
            return 6;
        } else if (hour == 15) {
            return 7;
        } else if (hour == 16) {
            return 8;
        } else if (hour == 17) {
            return 9;
        } else if (hour == 18) {
            return 10;
        }
        return 11;

    }

    getTime(time) {
        if (time == 0) {
            return '00:00';
        } else if (time == 1) {
            return '09:00';
        } else if (time == 2) {
            return '10:00';
        } else if (time == 3) {
            return '11:00';
        } else if (time == 4) {
            return '12:00';
        } else if (time == 5) {
            return '13:00';
        } else if (time == 6) {
            return '14:00';
        } else if (time == 7) {
            return '15:00';
        } else if (time == 8) {
            return '16:00';
        } else if (time == 9) {
            return '17:00';
        } else if (time == 10) {
            return '18:00';
        }
        return '00:00';

    }


    getRowsLesson() {
        let list = '*';
        for (let i = 0; i < this.lessons.length - 1; i++) {
            list += ',*';
        }
        return list;
    }
}
