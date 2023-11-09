import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { IAttendance } from 'src/app/interfaces/attendance';
import { IStudent } from 'src/app/interfaces/student';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() data!: IStudent[] | IAttendance[];
  @Input() parentComponent!: string;
  @Output() dialog: EventEmitter<string> = new EventEmitter<string>();
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  studentColumns: string[] = ['position','name', 'email', 'mobile', 'age', 'actions'];
  attendanceColumns: string[] = ['position', 'date', 'status', 'actions'];
  dataSource!: MatTableDataSource<IStudent | IAttendance>;
  constructor() {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<IStudent | IAttendance>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  raiseEventDialog() {
    this.dialog.emit('dialog');
  }

  raiseEventEdit(id: string) {
    this.edit.emit(id);
  }

  raiseEventDelete(id: string) {
    this.delete.emit(id);
  }
}
