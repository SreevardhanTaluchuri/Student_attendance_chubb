import { Injectable } from '@angular/core';
import { IStudent } from '../interfaces/student';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private _students : IStudent[] = [];
  updateStudentsSubject  = new Subject<string>();

  private url = "https://6539e4b3e3b530c8d9e8ca82.mockapi.io/api/students"
  
  constructor(private http : HttpClient) { }

  get students() : IStudent[]{
    return this._students
  }

  updateStudentsList(event : string){
    this.updateStudentsSubject.next(event);
  }

  getUsers() : Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.url).pipe(
      tap(users => this._students = users),
      catchError(err => this.handleError(err))
    );
  }
  editStudent(id:string ,student : IStudent ) : Observable<IStudent[]> {
    return this.http.put<IStudent[]>(this.url+"/"+id ,student).pipe(
      catchError(err => this.handleError(err))
    );
  }
  deleteStudent(id:string) : Observable<IStudent[]> {
    return this.http.delete<IStudent[]>(this.url+"/"+id).pipe(
      catchError(err => this.handleError(err))
    );
  }

  addUser(student : IStudent) : Observable<IStudent>{
    return this.http.post<IStudent>(this.url , student).pipe(catchError(err => this.handleError(err)))
  }

  private handleError(err : HttpErrorResponse){
    let error = '';
    if(err.error instanceof ErrorEvent){error = `An error occured in ${err.error.message}`}
    else{error = `Server returned with error ${err.status} and ${err.message}`}
    console.log(error);
    return throwError(() => error);
  }

}
