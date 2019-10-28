import {Routes} from '@angular/router';

import {HomeComponent} from '@src/app/home/home.component';
import {ProfileTeacherLessenComponent} from '@src/app/components/profile-teacher-lessen/profile-teacher-lessen.component';
import {GenerateQrComponent} from '@src/app/components/generate-qr/generate-qr.component';
import {RegisterFinishComponent} from '@src/app/components/register-finish/register-finish.component';
import {AllStudentsComponent} from '@src/app/components/all-students/all-students.component';
import {StudentProfileComponent} from '@src/app/components/student-profile/student-profile.component';
import {StudentLessonComponent} from '@src/app/components/student-lesson/student-lesson.component';
import {RegistrationComponent} from '@src/app/components/registration/registration.component';
import {SetNewPasswordComponent} from '@src/app/components/set-new-password/set-new-password.component';
import {AuthGuard} from '@src/app/core/guards/auth.guard';
import {NoneAuthGuard} from '@src/app/core/guards/noneAuth.guard';
import {RegisterFinishStudentComponent} from '@src/app/components/register-finish-student/register-finish-student.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [NoneAuthGuard]
    },
    {
        path: 'teacherLesson',
        component: ProfileTeacherLessenComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'studentLesson',
        component: StudentLessonComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'qr',
        component: GenerateQrComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'endregistration/:size',
        component: RegisterFinishComponent,
        canActivate: [AuthGuard]

        ,
    },
    {
        path: 'registeredStudent',
        component: RegisterFinishStudentComponent,
        canActivate: [AuthGuard]

        ,
    },
    {
        path: 'all-students',
        component: AllStudentsComponent,
        canActivate: [AuthGuard]

        ,
    },
    {
        path: 'profile/:id',
        component: StudentProfileComponent,
        canActivate: [AuthGuard]

        ,
    },
    {
        path: 'registration',
        component: RegistrationComponent
        ,
    },
    {
        path: 'setPassword',
        component: SetNewPasswordComponent
        ,
    },
];
