import { HttpClient } from '@angular/common/http';
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

  getBasicAreaEchartData(): Observable<BasicEchartLineModel[]> {
    return this.httpClient.get<BasicEchartLineModel[]>('assets/echart/chartData1.json');
  }

}
