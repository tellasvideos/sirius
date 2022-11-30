import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

import * as echarts from 'echarts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  logoOn: any;

  sideBarOpen = true;

  constructor(public img: HeaderComponent) { }

  ngOnInit(): void {
    //this.logoOn === this.img.hideImg();

    type EChartsOption = echarts.EChartsOption;

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
    var option2: EChartsOption;

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
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }



}
