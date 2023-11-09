import { Component, OnInit } from '@angular/core';
import { AttendanceService } from './services/attendance.service';
import { IAttendance } from './interfaces/attendance';
import { StudentsService } from './services/student.service';
import { IStudent } from './interfaces/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'student-attendance';
  attendance! : IAttendance[];
  students! : IStudent[];
  isLoading : number = 0;

  constructor(private attendanceService : AttendanceService , private studentService : StudentsService){ }

  getStudents() {
    this.studentService.getUsers().subscribe({
      next: (students) => {
        this.students = students;
        this.isLoading = this.isLoading + 1;
      },
      error: (err) => console.log(err),
    });
  }
  
  getAttendance(){
    this.attendanceService.getAttendance().subscribe({
      next : attendance => {
        this.attendance = attendance;
        this.isLoading = this.isLoading + 1;
      },
      error : err => console.log(err) 
    })
  }

  ngOnInit(): void {
    this.getAttendance();
    this.getStudents();
    this.studentService.updateStudentsSubject.subscribe(next => {
      this.isLoading = 1;
      this.getStudents();
    })
    this.attendanceService.updateAttendanceSubject.subscribe(next => {
      this.isLoading = 1;
      this.getAttendance();
    })
  }
}
