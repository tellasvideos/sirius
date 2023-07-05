import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { LocalStorageService } from 'angular-web-storage';
import * as echarts from 'echarts';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { EchartService } from 'src/app/services/echart.service';
import { BasicEchartLineModel } from 'src/app/models/echart.models';
import { EChartsOption } from 'echarts';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';


interface User {
  name: string;
  email: string;
  username: string;
  department: string;
}

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


  keyWord: string = '';

  user: any;
  i: any;
  token: any;
  logoOn: any;
  inqueritos: any;
  prop: any;
  interestExpress: any;
  departamento: any;
  cadeia: any;
  sideBarOpen = true;

  filteredUsers: any;
  //isAdmin = true;

  @Input()
  usuario: any;

  constructor(
    public img: HeaderComponent,
    private ds: DataService,
    private echartService: EchartService,
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private userService: DataService
  ) {


  }

  _cadeiaValorChart(chartData: any[]) {

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
          name: 'Interesse na produção',
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
          data: chartData.map(m => ({
            value: m.value,
            name: m.name
          })),
        }
      ]
    };

    _chartOption_CadeiaValor_por_mes && Chart.setOption(_chartOption_CadeiaValor_por_mes);

  }

  _inqueritosChart(chartData: BasicEchartLineModel[]) {

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
        },
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

    // Pegar dados do user logado
    this.userService.getUserData().subscribe((data: any) => {
      this.user = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user)
    });


    // Subscribe chart for VAlue chain from interestExpression
    this.subscripition = this.echartService.get_CadeiaValor_EchartData().subscribe(data => {
      this._cadeiaValorChart(data);
      //console.log('value chain from interest', data)

    });

    // Subscribe chart for inqueritos
    this.subscripition = this.echartService.get_Inquerito_EchartData().subscribe(data => {
      this._inqueritosChart(data);
    });

    // subscribe Chart for interesses
    this.subscripition = this.echartService.get_Interesses_EchartData().subscribe(data => {
      this._interessesChart(data);
      //console.log('interesses chart por mes:', data)
    });

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


    // Status da MI recebidas
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('getStatusMI')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      title: {
        text: 'Status das MI recebidas',
        subtext: 'Período',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Por Contactar' },
            { value: 735, name: 'Inquérito em Elaboração' },
            { value: 580, name: 'Incomunicavel: não atende' },
            { value: 484, name: 'Por visitar' },
            { value: 300, name: 'Didas teste' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);



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
