import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { StudentsComponent } from './pages/students/students.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { StudentComponent } from './pages/student/student.component';

const routes : Routes = [
    {
        path : 'students',
        component : StudentsComponent
    },
    {
        path : 'student',
        component : StudentComponent,
        children : [
            {
                path : 'attendance/:id',
                component : AttendanceComponent
            },
        ]
    },
    {
        path : '' , 
        redirectTo : 'students' , 
        pathMatch : 'full'
    },
    {
        path : '**', 
        redirectTo : 'students', 
        pathMatch : 'full'
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }