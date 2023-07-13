import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-pgas',
  templateUrl: './pgas.component.html',
  styleUrls: ['./pgas.component.scss']
})
export class PgasComponent implements OnInit {

  // oculta os dias depois do dia de hoje
  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  keyWord: string = '';

  sideBarOpen = true;
  inqueritos: any[] = [];
  user_logged: any;

  angForm!: FormGroup;

  _touched: boolean = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,

  ) {

    this.angForm = this.fb.group({
      // nome_simplificado: [null, Validators.required], // Nome simplificado
      consultor_pgas: [null], // Consultor pgas
      data_inicio_elaboracao_pgas: ['', Validators.required], // Data inicio elaboracao pgas
      data_fim_elaboracao_pgas: [''], // Data fim elaboracao pgas
      data_aprovacao_pgas_banco_mundial: [''], // Data aprovacao pgas banco mundial
      elaboracao_ogas_pendente: [false], // Elaboracao ogas pendente
      justificacao_pgas_pendente: [null, Validators.required], // Justificacao pgas pendente
      latitude: ['', Validators.required],
      logitude: ['', Validators.required],
      //created_at: [''], // Created at
      inquerito: [null], // Referência ao inquérito (pode ser um objeto ou apenas o ID, dependendo da implementação)
      status_pgas: ['']
    });

  }


  ngOnInit(): void {
    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    /* // leva os dados do pnelaborados ao form pgas
     this.route.queryParams.subscribe(params => {
       this.pnElaborados = params;
     });*/

    // leva os dados do inquerito ao form pgas
    this.route.queryParams.subscribe(params => {
      this.inqueritoSelecionado = params;
      console.log(params)
    });

    //inqueritoSelecionado

    /*// leva os dados do backoffice para o  form pgas
    this.route.queryParams.subscribe(params => {
      this.mappedFormBackoffice = params;
    });*/

    this.getInqueritos()
    this.get_farm_names()
    this.getUserSalvaguarde()
    this.get_pnElaborados()
    this.get_form_backoffice____()
    this.get_pgas();
    this.getMunicipio();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  // levar dados do inquerito selecionado para o formulario pgas
  nome_simplificado_finded: any;
  inqueritoSelecionado: any | null = null;
  selecionarInquerito(item: any) {
    this.inqueritoSelecionado = item;
    console.log('id inq selected', item)
    // com base no id do inquerito local, encontra o item completo do inquerito e me devolve o seu nome_simplificado
    this.nome_simplificado_finded = this.inqueritos.find((inquerito: any) => inquerito.id === this.inqueritoSelecionado);

    if (this.nome_simplificado_finded) {
      console.log('Inquérito encontrado:', this.nome_simplificado_finded);
    } else {
      console.log('Inquérito não encontrado na lista.');
    }
    console.log('Inquérito encontrado NS:', this.nome_simplificado_finded.nome_simplificado)
    return this.nome_simplificado_finded ? this.nome_simplificado_finded.nome_simplificado : 'N/D';
  }

  pnElaborados: any;
  get_pnElaborados() {
    this.dataService.Get_pnElaborados().subscribe(data => {
      this.pnElaborados = data;
      console.log('Planos elaborados', this.pnElaborados)
      this.pnElaborados.reverse();
    })
  }

  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      this.inqueritos.reverse()
      console.log('inqueritos', this.inqueritos);
    });
  }

  // obter o nome da fazenda (nome_simplificado) da janela back off
  nomesSimplificados: any;
  get_farm_names() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data;
      this.nomesSimplificados = data.map(item => item.nome_simplificado);
      console.log('farm_names ou nomes simplificados: ', this.nomesSimplificados);
    });
  }

  mappedFormBackoffice: any;
  formBackoffice: any;
  get_form_backoffice____() {
    this.dataService.Get_Backoffice_Form().subscribe(data => {
      this.formBackoffice = data;
      this.formBackoffice.reverse()

      // Filtrar os dados com base no ID do inquérito
      const filteredFormBackoffice = this.formBackoffice.filter((item: any) => {
        this.inqueritos.reverse()
        return this.inqueritos.some(inquerito => inquerito.id === item.inquerito);
      });

      // Mapear os dados filtrados para conter apenas "status_pn" e "data_pn_entregue_ao_pdac"
      this.mappedFormBackoffice = filteredFormBackoffice.map((item: any) => {
        return {
          status_pn: item.status_pn,
          data_pn_entregue_ao_pdac: item.data_pn_entregue_ao_pdac,
          financiamento_bancario: item.financiamento_bancario,
          inquerito: item.inquerito,
        };
      }).reverse();

      console.log('dados mapeados: ', this.mappedFormBackoffice);
    });

  }


  // filtrar usuarios do departamento Salvaguarde
  userSalvaGuarde: any;
  getUserSalvaguarde() {
    this.dataService.getUser().subscribe(data => {
      this.userSalvaGuarde = data.filter(user => user.department === 'Salvaguarde');
      console.log('users do Salvaguarde: ', data)
    })
  }

  checkDates1() {
    const DataInicioPGAS = this.angForm.get('data_inicio_elaboracao_pgas')?.value;
    const DataFimPGAS = this.angForm.get('data_fim_elaboracao_pgas')?.value;

    if (DataFimPGAS >= DataInicioPGAS) {
    } else {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A Data fim elaboração PGAS" não pode ser anterior à "Data inicio elaboração PGAS".',
      })
      this.angForm.get('data_fim_elaboracao_pgas')?.setValue('');
    }
  }

  checkDates2() {
    const DataPGA_BancoMundial = this.angForm.get('data_aprovacao_pgas_banco_mundial')?.value;
    const DataFimPGAS = this.angForm.get('data_fim_elaboracao_pgas')?.value;

    if (DataFimPGAS <= DataPGA_BancoMundial) {
    } else {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'Data de aprovação do PGAS pelo Banco Mundial" não pode ser anterior à "Data fim de elaboração do PGAS".',
      })
      this.angForm.get('data_aprovacao_pgas_banco_mundial')?.setValue('');
    }
  }

  checkOption?: boolean;
  OnElaboracao_ogas_pendente() {
    this.checkOption = this.angForm.get('elaboracao_ogas_pendente')?.value;
  }

  // estados pgas
  getEstadosPGAs() {

    const PGA_a_ser_elaborado = this.formBackoffice[0].status_pn === 'PN em Analise UIP PDAC' && this.angForm.get('data_inicio_elaboracao_pgas')?.value === '';
    const PGA_em_elaboracao = this.angForm.get('data_inicio_elaboracao_pgas')?.value !== '';
    const PGA_Revisao_ou_Analise_PDA_BM = this.angForm.get('data_fim_elaboracao_pgas')?.value !== '';
    const PGA_Aprovada_BM = this.angForm.get('data_aprovacao_pgas_banco_mundial')?.value !== '';
    const PGAS_em_Impleme = this.angForm.get('data_aprovacao_pgas_banco_mundial')?.value !== '' && this.formBackoffice[0].status_pn === 'PN em Analise UIP PDAC';

    if (PGA_a_ser_elaborado) {
      return 'PGAS a ser elaborado';
    } else if (PGA_em_elaboracao) {
      return 'PGAS em elaboração';
    } else if (PGA_Revisao_ou_Analise_PDA_BM) {
      return 'PGAS em revisão ou analise pelo PDAC/BM';
    } else if (PGA_Aprovada_BM) {
      return 'PGAS aprovado pelo BM';
    } else if (PGAS_em_Impleme) {
      return 'PGAS em implementação'
    } else {
      return 'N/D'
    }

  }

  // to get Pgas
  pgas: any;
  get_pgas() {
    this.dataService.Get_Pgas().subscribe(data => {
      this.pgas = data;
      this.pgas.reverse()
      console.log('Pgas form', this.pgas)
    })
  }

  getFormPGAsData_(inqueritoId: string): any {
    console.log(inqueritoId)
    return this.pgas.find((item: any) => item.inquerito === inqueritoId);
  }

  getFormPGAsData(inqueritoId: any): string {
    const pga = this.pgas.find((item: any) => item.inquerito === inqueritoId);
    console.log('pgas', this.pgas)
    console.log('pga const', pga)
    console.log('id inq', inqueritoId)
    return pga ? pga.status_pgas : 'N/D';
  }


  enviarFormulario() {

    const formData = new FormData();
    formData.append('consultor_pgas', this.angForm.value.consultor_pgas);
    formData.append('data_inicio_elaboracao_pgas', this.angForm.value.data_inicio_elaboracao_pgas);
    formData.append('data_fim_elaboracao_pgas', this.angForm.value.data_fim_elaboracao_pgas);
    formData.append('data_aprovacao_pgas_banco_mundial', this.angForm.value.data_aprovacao_pgas_banco_mundial);
    formData.append('elaboracao_ogas_pendente', this.angForm.value.elaboracao_ogas_pendente);
    formData.append('justificacao_pgas_pendente', this.angForm.value.justificacao_pgas_pendente);
    formData.append('latitude', this.angForm.value.latitude);
    formData.append('longitude', this.angForm.value.longitude);
    formData.append('inquerito', this.inqueritoSelecionado);
    formData.append('nome_simplificado', this.nome_simplificado_finded?.nome_simplificado);
    formData.append('status_pgas', this.getEstadosPGAs());

    // Success callback 1 nome_simplificado_finded?.nome_simplificado
    const successCallback = (response: any) => {
      console.log('Formulário enviado com sucesso!', response);
      this.alert_success();
      const modal = document.getElementById('exampleModalToggle');
      if (modal) {
        modal.style.display = 'none';
      }
      timer(2000).pipe(delay(2000)).subscribe(() => {
        location.reload();
      });
    };

    // Success calback 2
    const successCallback2 = (response: any) => {
      console.log('Formulário enviado com sucesso PGAS em Implementação!', response);
      Swal.fire({
        icon: "success",
        title: "PGAS em implementação",
        showConfirmButton: false,
        timer: 1800
      });
      // close modal
      const modal = document.getElementById('exampleModalToggle');
      if (modal) {
        modal.style.display = 'none';
      }
      // Executar o timer somente após a resposta da API ser recebida
      timer(2000).pipe(delay(2000)).subscribe(() => {
        location.reload();
      });
    };

    // Error callback
    const errorCallback = (error: any) => {
      console.error('Erro ao enviar o formulário:', error);
      this.alert_error()
    };

    const statusPGas = this.getEstadosPGAs();

    if (statusPGas === 'PGAS em implementação') {
      this.dataService.Save_PGAS(formData).subscribe(successCallback2, errorCallback);
      //this.router.navigate(['pn-implementados']);
      // Remover o item selecionado da lista inicial
      alert('pgas em implementacao')

    } else {
      this.dataService.Save_PGAS(formData).subscribe(successCallback, errorCallback);
    }

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

  alert_success() {
    Swal.fire({
      icon: "success",
      title: "Salvo",
      showConfirmButton: false,
      timer: 1500
    })
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }

}
