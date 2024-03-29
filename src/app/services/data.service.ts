import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { map, catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CadeiaVal } from '../interfaces/cadeiaVal';
import { Pais } from '../models/pais'
import { Cidade } from '../models/cidade'
import { Condicao } from '../models/condicao.model';
import { BasicEchartLineModel } from '../models/echart.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  loginerror = false;

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

  // development  https://api.biplan.ao/

  // url to get provinces and add an man. interest
  get_Provinces_url = 'https://api.biplan.ao/api/v1/provinces/';

  //url to proposal agreeement
  get_Proposal_Agreement_url = 'https://api.biplan.ao/api/v1/proposeragreements/';
  delete_Proposal_Agreement_url = 'https://api.biplan.ao/api/v1/proposeragreements/';
  save_Proposal_Agreement_url = 'https://api.biplan.ao/api/v1';

  // url to get inquiriers
  get_inquiriers_url = 'https://api.biplan.ao/api/v1/inquirers/';
  save_inquiriers_url = 'https://api.biplan.ao/api/v1';
  delete_inquiriers_url = 'https://api.biplan.ao/api/v1/inquirers/';

  // Value chain to interest expression
  delete_ValueChainsToInterestExpress_url = 'https://api.biplan.ao/api/v1/valuechaintointerestexpressions/';
  get_ValueChainsToInterestExpress_url = 'https://api.biplan.ao/api/v1/valuechaintointerestexpressions/';
  save_ValueChainsToInterestExpress_url = 'https://api.biplan.ao/api/v1'

  // url to get departaments
  get_departaments_url = 'https://api.biplan.ao/api/v1/departments/';
  save_departaments_url = 'https://api.biplan.ao/api/v1';
  delete_departaments_url = 'https://api.biplan.ao/api/v1/departments/';

  // url to inquireform
  get_inquireForms_url = 'https://api.biplan.ao/api/v1/inqueritos/';
  save_inquireForms_url = 'https://api.biplan.ao/api/v1';
  delete_inquireForms_url = 'https://api.biplan.ao/api/v1/inqueritos/';

  // url to delete BP status
  delete_Status_url = 'https://api.biplan.ao/api/v1/businessplanstatus/';

  // url to delete business plan statute
  delete_Statutes_url = 'https://api.biplan.ao/api/v1/businessplanstatutes/';

  // to get all business plan statutos
  get_BusPlanStatutos_url = 'https://api.biplan.ao/api/v1/businessplanstatutes/';

  // to save any business plan statutos
  Save_BusPlanStatutos_url = 'https://api.biplan.ao/api/v1';

  // to get all business plan status
  get_BusPlanStatus_url = 'https://api.biplan.ao/api/v1/businessplanstatus/';

  // to save any business plan status
  Save_BusPlanStatus_url = 'https://api.biplan.ao/api/v1';

  proponent_PDAC_url = 'https://api.biplan.ao/api/v1/getkoboforms/';

  // To get all users
  GET_USERS_URL = 'https://api.biplan.ao/accounts/users/';

  // save user url
  save_user_url = 'https://api.biplan.ao/accounts';

  // forgot password
  forgot_pass_url = 'https://api.biplan.ao/accounts';

  // delete user url
  delete_user_url = 'https://api.biplan.ao/accounts/user/';

  // Auth Token
  getToken_url = 'https://api.biplan.ao/token/';

  // add valuechains
  base = 'https://api.biplan.ao/api/v1';

  // to get all value chain
  get_ValueChain_url = 'https://api.biplan.ao/api/v1/valuechains/'

  // to delete any valueChain
  delete_ValueChain_url = 'https://api.biplan.ao/api/v1/valuechains/';

  // to create interest expression
  interest_Express_url = 'https://api.biplan.ao/api/v1';

  // to get value chain by id
  get_ValueChainInExpress_By_Id_url = 'https://api.biplan.ao/api/v1/valuechaintointerestexpressions/';

  // to get all interest expression
  get_Interest_Exp_url = 'https://api.biplan.ao/api/v1/interestexpressions/';

  // to get user by id
  get_User_byId_url = 'https://api.biplan.ao/accounts/user/';

  // to get value chain by id
  get_Cadeia_byId_url = 'https://api.biplan.ao/api/v1/valuechains/'

  // to get inquirier by id
  get_Iquiridor_byId_url = 'https://api.biplan.ao/api/v1/inquirers/';

  // to get departament by id
  get_Depart_byId_url = 'https://api.biplan.ao/api/v1/departments/';

  // to get agreement proposer by id
  get_agreement_proposer_byId_url = 'https://api.biplan.ao/api/v1/proposeragreements/';

  // to get business plan status by id
  get_Status_byId_url = 'https://api.biplan.ao/api/v1/businessplanstatus/';

  // to get business plan estatute
  get_Estatute_byId_url = 'https://api.biplan.ao/api/v1/businessplanstatutes/';

  // to get inquire by id
  get_Iquerito_byId_url = 'https://api.biplan.ao/api/v1/inqueritos/';

  // to get all interest expression
  edit_Interest_Exp_url = 'https://api.biplan.ao/api/v1/interestexpressions/';

  // to update value chain to interest express
  edit_cadeiaManIn_url = 'https://api.biplan.ao/api/v1/valuechaintointerestexpressions/';

  // to update value chain
  edit__Cadeia_url = 'https://api.biplan.ao/api/v1/valuechains/';

  // to update data of the inquirier
  edit_inquiridor_url = 'https://api.biplan.ao/api/v1/inquirers/';

  // to update departaments
  edit_depart_url = 'https://api.biplan.ao/api/v1/departments/';

  // to update proposer agreement
  edit_acordo_url = 'https://api.biplan.ao/api/v1/proposeragreements/';

  // to update business plan status
  edit_status_url = 'https://api.biplan.ao/api/v1/businessplanstatus/';

  // to update business plan statutes
  edit_statutes_url = 'https://api.biplan.ao/api/v1/businessplanstatutes/';

  // to update data to inquire
  edit_inquerito_url = 'https://api.biplan.ao/api/v1/inqueritos/';

  // to edit user
  edit_User_url = 'https://api.biplan.ao/accounts/user/';

  // to delete any interest espression
  delete_Interest_url = 'https://api.biplan.ao/api/v1/interestexpressions/';

  // to edit data of interest expression
  edit_Interest_url = 'https://api.biplan.ao/api/v1/';

  // InterestExpression by province
  interestExpressByProv_url = 'https://api.biplan.ao/api/v1/interestexpressions/?province=';

  InquiriersByProv_url = 'https://api.biplan.ao/api/v1/inquirers/?province=';

  proponentsByProv_url = 'https://api.biplan.ao/api/v1';

  apiUrl = 'https://api.biplan.ao/accounts/users';

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
    return this.http.get('https://api.biplan.ao/accounts/users/', { headers: headers, params: params })
  }

  // To get user login data
  getUserData() {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl, { headers });
  }

  // Method to get company name
  getCompanyName() {
    return this.http.get('https://api.biplan.ao/api/v1/empresas/');
  }

  // Method to get Category
  getCategory() {
    return this.http.get('https://api.biplan.ao/api/v1/categorias/');
  }

  // Method to get village
  getMunicipio() {
    return this.http.get('https://api.biplan.ao/api/v1/municipios/');
  }

   // Method to get coordenadas
   getCoordenadas_map() {
    return this.http.get('https://api.biplan.ao/api/v1/distribuicaodospndesembolsadosdashboard/');
  }

  // Method to Get all proponents from PDAC Data-Base
  proponentPDAC() {
    //var headers = new HttpHeaders();
    //headers = headers.append('Content-Type', 'application/json');
    //headers = headers.append('Authorization', 'Token 1c644080bc6af5e8990a30c964157719cbb6576c');
    return this.http.get<any[]>(this.proponent_PDAC_url, /*{ headers: headers }*/).pipe(take(1))
  }

  apiUrl_Inquerito_by_id = 'https://api.biplan.ao/api/v1/inqueritos';

  getInqueritoDetalhes(id: number): Observable<any> {
    const url = `${this.apiUrl_Inquerito_by_id}/${id}`;
    return this.http.get<any>(url);
  }


  // Method to recover password
  forgtPass(email: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token 1c644080bc6af5e8990a30c964157719cbb6576c');*/
    //console.log('email a recuperar pass', email);
    return this.http.post(this.forgot_pass_url + '/forgotpassword/', email, /*{ headers: headers }*/)
  }

  // Method to set new password
  setPass(newpass: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token 1c644080bc6af5e8990a30c964157719cbb6576c');*/
    //console.log('pass redifinida', newpass);
    return this.http.post(this.forgot_pass_url + '/setnewpassword/', newpass, /*{ headers: headers }*/)
  }

  // login user and generete token
  userLogin(user: any): Observable<any> {
    /*let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    ////console.log('a logar', user)*/
    return this.http.post<any>(this.getToken_url, user, /*{ headers: headers }*/).pipe(take(1));
  }

  getUser() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.GET_USERS_URL, /*{ headers: headers }*/)
  }

  // Edit users
  EditeUsers(id: any, user: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.patch(`${this.edit_User_url}${id}/`, user, /*{ headers: headers }*/).pipe(take(1));
  }

  // delete users by id
  deleteUser(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_user_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // insert user
  AddUser(user: any) {
    //console.log(localStorage.getItem('userToken'), user)
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.save_user_url + '/users/', user, /*{ headers: headers }*/)
  }

  // Method to save an interest Expression
  salvaInterestExpress(interestEx: any) {
    //console.log(localStorage.getItem('userToken'), interestEx)
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.interest_Express_url + '/interestexpressions/', interestEx, /*{ headers: headers }*/)
  }

  // Method to Get all interest Expression
  getInterestExpress() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.get_Interest_Exp_url, /*{ headers: headers }*/)
  }

  // Method to Delete any interest Expression
  deleteInterestExpress(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_Interest_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to Update any interest Expression
  editInterestExpression(id: number, interestEx: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.put(`${this.edit_Interest_Exp_url}${id}/`, interestEx, /*{ headers: headers }*/).pipe(take(1));
  }

  // to update value chain to interest express
  Edit_CadeiaManIn(id: any, cadeiaManInt: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.put(`${this.edit_cadeiaManIn_url}${id}/`, cadeiaManInt, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to update value chain
  EditCadeia(id: number, cadeia: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.put(`${this.edit__Cadeia_url}${id}/`, cadeia, /*{ headers: headers }*/).pipe(take(1));
  }

  //Method to edit inquiriers
  EditInquiridor(id: number, inquiridor: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.put(`${this.edit_inquiridor_url}${id}/`, inquiridor, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to edit departament
  EditDepartamento(id: number, depart: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.put(`${this.edit_depart_url}${id}/`, depart, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to update proposer agreement
  EditAcordo(id: number, acordo: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.put(`${this.edit_acordo_url}${id}/`, acordo, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to update Business Plan status
  Edit_BP_Status(id: number, status: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.put(`${this.edit_status_url}${id}/`, status, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method update BP statutes
  Edit_BP_Statutes(id: number, statutes: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.put(`${this.edit_statutes_url}${id}/`, statutes, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to updade inquerito
  EditInquerito(id: number, inquerito: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.patch(`${this.edit_inquerito_url}${id}/`, inquerito, /*{ headers: headers }*/).pipe(take(1));
  }


  // pacth to disable a inquire
  is_deleted_url = 'https://api.biplan.ao/api/v1/inqueritos/';
  is_deleted(id: number, field: any) {
    return this.http.patch(`${this.is_deleted_url}${id}/`, field).pipe(take(1));
  }

  // A funccion to update backoffice form
  Update_Backoffice_form(id: any, form_data: any) {
    return this.http.patch(`${this.url_formbackofficebyid}${id}/`, form_data, /*{ headers: headers }*/).pipe(take(1));
  }


  url_update_pn_form = 'https://api.biplan.ao/api/v1/pnelaborados/'
  Update_PN_form(id: any, form: any) {
    return this.http.patch(`${this.url_update_pn_form}${id}/`, form, /*{ headers: headers }*/).pipe(take(1));
  }

  url_Update_visitas_form = 'https://api.biplan.ao/api/v1/registrosdasvisitas/'
  Update_Visitas_form(id: any, form: any) {
    return this.http.patch(`${this.url_Update_visitas_form}${id}/`, form, /*{ headers: headers }*/).pipe(take(1));
  }

  url_update_PGAS_form = 'https://api.biplan.ao/api/v1/formulariojanelapgas/'
  Update_PGAS_form(id: any, form: any) {
    return this.http.patch(`${this.url_update_PGAS_form}${id}/`, form, /*{ headers: headers }*/).pipe(take(1));
  }

  // get chartData 
  getBasicAreaEchartData(): Observable<BasicEchartLineModel[]> {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<BasicEchartLineModel[]>('https://api.biplan.ao/api/v1/getinterestexpressionsnumberpermonth/', /*{ headers: headers }*/);
  }

  // Method to Get an interest Expression by id
  getInterestExpressByid(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_Interest_Exp_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  //Method to get value chain by id
  getCadeiaManInById(id: number) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_ValueChainInExpress_By_Id_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get user by id
  getUserByid(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_User_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get value chain by id
  getCadeiaByid(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_Cadeia_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get inqurier by id
  getInquiridorByid(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_Iquiridor_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  //Method to get departament by id
  getDepartById(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_Depart_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get agreement_proposer by id
  getAcordoById(id: number) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_agreement_proposer_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get business plan status
  getStatusById(id: number) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_Status_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  //Method to get business plan estatute
  getEstatuteById(id: number) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_Estatute_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  //Method to get inquerito by id
  getInqueritoByid(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.get_Iquerito_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  get_backoffice_byId_url = 'https://api.biplan.ao/api/v1/formulariosbackoffice/';
  getBackofficeByID(id: any) {
    return this.http.get(`${this.get_backoffice_byId_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to Get all value Chain
  getValueChains() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<CadeiaVal[]>(this.get_ValueChain_url, /*{ headers: headers }*/)
  }

  // Method to Post a Value Chain
  salvaCadeiaDeValor(cadeiaVal: any) {
    //console.log(localStorage.getItem('userToken'), cadeiaVal)
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.base + '/valuechains/', cadeiaVal, /*{ headers: headers }*/)
  }

  // Method to Delete any Value Chain
  deleteValueChain(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_ValueChain_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to Get Interest Expression Status
  get_BusinessPlan_status() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.get_BusPlanStatus_url, /*{ headers: headers }*/)
  }

  // Method to save any Interest Expression Status
  salvaBusinessPlanStatus(status: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.Save_BusPlanStatus_url + '/businessplanstatus/', status, /*{ headers: headers }*/)
  }

  // Method to Delete any Interest Expression Status 
  deleteStatus(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_Status_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to Get Interest Expression Statute
  get_BusinessPlan_statutos() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.get_BusPlanStatutos_url, /*{ headers: headers }*/)
  }

  // Method to save Interest Expression Statute
  salvaBusinessPlanStatutos(statutes: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.Save_BusPlanStatutos_url + '/businessplanstatutes/', statutes, /*{ headers: headers }*/)
  }

  // Method to Delete Interest Expression Statute
  deleteStatutes(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_Statutes_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to Get a Value Chain to Interest Expression
  get_ValueChainsIE() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.get_ValueChainsToInterestExpress_url, /*{ headers: headers }*/)
  }

  // Method to save a Value Chain to Interest Expression
  salva_ValueChainsIE(statutes: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.Save_BusPlanStatutos_url + '/valuechaintointerestexpressions/', statutes, /*{ headers: headers }*/)
  }

  // Method to Delete a Value Chain to Interest Expression
  delete_ValueChainsIExpress(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_ValueChainsToInterestExpress_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  delete_visitas_url = 'https://api.biplan.ao/api/v1/registrosdasvisitas/';
  delete_visitas(id: any) {
    return this.http.delete(`${this.delete_visitas_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to Get all Proposal Agreement
  get_Proposal_Agreement() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.get_Proposal_Agreement_url, /*{ headers: headers }*/)
  }

  // Method to Delete all Proposal Agreement
  deleteAcordos(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_Proposal_Agreement_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to save any Proposal Agreement
  salvaAcordos(acordo: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.save_Proposal_Agreement_url + '/proposeragreements/', acordo, /*{ headers: headers }*/)
  }

  // Method to Get pronvices
  get_Provinces() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.get_Provinces_url, /*{ headers: headers }*/)
  }

  // Method to Delete pronvices
  deleteProvinces(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.get_Provinces_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get inquiriers
  get_Inquiriers() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.get_inquiriers_url, /*{ headers: headers }*/)
  }

  // Method to save inquiriers
  salvaInquiriers(inquiridor: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.save_inquiriers_url + '/inquirers/', inquiridor, /*{ headers: headers }*/)
  }

  // Method to delete Inquiriers
  deleteInquirier(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_inquiriers_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get inquire form
  get_InquireForm() {
    //var headers = new HttpHeaders();
    // headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.get<any[]>(this.get_inquireForms_url).pipe(take(2));
  }

  // Method to save inquire form
  salvaInquireForm(inquireForm: any) {
    // var headers = new HttpHeaders();
    // headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));
    return this.http.post(this.save_inquireForms_url + '/inqueritos/', inquireForm)
  }

  // Method to delete Inquire form
  deleteInquireForm(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_inquireForms_url}${id}/`, /*{ headers: headers }*/).pipe(take(2));
  }

  // Method to get Departaments 
  get_Departaments() {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get<any[]>(this.get_departaments_url, /*{ headers: headers }*/)
  }

  // Method to save departament form
  salvaDepartaments(departament: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.post(this.save_departaments_url + '/departments/', departament, /*{ headers: headers }*/)
  }

  // Method to delete Inquire form
  deleteDepartaments(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.delete(`${this.delete_departaments_url}${id}/`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get interest Expression by province
  interestExpressionByProvince(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.interestExpressByProv_url}${id}`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get inquirier by province
  InquiriersByProvince(id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.http.get(`${this.InquiriersByProv_url}${id}`, /*{ headers: headers }*/).pipe(take(1));
  }

  // Method to get proponents by province
  ProponentsByProvince(province_id: any) {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    //console.log(province_id)
    return this.http.post(this.proponentsByProv_url + '/koboformsbyprovince/', province_id, /*{ headers: headers }*/);
  }

  // A funccion to post backoffice form
  formBackoffice_url = 'https://api.biplan.ao/api/v1'
  Send_Backoffice_form(form_data: any) {
    return this.http.post(this.formBackoffice_url + '/formulariosbackoffice/', form_data)
  }



  // A function to get all backoffice data and inquires data
  get_backoffice_Url = 'https://api.biplan.ao/api/v1/formulariosbackoffice/';
  Get_Backoffice_Form() {
    return this.http.get<any[]>(this.get_backoffice_Url);
  }

  // Pegar dados do formulario Backoffice junto ao id do inquerito selecionado
  dados_agrupados_url = 'https://api.biplan.ao/api/v1/formulariosbackoffice/?inquerito=';
  Get_Backoffice_data_and_Inquerito_by_id(id: any) {
    return this.http.get(`${this.dados_agrupados_url}${id}`, /*{ headers: headers }*/).pipe(take(1));
  }

  url_formbackofficebyid = 'https://api.biplan.ao/api/v1/formulariosbackoffice/';
  getFormBackofficeByid(id: any) {
    return this.http.get(`${this.url_formbackofficebyid}${id}`).pipe(take(2));
  }

  url_form_pn_elaborado_byid = 'https://api.biplan.ao/api/v1/pnelaborados/';
  getFormPN_elaborado_Byid(id: any) {
    return this.http.get(`${this.url_form_pn_elaborado_byid}${id}`).pipe(take(1));
  }

  url_form_visitas_byid = 'https://api.biplan.ao/api/v1/registrosdasvisitas/';
  getForm_visitas_Byid(id: any) {
    return this.http.get(`${this.url_form_visitas_byid}${id}`).pipe(take(2));
  }

  url_form_pgas_byid = 'https://api.biplan.ao/api/v1/formulariojanelapgas/';
  getForm_PGAS_Byid(id: any) {
    return this.http.get(`${this.url_form_pgas_byid}${id}`).pipe(take(2));
  }

  // Pegar dados do formulario Pn elaborados junto ao id do inquerito selecionado
  dados_agrupados_url_2 = 'https://api.biplan.ao/api/v1/pnelaborados/?inquerito=';
  Get_PN_elaborados_data_join_to_Inquerito_by_id(id: any) {
    return this.http.get(`${this.dados_agrupados_url_2}${id}` /*{ headers: headers }*/).pipe(take(1));
  }

  // A function to post data in PNelaborados
  pn_elaborado_URL = 'https://api.biplan.ao/api/v1';
  Post_pnElaborados(form_data: any) {
    return this.http.post(this.pn_elaborado_URL + '/pnelaborados/', form_data)
  }

  // A function to get data in PNelaborados
  get_pn_elaborado_URL = 'https://api.biplan.ao/api/v1/pnelaborados/';
  Get_pnElaborados() {
    return this.http.get<any[]>(this.get_pn_elaborado_URL)
  }

  // Method to Delete pn elaborados
  deletePnelaborados(id: any) {
    return this.http.delete(`${this.get_pn_elaborado_URL}${id}/`).pipe(take(1));
  }

  // teste
  url_consulta_mi = 'https://api.biplan.ao/api/v1';
  consultarManifestacaoExistente(manifestacao: any): Observable<any> {
    // const encodedManifestacao = encodeURIComponent(manifestacao);
    const params = new HttpParams().set('manifestacao_de_interesse', manifestacao);
    return this.http.post(this.url_consulta_mi + '/inqueritos/', null, { params });
  }

  // to get all pgas
  get_pgas_url = 'https://api.biplan.ao/api/v1/formulariojanelapgas/';
  Get_Pgas() {
    return this.http.get<any[]>(this.get_pgas_url);
  }

  // To save a PGAS form
  post_pga_url = 'https://api.biplan.ao/api/v1';
  Save_PGAS(pgasData: any) {
    return this.http.post(this.post_pga_url + '/formulariojanelapgas/', pgasData)
  }

  // to Save visitas
  url_visitas = 'https://api.biplan.ao/api/v1';
  Save_Visitas(visitasForm: any) {
    return this.http.post(this.url_visitas + '/registrosdasvisitas/', visitasForm)
  }

  // to get visitas
  url_get_visitas = 'https://api.biplan.ao/api/v1/registrosdasvisitas/'
  Get_visitas() {
    return this.http.get<any[]>(this.url_get_visitas);
  }

  // Get_metas_de_producaode_pn_do_projecto
  url_metas_pn = 'https://api.biplan.ao/api/v1/metasdeproducaodepndoprojecto/';
  Get_metas_de_producaode_pn_do_projecto() {
    return this.http.get<any[]>(this.url_metas_pn);
  }

   // To save a progress metas
   post_progress_PN__url = 'https://api.biplan.ao/api/v1';
   Save_Progress_PN(Data: any) {
     return this.http.post(this.post_pga_url + '/metasdeproducaodepndoprojecto/', Data)
   }

   // To delete a progress metas PN
   delete_progress_PN__url = 'https://api.biplan.ao/api/v1/metasdeproducaodepndoprojecto/';
   Delete_Progress_PN(id: any) {
    return this.http.delete(`${this.delete_progress_PN__url}${id}/`).pipe(take(1));
   }

    // To delete a progress metas PGAS
    delete_progress_PGAS__url = 'https://api.biplan.ao/api/v1/metasdeproducaodepgasdoprojecto/';
    Delete_Progress_PGAS(id: any) {
     return this.http.delete(`${this.delete_progress_PGAS__url}${id}/`).pipe(take(1));
    }


   // Get_metas_de_producao_PGAS
  url_metas_PGAS = 'https://api.biplan.ao/api/v1/metasdeproducaodepgasdoprojecto/';
  Get_metas_de_producao_de_PGAS_do_projecto() {
    return this.http.get<any[]>(this.url_metas_PGAS);
  }

  // To save a progress metas PGAS
  post_progress_PGAS__url = 'https://api.biplan.ao/api/v1';
  Save_Progress_PGAS(Data: any) {
    return this.http.post(this.post_progress_PGAS__url + '/metasdeproducaodepgasdoprojecto/', Data)
  }

  // To get a inquires done
  post_inquires_done__url = 'https://api.biplan.ao/api/v1';
  Send_inqueres_done_date(Data: any) {
    return this.http.post(this.post_inquires_done__url + '/inqueritosfeitosdashboard/', Data)
  }

   // To get PN elaborados
   Post_inquires_done__url = 'https://api.biplan.ao/api/v1';
   Send_PN_elaborados_date(date:any) {
     return this.http.post(this.Post_inquires_done__url + '/pnelaboradosdashboard/', date);
   }

   // To get FTAS elaborados per date 
   Post_ftas_date__url = 'https://api.biplan.ao/api/v1';
   Send_FTAS_date(date:any) {
     return this.http.post(this.Post_ftas_date__url + '/ftaselaboradosdashboard/', date);
   }

   // To get PN by CTI per date 
   Post_pn_by_cti__url = 'https://api.biplan.ao/api/v1';
   Send_PN_by_CTI_date(date:any) {
     return this.http.post(this.Post_pn_by_cti__url + '/pnanalisadospeloctidashboard/', date);
   }

    // To get Desenbolsado per date 
    Post_pn_desenbolsado__url = 'https://api.biplan.ao/api/v1';
    Send_PN_Desenbolsado_date(date:any) {
      return this.http.post(this.Post_pn_desenbolsado__url + '/planodenegociodesembolsadosdashboard/', date);
    }

   // To get tipo de producoes
   get_tipo_de_producoes_url = 'https://api.biplan.ao/api/v1/tipodeproducoesdashboard/';
   Get_tipo_producoes() {
     return this.http.get<any[]>(this.get_tipo_de_producoes_url);
   }

    // To get Distribuição dos PN Desembolsados por Províncias/Municípios-Cumulativo
    get_PN_por_prov_url = 'https://api.biplan.ao/api/v1/pndesembolsadosporprovinciasmunicipiosdashboard/';
    Get_PN_desemb_por_prov() {
      return this.http.get<any[]>(this.get_PN_por_prov_url);
    }

    // To get tipo de PN desembolsado
    get_tipo_de_pn_dese_url = 'https://api.biplan.ao/api/v1/tipopndesembolsadosdashboard/';
    Get_tipo_PN_desenbolsado() {
      return this.http.get<any[]>(this.get_tipo_de_pn_dese_url);
    }

}


