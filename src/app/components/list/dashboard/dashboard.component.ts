import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';


import * as echarts from 'echarts';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { EchartService } from 'src/app/services/echart.service';
import { BasicEchartLineModel } from 'src/app/models/echart.models';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  subscripition?: Subscription;
  _chartOption_Inqueritos_por_mes?: EChartsOption;
  _chartOption_Interesses_por_mes?: EChartsOption;
  _chartOption_CadeiaValor_por_mes?: EChartsOption;

  i: any;

  logoOn: any;
  inqueritos: any;
  prop: any;
  interestExpress: any;
  departamento: any;
  cadeia: any;
  sideBarOpen = true;

  //isAdmin = true;

  @Input()
  usuario: any;

  constructor(public img: HeaderComponent, private ds: DataService, private echartService: EchartService) {
  }

  _cadeiaValorChart() {

    var chartDom = document.getElementById('cadeiaValorChart')!;
    var Chart = echarts.init(chartDom);
    var _chartOption_CadeiaValor_por_mes: EChartsOption;

    _chartOption_CadeiaValor_por_mes = {
      tooltip: {
        trigger: 'item'
      },
      /*legend: {
        bottom: '-2%',
        left: 'center'
      },*/
      series: [
        {
          name: 'Produção',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: '12',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Arroz' },
            { value: 735, name: 'Milho' },
            { value: 580, name: 'Feijão' },
            { value: 484, name: 'Ovos' },
            { value: 884, name: 'gimguba' },
            { value: 184, name: 'ervilha' },
            { value: 1084, name: 'cebola' },
            { value: 184, name: 'tomate' },
            { value: 424, name: 'couves' },
            { value: 494, name: 'laranja' },
            { value: 684, name: 'limao' },
            { value: 784, name: 'Café' },
          ]
        }
      ]
    };

    _chartOption_CadeiaValor_por_mes && Chart.setOption(_chartOption_CadeiaValor_por_mes);

  }

  _inqueritosChart(chartData: BasicEchartLineModel[]) {

    /*let numberString = '10,000';

let numberArray = numberString.split(',');

let result = numberArray.join(''); */

    var chartDom = document.getElementById('inqueritosChart')!;
    var testChart = echarts.init(chartDom);
    var _chartOption_Inqueritos_por_mes: EChartsOption;

    _chartOption_Inqueritos_por_mes = {
      tooltip: {
        show: true
      },
      xAxis: {
        type: 'category',
        data: chartData.map(m => ({
          value: m.name
        }))
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Inqueritos',
          data: chartData.map(m => ({
            value: m.value
          })),
          type: 'line'
        }
      ]
    }
    _chartOption_Inqueritos_por_mes && testChart.setOption(_chartOption_Inqueritos_por_mes);

  }

  _interessesChart(chartData: BasicEchartLineModel[]) {

    var chartDom = document.getElementById('interessesChart')!;
    var Chart = echarts.init(chartDom);
    var _chartOption_Interesses_por_mes: EChartsOption;

    _chartOption_Interesses_por_mes = {
      tooltip: {
        show: true
      },
      xAxis: {
       // name: 'Mês/ano',
        type: 'category',
        data: chartData.map(m => ({
          value: m.name
        }))
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Interesses',
        data: chartData.map(m => ({
          value: m.value
        })),
        type: 'bar'
      }]
    }
    _chartOption_Interesses_por_mes && Chart.setOption(_chartOption_Interesses_por_mes);

  }


  ngOnInit(): void {

    this._cadeiaValorChart();

    // Subscribe chart for inqueritos
    this.subscripition = this.echartService.get_Inquerito_EchartData().subscribe(data => {
      this._inqueritosChart(data);

     /* let numberArray = data[0].year.split(',');
      let result = numberArray.join('');
      console.log('virgula eliminada: ', result);*/
      console.log('inqueritos chart por mes:', data)
    });

    // subscribe Chart for interesses
    this.subscripition = this.echartService.get_Interesses_EchartData().subscribe(data => {
      this._interessesChart(data);
      console.log('interesses chart por mes:', data)
    });

    //this.isAdmin()
    this.getDeparet();
    this.getInquerito();
    this.getcadeia();
    this.getManInterest();
    this.proponentes();

    // loop para contar e atualizar props in real time
    for (this.prop = 0; this.prop < this.prop.length; this.prop++) {
      this.prop[0] *= 2;
      if (this.prop[0] == 2)
        this.prop++;
    }

    // loop para contar e atualizar interesses in real time
    for (this.interestExpress = 0; this.interestExpress < this.interestExpress.length; this.interestExpress++) {
      this.interestExpress[0] *= 2;
      if (this.interestExpress[0] == 2)
        this.interestExpress++;
    }

    // loop para contar e atualizar inqueritos in real time
    for (this.inqueritos = 0; this.inqueritos < this.inqueritos.length; this.inqueritos++) {
      this.inqueritos[0] *= 2;
      if (this.inqueritos[0] == 2)
        this.inqueritos++;
    }

    // loop para contar e atualizar departamento in real time
    for (this.departamento = 0; this.departamento < this.departamento.length; this.departamento++) {
      this.departamento[0] *= 2;
      if (this.departamento[0] == 2)
        this.departamento++;
    }

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  proponentes() {
    this.ds.proponentPDAC().subscribe(data => {
      this.prop = data;
      ////console.log(data)
    })
  }

  getcadeia() {
    this.ds.getValueChains().subscribe(data => {
      this.cadeia = data;
    })
  }

  getManInterest() {
    this.ds.getInterestExpress().subscribe(data => {
      this.interestExpress = data;
    })
  }

  getDeparet() {
    this.ds.get_Departaments().subscribe(data => {
      this.departamento = data;
    })
  }

  getInquerito() {
    this.ds.get_InquireForm().subscribe(data => {
      this.inqueritos = data;
    })
  }


}
