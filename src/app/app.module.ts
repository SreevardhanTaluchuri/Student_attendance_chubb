import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { StudentsComponent } from './pages/students/students.component';
import { AppRoutingModule } from './routes.module';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { StudentComponent } from './pages/student/student.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeteleDialogComponent } from './components/detele-dialog/detele-dialog.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    TableComponent,
    StudentsComponent,
    AttendanceComponent,
    StudentComponent,
    DialogComponent,
    DeteleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"art-users","appId":"1:109851637278:web:da45604245a8297880e00f","databaseURL":"https://art-users-default-rtdb.firebaseio.com","storageBucket":"art-users.appspot.com","apiKey":"AIzaSyD2O6RqVNy4ochpMQJFbQBxVk0QzdArnO8","authDomain":"art-users.firebaseapp.com","messagingSenderId":"109851637278","measurementId":"G-X7JDKJ1VHV"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
