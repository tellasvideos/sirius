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

i:any;

  logoOn: any;
  prop: any;
  sideBarOpen = true;

  constructor(public img: HeaderComponent, private ds: DataService) { }

  ngOnInit(): void {
    
    //this.logoOn === this.img.hideImg();
    this.proponentes()
    for ( this.prop = 0; this.prop < this.prop.length; this.prop++) {
      this.prop[0] *= 2;
      if(this.prop[0] == 2)
        this.prop++;
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

  getcadeia(){
    
  }


}
