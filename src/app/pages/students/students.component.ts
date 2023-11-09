import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeteleDialogComponent } from 'src/app/components/detele-dialog/detele-dialog.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { IStudent } from 'src/app/interfaces/student';
import { AttendanceService } from 'src/app/services/attendance.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: IStudent[] = [];
  constructor(
    private studentService: StudentsService,
    private attendanceService : AttendanceService,
    public dialog: MatDialog
  ) {}

  getStudents = () =>this.students = this.studentService.students;

  ngOnInit(): void {
    // this.getUsers();
    this.getStudents();
    // console.log(this.students);
  }

  openDialogBox(event: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data : {page : 'students'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentService.addUser(result).subscribe(() => {
          this.studentService.updateStudentsList('create');
          this.getStudents();
        });
      }
    });
  }

  editStudent(id : string){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data : {page : 'students' , 'data': this.students.find(student => student.id == id)}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.studentService.editStudent(result.id , result).subscribe(() => {
          this.studentService.updateStudentsList('edit');
          this.getStudents();
        });
      }
    });
  }
  deleteStudent(id : string){
    const dialogRef = this.dialog.open(DeteleDialogComponent, {
      width: '450px',
      data : {page : 'students',data : this.students.find(student => student.id == id)}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const findStudentAttendance = this.attendanceService.attendance.filter(item => item.student == result.data.id);
        console.log(findStudentAttendance);
        this.studentService.deleteStudent(result.data.id).subscribe(() => {
          if(findStudentAttendance.length > 0){
            findStudentAttendance.forEach(item => {
              this.attendanceService.deleteAttendance(String(item.id)).subscribe(() => {})
            })
          }
          this.studentService.updateStudentsList('update');
          this.getStudents();
        });
      }
    });
  }
}
