import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { LocalStorageService } from 'angular-web-storage';
import * as echarts from 'echarts';
import { DataService } from 'src/app/services/data.service';
import { Subscription, delay, timer } from 'rxjs';
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

  activeTab = 1;

  showTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

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
    this.Get_metas_de_producaode_pn_do_projecto();
    this.Get_metas_de_producao_de_PGAS_do_projecto();
    this.getInquerito_com_mi_aprovado();
    this.getInquerito_status_mi();

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


    /*/ Status da MI recebidas
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

    option && myChart.setOption(option);*/



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

  // para filtrar os itens do objeto data, onde o status seja verdadeiro e a províncias
  inqueritos_mi_recebidas: any;
  getInquerito_com_mi_aprovado() {
    this.ds.get_InquireForm().subscribe(data => {
      this.inqueritos_mi_recebidas = data.filter((item: any) =>
        item.status &&
        (item.provincia === 'Bié' ||
          item.provincia === 'Huambo' ||
          item.provincia === 'Huila' ||
          item.provincia === 'Cuanza Sul')
      );
      console.log(this.inqueritos_mi_recebidas);
    });
  }

  // Total de cada status em todas as províncias
  getStatusCountByProvincia(status: string, provincia: string): number {
    return this.inqueritos_mi_recebidas.filter((item: any) => item.status === status && item.provincia === provincia).length;
  }


  //statusList é uma matriz que contém todos os possíveis status
  statusList: string[] = ['Aprovado', 'Em Análise', 'Por contactar', 'Incomunicavel: Não atende',
    'Incomunicavel: Nº Tel errado', 'Pendente por falta de documento', 'Recusada por falta de documentação legal',
    'Recusada por falta dos 10%', 'Recusada por dívida', 'Recusada: Actividade inelegível', 'Recusada: proponente desistiu',
    'Recusada: zona inelegível', 'Recusada por falta de área', 'Recusada CV'
  ];

  getTotalByProvincia(provincia: string): number {
    return this.statusList.reduce((total: number, status: string) => {
      total += this.getStatusCountByProvincia(status, provincia);
      return total;
    }, 0);
  }

  // Função para calcular o "Total geral" em todas as províncias
  getTotalGeral(): number {
    const provinces = ['Bié', 'Huambo', 'Huila', 'CuanzaSul'];
    return provinces.reduce((total: number, province: string) => {
      total += this.getTotalByProvincia(province);
      return total;
    }, 0);
  }


  // modificar as classes do elemento <span> com base nos diferentes estados, você pode usar a diretiva ngClass. Vamos criar uma função que receberá o status como argumento e retornará a classe apropriada
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Aprovado':
        return 'badge badge-success rounded-pill d-inline text-black';
      case 'Em Análise':
        return 'badge badge-warning rounded-pill d-inline text-black';
      case 'Por contactar':
        return 'badge badge-primary rounded-pill d-inline text-black';
      default:
        return 'badge badge-danger rounded-pill d-inline text-black';
    }
  }


  // get  metas_de_producaode_pn_do_projecto
  metas_de_producaode_pn_do_projecto: any;
  Get_metas_de_producaode_pn_do_projecto() {
    this.ds.Get_metas_de_producaode_pn_do_projecto().subscribe(data => {
      this.metas_de_producaode_pn_do_projecto = data;
      console.log(data)
    })
  }

  Delete_Progress_PN(id: any) {
    this.ds.Delete_Progress_PN(id).subscribe(
      success => {
        this.metas_de_producaode_pn_do_projecto.push(id);
      },
      error => { }
    )
  }

  // get  metas_de_producaode_PGAS_do_projecto
  metas_de_producaode_PGAS_do_projecto: any;
  Get_metas_de_producao_de_PGAS_do_projecto() {
    this.ds.Get_metas_de_producao_de_PGAS_do_projecto().subscribe(data => {
      this.metas_de_producaode_PGAS_do_projecto = data;
      console.log(data)
    })
  }

  calcularPorcentagem(metas: number, realizado: number): number {
    const porcentagem = Math.min((realizado / metas) * 100, 100);
    return parseFloat(porcentagem.toFixed(1)); // Converte para número com uma casa decimal
  }

  metas?: number;
  realizado?: number;
  ano?: number;

  post_progresso_pn() {

    // Verificar se os campos estão preenchidos corretamente
    if (!this.metas || !this.realizado || !this.ano) {
      alert('Os campos devem ser preenchidos corretamente.');
      return;
    }

    let progress = {
      "metas": this.metas,
      "realizado": this.realizado,
      "ano_numerico": this.ano
    };

    this.ds.Save_Progress_PN(progress).subscribe(
      success => {
        console.log(success);
        // Após o sucesso da requisição, atualize a lista manualmente adicionando o novo progresso
        this.metas_de_producaode_pn_do_projecto.push(progress);


        // Espera uns segundos antes de recarregar a página
        timer(500).pipe(delay(500)).subscribe(() => {
          location.reload();
        });


        this.calcularTotal('metas')
        this.calcularTotal('realizado')

        // Limpe os campos após o sucesso da operação
        this.metas = 0;
        this.realizado = 0;
        this.ano = 0;
      },
      error => {
        console.error(error);
      }
    );
  }

  metas_pgas?: number;
  realizado_pgas?: number;
  ano_pgas?: number;

  post_progresso_PGAS() {

    // Verificar se os campos estão preenchidos corretamente
    if (!this.metas_pgas || !this.realizado_pgas || !this.ano_pgas) {
      alert('Os campos devem ser preenchidos corretamente.');
      return;
    }

    let progress = {
      "metas": this.metas_pgas,
      "realizado": this.realizado_pgas,
      "ano_numerico": this.ano_pgas
    };

    this.ds.Save_Progress_PGAS(progress).subscribe(
      success => {
        console.log(success);
        // Após o sucesso da requisição, atualize a lista manualmente adicionando o novo progresso
        this.metas_de_producaode_PGAS_do_projecto.push(progress);

        // Espera uns segundos antes de recarregar a página
        timer(500).pipe(delay(500)).subscribe(() => {
          location.reload();
        });

        this.calcularTotal('metas')
        this.calcularTotal('realizado')
        // Limpe os campos após o sucesso da operação
        this.metas_pgas = 0;
        this.realizado_pgas = 0;
        this.ano_pgas = 0;
      },
      error => {
        console.error(error);
      }
    );
  }

  totalMetas: number = 0;
  totalRealizado: number = 0;

  // Função para calcular o total das colunas "Metas" e "Realizado" de PN
  calcularTotal(coluna: string): number {

    let total = 0;

    for (let item of this.metas_de_producaode_pn_do_projecto) {
      total += item[coluna];
    }

    if (coluna === 'metas') {
      this.totalMetas = total;
    } else if (coluna === 'realizado') {
      this.totalRealizado = total;
    }

    return total;

  }

  // Função para calcular o total das colunas "Metas" e "Realizado" de PGAS
  calcularTotal_PGAS(coluna: string): number {
    let total = 0;

    for (let item of this.metas_de_producaode_pn_do_projecto) {
      total += item[coluna];
    }

    if (coluna === 'metas') {
      this.totalMetas = total;
    } else if (coluna === 'realizado') {
      this.totalRealizado = total;
    }

    return total;
  }

  // ...

  // Dentro da função getInquerito_com_mi_aprovado():
  getInquerito_status_mi() {
    this.ds.get_InquireForm().subscribe(data => {
      this.inqueritos_mi_recebidas = data.filter((item: any) =>
        item.status &&
        (item.provincia === 'Bié' ||
          item.provincia === 'Huambo' ||
          item.provincia === 'Huila' ||
          item.provincia === 'Cuanza Sul')
      );
      console.log(this.inqueritos_mi_recebidas);

      // Contar a quantidade de cada status na lista
      const statusCount: Record<string, number> = {};
      for (const item of this.inqueritos_mi_recebidas) {
        if (item.status in statusCount) {
          statusCount[item.status]++;
        } else {
          statusCount[item.status] = 1;
        }
      }

      // Formatar os dados para o gráfico
      const chartData = [];
      for (const status of Object.keys(statusCount)) {
        chartData.push({ value: statusCount[status], name: status });
      }

      // Atualizar o gráfico com os dados formatados
      const chartDom = document.getElementById('getStatusMI') as HTMLElement;
      const myChart = echarts.init(chartDom);
      const option: echarts.EChartsOption = {
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
            data: chartData, // Usando os dados formatados aqui
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
    });
  }




}


