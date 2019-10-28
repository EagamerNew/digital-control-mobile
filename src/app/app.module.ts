import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from '@src/app/app-routing.module';
import {AppComponent} from '@src/app/app.component';
import {HomeComponent} from '@src/app/home/home.component';
import {NativeScriptFormsModule} from 'nativescript-angular';
import { RegisterFinishComponent } from '@src/app/components/register-finish/register-finish.component';
import { AllStudentsComponent } from '@src/app/components/all-students/all-students.component';
import { StudentProfileComponent } from '@src/app/components/student-profile/student-profile.component';
import { StudentLessonComponent } from '@src/app/components/student-lesson/student-lesson.component';
import { RegistrationComponent } from '@src/app/components/registration/registration.component';
import { SetNewPasswordComponent } from '@src/app/components/set-new-password/set-new-password.component';
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterFinishComponent,
        AllStudentsComponent,
        StudentProfileComponent,
        StudentLessonComponent,
        RegistrationComponent,
        SetNewPasswordComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
