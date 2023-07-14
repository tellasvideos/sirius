import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pn-implementados',
  templateUrl: './pn-implementados.component.html',
  styleUrls: ['./pn-implementados.component.scss']
})
export class PnImplementadosComponent implements OnInit {
  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  keyWord: string = '';
  sideBarOpen = true;

  user_logged: any;

  angForm!: FormGroup;

  inqueritos: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    this.getInqueritos()
    this.get_pnElaborados();
    this.get_form_backoffice____();
    this.getMunicipio();
    this.getPdac();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      console.log('inqueritos reverse', this.inqueritos);
    });
  }

  

  pnElaborados: any;
  get_pnElaborados() {
    this.dataService.Get_pnElaborados().subscribe(data => {
      this.pnElaborados = data;
      console.log('Planos elaborados', this.pnElaborados)
      this.pnElaborados.reverse();
    })
  }

  pn_implementado: any;


  mappedFormBackoffice: any;
  formBackoffice: any;
  get_form_backoffice____() {
    this.dataService.Get_Backoffice_Form().subscribe(data => {
      this.formBackoffice = data;
      this.formBackoffice.sort((a: any, b: any) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });

      // Filtrar os dados com base no ID do inquérito
      const filteredFormBackoffice = this.formBackoffice.filter((item: any) => {
        this.inqueritos.sort((a: any, b: any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
        return this.inqueritos.some((inquerito: any) => inquerito.id === item.inquerito);
      });

      // Mapear os dados filtrados para conter apenas "status_pn" e "data_pn_entregue_ao_pdac"
      this.mappedFormBackoffice = filteredFormBackoffice.map((item: any) => {
        return {
          status_pn: item.status_pn,
          data_pn_entregue_ao_pdac: item.data_pn_entregue_ao_pdac,
          financiamento_bancario: item.financiamento_bancario,
          inquerito: item.inquerito,
        };
      });

      console.log('dados mapeados: ', this.mappedFormBackoffice);
    });

  }

  getFormPN_elaborado_Data(inqueritoId: string): any {
    console.log(inqueritoId)
    return this.pnElaborados.find((item: any) => item.inquerito === inqueritoId);

  }

  municipio: any;
  retorno: any;
  devolver_nome_municipio(id: any) {
    this.retorno = this.municipio.filter((emp: any) => emp.id === id)[0].name
    return this.retorno
  }

  getMunicipio() {
    this.dataService.getMunicipio().subscribe(data => {
      this.municipio = data;
    })
  }


  pdac: any;
  getPdac() {
    this.dataService.proponentPDAC().subscribe(data => {
      this.pdac = data;
    });
  }

  //s2gp/objetivo1/objetivo2

  getActividadeManifestacao(manifestacao_de_interesse: any): string {
    const manifestacao = this.pdac.find((item: any) => item['s2gp/s2g1q1/prop_nome'] === manifestacao_de_interesse);
    return manifestacao ? manifestacao['s2gp/objetivo1/objetivo2'] : 'N/D';
  }


  getTelefoneManifestacao(manifestacao_de_interesse: any): string {
    const manifestacao = this.pdac.find((item: any) => item['s2gp/s2g1q1/prop_nome'] === manifestacao_de_interesse);
    return manifestacao ? manifestacao['s2gp/s2g2/rep_telemovel'] : 'N/D';
  }

}