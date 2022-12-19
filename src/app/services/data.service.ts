import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { map, catchError, take } from 'rxjs/operators';
//import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
import { CadeiaVal } from '../interfaces/cadeiaVal';

import { Pais } from '../models/pais'

import { Cidade } from '../models/cidade'
import { Condicao } from '../models/condicao.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getCondicao() {
    return [
      new Condicao(1, 'PN em elaboração'),
      new Condicao(2, 'PN elaborado')
    ]

  }

  getPaises() {
    return [
      new Pais(1, 'Brasil'),
      new Pais(2, 'USA'),
      new Pais(3, 'Itália')
    ];
  }

  getCidades() {
    return [
      new Cidade(1, 1, 'São Paulo'),
      new Cidade(2, 1, 'Brasília'),
      new Cidade(3, 1, 'Rio de Janeiro'),
      new Cidade(4, 1, 'Santos'),
      new Cidade(5, 2, 'New Yord'),
      new Cidade(6, 2, 'Chicago'),
      new Cidade(7, 2, 'Los Angeles'),
      new Cidade(8, 3, 'Roma'),
      new Cidade(9, 3, 'Florença'),
      new Cidade(10, 3, 'Veneza')
    ];
  }

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  //
  get_ValueChainsToInterestExpress_url = 'http://strongboxao.ddns.net:8022/api/v1/valuechaintointerestexpressions/';

  save_ValueChainsToInterestExpress_url = 'http://strongboxao.ddns.net:8022/api/v1'

  // url to delete BP status
  delete_Status_url = 'http://strongboxao.ddns.net:8022/api/v1/businessplanstatus/';

  // url to delete business plan statute
  delete_Statutes_url = 'http://strongboxao.ddns.net:8022/api/v1/businessplanstatutes/';

  // to get all business plan statutos
  get_BusPlanStatutos_url = 'http://strongboxao.ddns.net:8022/api/v1/businessplanstatutes/';

  // to save any business plan statutos
  Save_BusPlanStatutos_url = 'http://strongboxao.ddns.net:8022/api/v1';

  // to get all business plan status
  get_BusPlanStatus_url = 'http://strongboxao.ddns.net:8022/api/v1/businessplanstatus/';

  // to save any business plan status
  Save_BusPlanStatus_url = 'http://strongboxao.ddns.net:8022/api/v1';

  proponent_PDAC_url = 'http://strongboxao.ddns.net:8022/api/v1/getkoboforms';

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
  interest_Express_url = 'http://strongboxao.ddns.net:8022/api/v1';

  // to get all interest expression
  get_Interest_Exp_url = 'http://strongboxao.ddns.net:8022/api/v1/interestexpressions/';

  // to delete any interest espression
  delete_Interest_url = 'http://strongboxao.ddns.net:8022/api/v1/interestexpressions/';

  // to edit data of interest expression
  edit_Interest_url = 'http://strongboxao.ddns.net:8022/api/v1/';




  token = '1c644080bc6af5e8990a30c964157719cbb6576c'

  constructor(
    private http: HttpClient,
    private httpParams: HttpParams,
  ) { }

  rebootVM() {
    var headers = new HttpHeaders();
    var params = new HttpParams().set('user_id', 1);
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer 1c644080bc6af5e8990a30c964157719cbb6576c');
    return this.http.get('http://strongboxao.ddns.net:8022/accounts/users/', { headers: headers, params: params })
  }

  // PROPONENTS FROM PDAC
  proponentPDAC() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token 1c644080bc6af5e8990a30c964157719cbb6576c');

    return this.http.get<any[]>(this.proponent_PDAC_url, { headers: headers })
  }

  // ACCONT USERS -----------------------------------------------------------------------------------------------------------------------------------------

  // login user and generete token
  userLogin(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    console.log(user[0])
    return this.http.post<any>(this.getToken_url, user[0], { headers: headers });

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
  // ACCONT USERS -------------------------------------------------------------------------------------------------------------------------------------------------------


  // INTEREST EXPRESSION-----------------------------------------------------------------------------------------------------------------------------------------

  // to save interestExpression
  salvaInterestExpress(interestEx: any) {
    console.log(localStorage.getItem('userToken'), interestEx)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.interest_Express_url + '/interestexpressions/', interestEx, { headers: headers })
  }

  // to get all interestExpression
  getInterestExpress() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_Interest_Exp_url, { headers: headers })
  }

  // to delete any interestexpression
  deleteInterestExpress(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_Interest_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  editInterestExpression(id: number, interestEx: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));

    return this.http.put(`${this.get_Interest_Exp_url}${interestEx.id}/`, interestEx, { headers: headers }).pipe(take(1));
  }

  // to get interestExpression by id
  getInterestExpressByid(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get(`${this.get_Interest_Exp_url}${id}/`, { headers: headers }).pipe(take(1));
  }



  // INTEREST EXPRESSION-----------------------------------------------------------------------------------------------------------------------------------------


  // VALUE CHAINS...........................................................................................................................................................

  //to get all valueChain
  getValueChains() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<CadeiaVal[]>(this.get_ValueChain_url, { headers: headers })
  }

  // save valuechain
  salvaCadeiaDeValor(cadeiaVal: any) {
    console.log(localStorage.getItem('userToken'), cadeiaVal)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.base + '/valuechains/', cadeiaVal, { headers: headers })
  }

  // to delete any valuechain
  deleteValueChain(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_ValueChain_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // VALUE CHAINS...........................................................................................................................................................

  // BUSINESS PLAN STATUS...........................................................................................................................................................

  // To get business plan status
  get_BusinessPlan_status() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_BusPlanStatus_url, { headers: headers })
  }

  // to save any business plan status
  salvaBusinessPlanStatus(status: any) {
    //console.log(localStorage.getItem('userToken'), cadeiaVal)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.Save_BusPlanStatus_url + '/businessplanstatus/', status, { headers: headers })
  }

  // to delete any statute 
  deleteStatus(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_Status_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // BUSINESS PLAN STATUS...........................................................................................................................................................


  // BUSINESS PLAN STATUTO...........................................................................................................................................................

  // To get business plan status
  get_BusinessPlan_statutos() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_BusPlanStatutos_url, { headers: headers })
  }

  // to save any business plan status
  salvaBusinessPlanStatutos(statutes: any) {
    //console.log(localStorage.getItem('userToken'), cadeiaVal)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.Save_BusPlanStatutos_url + '/businessplanstatutes/', statutes, { headers: headers })
  }

  // to delete any statute 
  deleteStatutes(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_Statutes_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // BUSINESS PLAN STATUTO...........................................................................................................................................................




  get_ValueChainsIE() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_ValueChainsToInterestExpress_url, { headers: headers })
  }

  salva_ValueChainsIE(statutes: any) {
    //console.log(localStorage.getItem('userToken'), cadeiaVal)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.Save_BusPlanStatutos_url + '/valuechaintointerestexpressions/', statutes, { headers: headers })
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
