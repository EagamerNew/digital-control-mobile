import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://digitalcontrol.kz/functions/mobile';

    constructor(
        private http: HttpClient,
    ) {
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
        });
        return headers;
    }

    registration(from): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/check-user-mob', from);
    }

    registrationSetPassword(from): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/register-mob', from);
    }

    login(from): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/login-mob', from);
    }


    newQR(from): Observable<any> {
        return this.http.post<any>('http://digitalcontrol.kz/functions/mobile/lesson/lesson-qr-update-post', from);
    }

    checkQR(from): Observable<any> {
        return this.http.post<any>('http://digitalcontrol.kz/functions/mobile/lesson/lesson-qr-student-update-post', from);
    }

    getStudentsByLesson(id): Observable<any> {
        return this.http.get<any>(
            'http://digitalcontrol.kz/functions/mobile/lesson/lesson-teacher-students-get?lessonId=' + id);
    }

    getStudentsByLessonActive(id): Observable<any> {
        return this.http.get<any>(
            'http://digitalcontrol.kz/functions/mobile/lesson/lesson-teacher-v2-students-get?lessonId=' + id);
    }

    lessonTeacherGetMearest(from): Observable<any> {
        return this.http.post<any>('http://digitalcontrol.kz/functions/mobile/lesson/lesson-teacher-get-nearest-mob', from);
    }

    closeLesson(id): Observable<any> {
        return this.http.get<any>(
            'http://91.201.214.132:8080/lesson/close/lesson/' + id);
    }

    getLessonsTeacher(from): Observable<any> {
        return this.http.post<any>('http://91.201.214.132:8080/lesson/read/teacher/lesson/list/byparameters', from);
    }

    getLessonsStudent(from): Observable<any> {
        return this.http.post<any>('http://91.201.214.132:8080/lesson/read/student/lesson/list/byparameters', from);
    }
}
