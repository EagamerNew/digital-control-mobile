import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';

import {AppRoutingModule} from '@src/app/app-routing.module';
import {AppComponent} from '@src/app/app.component';
import {HomeComponent} from '@src/app/home/home.component';
import {ProfileTeacherLessenComponent} from '@src/app/components/profile-teacher-lessen/profile-teacher-lessen.component';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';
import {GenerateQrComponent} from '@src/app/components/generate-qr/generate-qr.component';
import {RegisterFinishComponent} from '@src/app/components/register-finish/register-finish.component';
import {AllStudentsComponent} from '@src/app/components/all-students/all-students.component';
import {StudentProfileComponent} from '@src/app/components/student-profile/student-profile.component';
import {StudentLessonComponent} from '@src/app/components/student-lesson/student-lesson.component';
import {BarcodeScanner} from 'nativescript-barcodescanner';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {NativeScriptFormsModule} from 'nativescript-angular';
import {NativeScriptUIListViewModule} from 'nativescript-ui-listview/angular';
import {RegistrationComponent} from '@src/app/components/registration/registration.component';
import {SetNewPasswordComponent} from '@src/app/components/set-new-password/set-new-password.component';
import {AuthService} from '@src/app/core/services/auth.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {LocalStorageService} from '@src/app/core/services/local-storage.service';
import {RegisterFinishStudentComponent} from '@src/app/components/register-finish-student/register-finish-student.component';
import {NgShadowModule} from 'nativescript-ngx-shadow';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileTeacherLessenComponent,
        GenerateQrComponent,
        RegisterFinishComponent,
        AllStudentsComponent,
        StudentProfileComponent,
        StudentLessonComponent,
        RegistrationComponent,
        SetNewPasswordComponent,
        RegisterFinishStudentComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        HttpClientModule,
        NgShadowModule,



    ],
    providers: [
        BarcodeScanner,
        AuthService,
        HttpClient,
        LocalStorageService
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
