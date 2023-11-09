import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAttendance } from '../interfaces/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private _attendance : IAttendance[] = [];
  updateAttendanceSubject  = new Subject<string>();

  private url = "https://6539e4b3e3b530c8d9e8ca82.mockapi.io/api/attendance"
  
  constructor(private http : HttpClient) { }

  updateAttendanceList(event : string){
    this.updateAttendanceSubject.next(event);
  }

  get attendance() : IAttendance[]{
    return this._attendance
  }

  getAttendance() : Observable<IAttendance[]> {
    return this.http.get<IAttendance[]>(this.url).pipe(
      tap(attendance => this._attendance = attendance),
      catchError(err => this.handleError(err))
    );
  }

  addAttendance(attendance : IAttendance) : Observable<IAttendance>{
    return this.http.post<IAttendance>(this.url , attendance).pipe(catchError(err => this.handleError(err)))
  }

  editAttendance(id:string ,attendance : IAttendance ) : Observable<IAttendance[]> {
    return this.http.put<IAttendance[]>(this.url+"/"+id ,attendance).pipe(
      catchError(err => this.handleError(err))
    );
  }
  deleteAttendance(id:string) : Observable<IAttendance[]> {
    return this.http.delete<IAttendance[]>(this.url+"/"+id).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private handleError(err : HttpErrorResponse){
    let error = '';
    if(err.error instanceof ErrorEvent){error = `An error occured in ${err.error.message}`}
    else{error = `Server returned with error ${err.status} and ${err.message}`}
    console.log(error);
    return throwError(() => error);
  }

}
