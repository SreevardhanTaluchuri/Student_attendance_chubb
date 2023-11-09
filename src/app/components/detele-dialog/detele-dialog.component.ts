import { Component , Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAttendance } from 'src/app/interfaces/attendance';
import { IStudent } from 'src/app/interfaces/student';

@Component({
  selector: 'app-detele-dialog',
  templateUrl: './detele-dialog.component.html',
  styleUrls: ['./detele-dialog.component.scss']
})
export class DeteleDialogComponent implements OnInit {
  name! : String;
  student! :  {page : string , data : IStudent | IAttendance};

  constructor(
    private dialogRef: MatDialogRef<DeteleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {page : string , data : IStudent | IAttendance}
  ) {}

  delete(){
    console.log(this.student);
    this.dialogRef.close(this.student);
  }

  ngOnInit(): void {
    if (this.data.data){
      this.student = this.data;
      if(this.data.page == 'student')
      this.name = (this.data.data as IStudent).name;
    }
  }
  
  cancel(){
    this.dialogRef.close(null);
  }

}
