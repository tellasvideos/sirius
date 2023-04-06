import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicEchartLineModel } from '../models/echart.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EchartService {

  constructor(private httpClient: HttpClient) { }


  getBasicLineEchartData(): Observable<BasicEchartLineModel[]> {
    return this.httpClient.get<BasicEchartLineModel[]>('assets/echart/chartData1.json');
  }

  // to get Chart data to Inquire
  get_Inquerito_EchartData(): Observable<BasicEchartLineModel[]> {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.httpClient.get<BasicEchartLineModel[]>('http://strongboxao.ddns.net:8001/api/v1/getinquirerformsnumberpermonth/', /*{ headers: headers }*/);
  }

  // to get chart data to Interst expressionn
  get_Interesses_EchartData(): Observable<BasicEchartLineModel[]> {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.httpClient.get<BasicEchartLineModel[]>('http://strongboxao.ddns.net:8001/api/v1/getinterestexpressionsnumberpermonth/', /*{ headers: headers }*/);
  }

  // to get Chart data to Value chain
  get_CadeiaValor_EchartData(): Observable<BasicEchartLineModel[]> {
    /*var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Token ' + String(localStorage.getItem('userToken')));*/
    return this.httpClient.get<BasicEchartLineModel[]>('http://strongboxao.ddns.net:8001/api/v1/getvaluechainfrominterestexpressions/', /*{ headers: headers }*/);
  }


}
