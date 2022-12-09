import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { map, catchError } from 'rxjs/operators';
//import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements HttpInterceptor {


  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  // To get all users
  API_GET_USERS_URL = 'http://strongboxao.ddns.net:8022/accounts/users/';

  getAllUsers = 'http://strongboxao.ddns.net:8022/accounts/users/';

  constructor(private http: HttpClient) { }
  token = '1c644080bc6af5e8990a30c964157719cbb6576c'
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokenheadfer = req.clone({
      setHeaders: {
        Authorization: "bearer " + this.token
      }
    })

    return next.handle(tokenheadfer);
  }


  pegarusers(){
    return this.http.get("http://strongboxao.ddns.net:8022/accounts/users/");
  }


  // get users
  listUsers(token: any) {
    return this.http.get<Users>(this.API_GET_USERS_URL + '&token=' + token);
  }

  // delete users by id
  deleteUser(id: any) {
    return this.http.delete<Users>(this.API_GET_USERS_URL + id + '/');
  }

  // insert users
  AddUser(data: any) {
    return this.http.post<Users>(this.API_GET_USERS_URL, data);
  }

  // update users
  updateUser() {

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
