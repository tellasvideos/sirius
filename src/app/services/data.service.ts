import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { map, catchError } from 'rxjs/operators';
//import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  // To get all users
  API_GET_USERS_URL = 'http://strongboxao.ddns.net:8022/accounts/users/';

  getAllUsers = 'http://strongboxao.ddns.net:8022/accounts/users/';

  constructor(private http: HttpClient) { }

  // get users or fecth
  listUsers(){
    return this.http.get<Users>(this.API_GET_USERS_URL);
  }

  // delete users by id
  deleteUser(id:any){
    return this.http.delete<Users>(this.API_GET_USERS_URL+id+'/');
  }

  // insert users
  AddUser(data:any){
    return this.http.post<Users>(this.API_GET_USERS_URL, data);
  }

  // update users
  updateUser(){
    
  }


  /*getUsersTodos(): Observable<{}> {
    return this.http.get(this.getAllUsers).pipe(
      map(this.extrairDados), catchError(this.handleError)
    );
  }*/

  /*getAllTodos(): Observable<Users[]> {
    return this.http.get<Users[]>(this.API_GET_USERS_URL + '/users')
    .pipe(
      catchError(err => {
        return this.handleError(err);
      });
  }*/

  private extrairDados(res: Response) {
    const body = res;
    return body || {};
  }

  //Implement a method to handle errors if any
   private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  returnMessage() {
    return this.currentMessage;
  }
}
