import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeteleDialogComponent } from 'src/app/components/detele-dialog/detele-dialog.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { IAttendance } from 'src/app/interfaces/attendance';
import { IStudent } from 'src/app/interfaces/student';
import { AttendanceService } from 'src/app/services/attendance.service';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  student!: IStudent;
  attendance: IAttendance[] = [];
  id! : string;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private studentService: StudentsService,
    private attendaceService: AttendanceService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id: string = params['id'];
      this.student = this.studentService.students.filter(
        (student) => student.id == id
      )[0];
      this.id = id;
    });
    this.getAttendance();
  }

  getAttendance() {
    this.attendance = this.attendaceService.attendance.filter(
      (attendance) => attendance.student == this.student.id
    );
    this.attendance = this.attendance.map((item) => {
      return {
        id: item.id,
        student: this.student.name,
        date: item.date,
        status: item.status,
      };
    });
    console.log(this.attendance);
  }

  openDialogBox(event: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: { page: 'attendance' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log(result);
        result.student = this.id;
        this.attendaceService.addAttendance(result).subscribe(() => {
          this.attendaceService.updateAttendanceList('create');
        });
      }
    });
  }

  editAttendance(id: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {
        page: 'attendance',
        data: this.attendance.find((attendance) => attendance.id == id),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.student = this.id;
        this.attendaceService
          .editAttendance(result.id, result)
          .subscribe(() => {
            this.attendaceService.updateAttendanceList('edit');
          });
      }
    });
  }
  navigateToHome() {
    this.router.navigate(['/students']);
  }
  deleteAttendance(id: string) {
    const dialogRef = this.dialog.open(DeteleDialogComponent, {
      width: '450px',
      data: {
        page: 'attendance',
        data: this.attendance.find((attendance) => attendance.id == id),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { data } = result;
        this.attendaceService.deleteAttendance(data.id).subscribe(() => {
          this.attendaceService.updateAttendanceList('delete');
        });
      }
    });
  }
}
