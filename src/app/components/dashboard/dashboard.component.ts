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


  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }



}
