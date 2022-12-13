import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { map, catchError, take } from 'rxjs/operators';
//import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
import { CadeiaVal } from '../interfaces/cadeiaVal';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  // To get all users
  API_GET_USERS_URL = 'http://strongboxao.ddns.net:8022/accounts/users/';

  getAllUsers = 'http://strongboxao.ddns.net:8022/accounts/users/';

  // Auth Token
  getToken_url = 'http://strongboxao.ddns.net:8022/token/';

  // add valuechains
  base = 'http://strongboxao.ddns.net:8022/api/v1';

  // to get all value chain
  get_ValueChain_url = 'http://strongboxao.ddns.net:8022/api/v1/valuechains/'

  // to delete any valueChain
  delete_ValueChain_url = 'http://strongboxao.ddns.net:8022/api/v1/valuechains/';

  // to create interest expression
  interest_Express_url = 'http://strongboxao.ddns.net:8022/api/v1/interestexpressions/';


  token = '1c644080bc6af5e8990a30c964157719cbb6576c'

  constructor(
    private http: HttpClient,
    private httpParams: HttpParams) { }

  rebootVM() {
    var headers = new HttpHeaders();
    var params = new HttpParams().set('user_id', 1);
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer 1c644080bc6af5e8990a30c964157719cbb6576c');
    return this.http.get('http://strongboxao.ddns.net:8022/accounts/users/', { headers: headers, params: params })
  }


  userLogin(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    console.log(user[0])
    return this.http.post<any>(this.getToken_url, user[0], { headers: headers });

  }


  pegarusers() {
    return this.http.get("");
  }


  // get users
  listUsers() {
    return this.http.get<Users>(this.API_GET_USERS_URL);
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

  // save valuechain
  salvaCadeiaDeValor(cadeiaVal: any) {
    console.log(localStorage.getItem('userToken'), cadeiaVal)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.base + '/valuechains/', cadeiaVal, { headers: headers })
  }

  // to save interestExpression
  salvaInterestExpress(interestEx: any) {
    console.log(localStorage.getItem('userToken'), interestEx)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.interest_Express_url + '/interestexpressions/', interestEx, { headers: headers })
  }


  //to get all valueChain
  getValueChains() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<CadeiaVal[]>(this.get_ValueChain_url, { headers: headers })
  }

  // to delete any valuechain
  deleteValueChain(id:any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_ValueChain_url}${id}/`, { headers: headers }).pipe(take(1));
  }            


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
