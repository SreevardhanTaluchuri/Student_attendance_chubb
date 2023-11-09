import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IAttendance } from 'src/app/interfaces/attendance';
import { IStudent } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/student.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  student: IStudent | IAttendance = {
    name: '',
    email: '',
    mobile: 0,
    age: 0,
    status: '',
    student: '',
    date: new Date(),
  };
  form!: FormGroup;
  names: () => String[] = () =>
    this.studentService.students.map((student) => student.name);

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private studentService: StudentsService,
    private route : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: { page: string; data: IStudent | IAttendance }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      email: [''],
      mobile: [0],
      age: [0],
      student: [''],
      date: [0],
      status: [''],
    });
    if (this.data.data) this.student = this.data.data;
    if (this.data.page == 'students') {
      this.form.get('name')?.setValue((this.student as IStudent).name);
      this.form.get('email')?.setValue((this.student as IStudent).email);
      this.form.get('mobile')?.setValue((this.student as IStudent).mobile);
      this.form.get('age')?.setValue((this.student as IStudent).age);
    } else if (this.data.page == 'attendance') {
      this.form
        .get('date')
        ?.setValue(new Date((this.student as IAttendance).date));
      this.form.get('status')?.setValue((this.student as IAttendance).status);
    }
  }

  save() {
    if (this.data.page == 'students'){
      if(this.data.data){
        this.dialogRef.close({
          id: this.data.data.id,
          name: this.form.get('name')?.value,
          email: this.form.get('email')?.value,
          mobile: this.form.get('mobile')?.value,
          age: this.form.get('age')?.value,
        });
      }else{
        this.dialogRef.close({
          name: this.form.get('name')?.value,
          email: this.form.get('email')?.value,
          mobile: this.form.get('mobile')?.value,
          age: this.form.get('age')?.value,
        });
      }
    }
    else {
      if(this.data.data){
        this.dialogRef.close({
          date: new Date(this.form.get('date')?.value).valueOf(),
          status: this.form.get('status')?.value,
          id: (this.data.data as IAttendance).id,
        });
      }else{
        this.dialogRef.close({
          date: new Date(this.form.get('date')?.value).valueOf(),
          status: this.form.get('status')?.value,
        });
      }
    }
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
