import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

import * as echarts from 'echarts';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  i: any;

  logoOn: any;
  inqueritos: any;
  prop: any;
  interestExpress: any;
  departamento: any;
  cadeia: any;
  sideBarOpen = true;

  constructor(public img: HeaderComponent, private ds: DataService) { }

  ngOnInit(): void {
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

    type EChartsOption = echarts.EChartsOption;
    type EChartsOption2 = echarts.EChartsOption;
    type EChartsOption3 = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '-2%',
        left: 'center'
      },
      series: [
        {
          name: 'Dados',
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
          ]
        }
      ]
    };

    option && myChart.setOption(option);


    // segundo Gráfico
    var chartDom2 = document.getElementById('main2')!;
    var myChart2 = echarts.init(chartDom2);
    var option2: EChartsOption2;

    option2 = {
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [1, 2, 1, 4, 4, 5, 3, 4],
          type: 'line'
        }
      ]
    };

    option2 && myChart2.setOption(option2);


    // Terceiro gráico
    var chartDom3 = document.getElementById('main3')!;
    var myChart3 = echarts.init(chartDom3);
    var option3: EChartsOption3;

    option3 = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };


    option3 && myChart3.setOption(option3);




  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  proponentes() {
    this.ds.proponentPDAC().subscribe(data => {
      this.prop = data;
      console.log(data)
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
