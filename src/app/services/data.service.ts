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
      new Condicao(1, 'Sim'),
      new Condicao(2, 'nao')
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

  // url to get provinces and add an man. interest
  get_Provinces_url = 'http://strongboxao.ddns.net:8022/api/v1/provinces/';

  //url to proposal agreeement
  get_Proposal_Agreement_url = 'http://strongboxao.ddns.net:8022/api/v1/proposeragreements/';
  delete_Proposal_Agreement_url = 'http://strongboxao.ddns.net:8022/api/v1/proposeragreements/';
  save_Proposal_Agreement_url = 'http://strongboxao.ddns.net:8022/api/v1';

  // url to get inquiriers
  get_inquiriers_url = 'http://strongboxao.ddns.net:8022/api/v1/inquirers/';
  save_inquiriers_url = 'http://strongboxao.ddns.net:8022/api/v1';
  delete_inquiriers_url = 'http://strongboxao.ddns.net:8022/api/v1/inquirers/';

  // Value chain to interest expression
  delete_ValueChainsToInterestExpress_url = 'http://strongboxao.ddns.net:8022/api/v1/valuechaintointerestexpressions/';
  get_ValueChainsToInterestExpress_url = 'http://strongboxao.ddns.net:8022/api/v1/valuechaintointerestexpressions/';
  save_ValueChainsToInterestExpress_url = 'http://strongboxao.ddns.net:8022/api/v1'

  // url to get departaments
  get_departaments_url = 'http://strongboxao.ddns.net:8022/api/v1/departments/';
  save_departaments_url = 'http://strongboxao.ddns.net:8022/api/v1';
  delete_departaments_url = 'http://strongboxao.ddns.net:8022/api/v1/departments/';

  // url to inquireform
  get_inquireForms_url = 'http://strongboxao.ddns.net:8022/api/v1/inquirerforms/';
  save_inquireForms_url = 'http://strongboxao.ddns.net:8022/api/v1';
  delete_inquireForms_url = 'http://strongboxao.ddns.net:8022/api/v1/inquirerforms/';

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
  GET_USERS_URL = 'http://strongboxao.ddns.net:8022/accounts/users/';

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

  // InterestExpression by province
  interestExpressByProv_url = 'http://strongboxao.ddns.net:8022/api/v1/interestexpressions/?province=';

  token = '1c644080bc6af5e8990a30c964157719cbb6576c';

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

  // Method to Get all proponents from PDAC Data-Base
  proponentPDAC() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token 1c644080bc6af5e8990a30c964157719cbb6576c');

    return this.http.get<any[]>(this.proponent_PDAC_url, { headers: headers }).pipe(take(1))
  }

  // login user and generete token
  userLogin(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    console.log(user[0])
    return this.http.post<any>(this.getToken_url, user[0], { headers: headers });

  }

  getUser() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.GET_USERS_URL, { headers: headers })
  }

  // get users
  listUsers() {
    return this.http.get<Users>(this.GET_USERS_URL);
  }

  // delete users by id
  deleteUser(id: any) {
    return this.http.delete<Users>(this.GET_USERS_URL + id + '/');
  }

  // insert users
  AddUser(data: any) {
    return this.http.post<Users>(this.GET_USERS_URL, data);
  }

  // update users
  updateUser() {

  }

  // Method to save an interest Expression
  salvaInterestExpress(interestEx: any) {
    console.log(localStorage.getItem('userToken'), interestEx)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.interest_Express_url + '/interestexpressions/', interestEx, { headers: headers })
  }

  // Method to Get all interest Expression
  getInterestExpress() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_Interest_Exp_url, { headers: headers })
  }

  // Method to Delete any interest Expression
  deleteInterestExpress(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_Interest_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to Update any interest Expression
  editInterestExpression(id: number, interestEx: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));

    return this.http.put(`${this.get_Interest_Exp_url}${interestEx.id}/`, interestEx, { headers: headers }).pipe(take(1));
  }

  // Method to Get an interest Expression by id
  getInterestExpressByid(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get(`${this.get_Interest_Exp_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to Get all value Chain
  getValueChains() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<CadeiaVal[]>(this.get_ValueChain_url, { headers: headers })
  }

  // Method to Post a Value Chain
  salvaCadeiaDeValor(cadeiaVal: any) {
    console.log(localStorage.getItem('userToken'), cadeiaVal)
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.base + '/valuechains/', cadeiaVal, { headers: headers })
  }

  // Method to Delete any Value Chain
  deleteValueChain(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_ValueChain_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to Get Interest Expression Status
  get_BusinessPlan_status() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_BusPlanStatus_url, { headers: headers })
  }

  // Method to save any Interest Expression Status
  salvaBusinessPlanStatus(status: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.Save_BusPlanStatus_url + '/businessplanstatus/', status, { headers: headers })
  }

  // Method to Delete any Interest Expression Status 
  deleteStatus(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_Status_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to Get Interest Expression Statute
  get_BusinessPlan_statutos() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_BusPlanStatutos_url, { headers: headers })
  }

  // Method to save Interest Expression Statute
  salvaBusinessPlanStatutos(statutes: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.Save_BusPlanStatutos_url + '/businessplanstatutes/', statutes, { headers: headers })
  }

  // Method to Delete Interest Expression Statute
  deleteStatutes(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_Statutes_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to Get a Value Chain to Interest Expression
  get_ValueChainsIE() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_ValueChainsToInterestExpress_url, { headers: headers })
  }

  // Method to save a Value Chain to Interest Expression
  salva_ValueChainsIE(statutes: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.Save_BusPlanStatutos_url + '/valuechaintointerestexpressions/', statutes, { headers: headers })
  }

  // Method to Delete a Value Chain to Interest Expression
  delete_ValueChainsIExpress(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_ValueChainsToInterestExpress_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to Get all Proposal Agreement
  get_Proposal_Agreement() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_Proposal_Agreement_url, { headers: headers })
  }

  // Method to Delete all Proposal Agreement
  deleteAcordos(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_Proposal_Agreement_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to save any Proposal Agreement
  salvaAcordos(acordo: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.save_Proposal_Agreement_url + '/proposeragreements/', acordo, { headers: headers })
  }

  // Method to Get pronvices
  get_Provinces() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_Provinces_url, { headers: headers })
  }

  // Method to Delete pronvices
  deleteProvinces(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.get_Provinces_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to get inquiriers
  get_Inquiriers() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_inquiriers_url, { headers: headers })
  }

  // Method to save inquiriers
  salvaInquiriers(inquiridor: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.save_inquiriers_url + '/inquirers/', inquiridor, { headers: headers })
  }

  // Method to delete Inquiriers
  deleteInquirier(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_inquiriers_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to get inquire form
  get_InquireForm() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_inquireForms_url, { headers: headers })
  }

  // Method to save inquire form
  salvaInquireForm(inquireForm: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.save_inquireForms_url + '/inquirerforms/', inquireForm, { headers: headers })
  }

  // Method to delete Inquire form
  deleteInquireForm(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_inquireForms_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to get Departaments 
  get_Departaments() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_departaments_url, { headers: headers })
  }

  // Method to save departament form
  salvaDepartaments(departament: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.save_departaments_url + '/departments/', departament, { headers: headers })
  }

  // Method to delete Inquire form
  deleteDepartaments(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.delete(`${this.delete_departaments_url}${id}/`, { headers: headers }).pipe(take(1));
  }

  // Method to get interest Expression by province
  interestExpressionByProvince(id: any) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get(`${this.interestExpressByProv_url}${id}`, { headers: headers }).pipe(take(1));
  }

}
