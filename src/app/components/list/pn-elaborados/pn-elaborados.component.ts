import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AddDepartamentoComponent } from '../../inserts/add-departamento/add-departamento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-pn-elaborados',
  templateUrl: './pn-elaborados.component.html',
  styleUrls: ['./pn-elaborados.component.scss']
})
export class PnElaboradosComponent implements OnInit {

  // oculta os dias depois do dia de hoje
  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  keyWord: string = '';
  departamento: any;
  depart: any;
  sideBarOpen = true;

  user_logged: any;

  angForm!: FormGroup;

  modalRef: MdbModalRef<AddDepartamentoComponent> | null = null;
  id: any;

  segundaTexto?: string;
  primeiraSelecao?: boolean;

  mostrarSegundoCampo?: boolean;

  onPrimeiraSelecaoChange() {
    this.mostrarSegundoCampo = this.angForm.get('recusado_pelo_cti')?.value;
  }

  onPendenteNoBanco() {
    this.mostrarSegundoCampo = this.angForm.get('pn_pendente_no_banco')?.value;
  }

  // DAdos do form
  /*data_analise_cti: any;
  recusado_pelo_cti?: boolean;
  justificacao_recusado_pelo_cti: any;
  data_aprovacao_financiamento_mg: any;
  data_aprovacao_financiamento_banco: any;
  pn_pendente_no_banco?: boolean;
  justificacao_pn_pendente_no_banco: any;
  data_primeiro_pedido_reembolso: any;*/

  _touched: boolean = false;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    this.angForm = this.fb.group({
      data_analise_cti: [''],
      recusado_pelo_cti: [false],
      justificacao_recusado_pelo_cti: ['', Validators.required],
      data_aprovacao_financiamento_mg: [''],
      data_aprovacao_financiamento_banco: [''],
      data_aprovacao_pgas_bm: [''],
      pn_pendente_no_banco: [false],
      justificacao_pn_pendente_no_banco: ['', Validators.required],
      data_primeiro_pedido_reembolso: [''],
      created_at: ['']
    })
  }

  // inqueritoSelecionado: any;
  remove?: boolean;

  ngOnInit(): void {

    this.get_pn_elaborados()
    // leva os dados do inquerito para o backoffice form
    this.route.queryParams.subscribe(params => {
      this.inqueritoSelecionado = params;
    });


    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    /*/ leva os dados do backoffice para o pnelaborados form
    this.route.queryParams.subscribe(params => {
      this.mappedFormBackoffice = params;
    });*/

    this.getInqueritos();
    this.get_form_backoffice____();
    this.getMunicipio();
    this.get_pgas();

  }

  /* selecionarInquerito(item: any) {
     this.inqueritoSelecionado = item;
     console.log(' to get inquerito selected', this.inqueritoSelecionado?.id)
   }*/


  alert_success() {
    Swal.fire({
      icon: "success",
      title: "Salvo",
      showConfirmButton: false,
      timer: 1500
    })
  }

  selectedFinanciamentoBancario: any | number;
  mostrarFinanciamento(inqueritoId: string) {
    this.selectedFinanciamentoBancario = this.getFormBackofficeData(inqueritoId);
    if (this.selectedFinanciamentoBancario) {
      console.log(this.selectedFinanciamentoBancario?.financiamento_bancario);
    }
  }

  selected_data_aprovacao_pgas_BM: any;
  mostrar_Data_aprovada_pgas_BM(inqueritoId: string) {
    this.selected_data_aprovacao_pgas_BM = this.get_Form_PGAS_Data(inqueritoId);
    if (this.selected_data_aprovacao_pgas_BM) {
      console.log(this.selected_data_aprovacao_pgas_BM?.data_aprovacao_pgas_banco_mundial);
    }
  }


  // Estados PN (Part. 2)
  getStatus_pn() {

    this.selectedFinanciamentoBancario?.financiamento_bancario // inicialização 
    console.log('Financiamento bancario:', this.selectedFinanciamentoBancario?.financiamento_bancario)

    // PN pendente no CTI
    const PN_pendente_no_CTI =
      this.angForm.get('recusado_pelo_cti')?.value === true;

    // PN aprovado pelo CTI, em análise MG  
    const PN_aprovado_pelo_CTI_em_análise_MG =
      this.angForm.get('data_analise_cti')?.value !== '' &&
      this.angForm.get('recusado_pelo_cti')?.value === false

    // PN aprovado pelo CTI, MG aprovado, em análise BC
    const PN_aprovado_pelo_CTI_MG_aprovado_em_analise_BC =
      this.angForm.get('data_analise_cti')?.value !== '' &&
      !this.angForm.get('recusado_pelo_cti')?.value &&
      this.angForm.get('data_aprovacao_financiamento_mg')?.value !== '' &&
      Number(this.selectedFinanciamentoBancario?.financiamento_bancario || 0) > 0;

    // Pendente no Banco
    const pnPendenteBanco = this.angForm.get('pn_pendente_no_banco')?.value === true;

    // Financiamento Aprovado
    const dataAprovacaoFinancMg = this.angForm.get('data_aprovacao_financiamento_mg')?.value !== '';
    const dataAprovacaoFinancBanco = this.angForm.get('data_aprovacao_financiamento_banco')?.value !== '';

    // PN implementado
    const data1PedidoDesembolso = this.angForm.get('data_primeiro_pedido_reembolso')?.value !== '';
    const dataAprovacaoPgasBm = this.angForm.get('data_aprovacao_pgas_bm')?.value !== '';

    const Data_Aprovacao_do_PGAS_pelo_BM = this.selected_data_aprovacao_pgas_BM?.data_aprovacao_pgas_banco_mundial !== ''; // vindo do PGAS atravez do id correspondente

    if (PN_pendente_no_CTI) {
      return 'PN pendente no CTI';
    } else if (pnPendenteBanco) {
      return 'PN pendente no banco';
    } else if (data1PedidoDesembolso && Data_Aprovacao_do_PGAS_pelo_BM) {
      return 'PN implementado';
    } else if (PN_aprovado_pelo_CTI_em_análise_MG) {
      return 'PN aprovado pelo CTI, em análise MG';
    } else if (PN_aprovado_pelo_CTI_MG_aprovado_em_analise_BC) {
      return 'PN aprovado pelo CTI, MG aprovado, em análise BC';
    } else if ((dataAprovacaoFinancMg && this.selectedFinanciamentoBancario?.financiamento_bancario === 0) || (dataAprovacaoFinancMg && dataAprovacaoFinancBanco)) {
      return 'Financiamento aprovado';
    } else {
      return 'N/D';
    }
  }


  enviarFormulario() {

    const formData = new FormData();
    formData.append('recusado_pelo_cti', this.angForm.value.recusado_pelo_cti);
    formData.append('justificacao_recusado_pelo_cti', this.angForm.value.justificacao_recusado_pelo_cti);
    formData.append('data_aprovacao_financiamento_mg', this.angForm.value.data_aprovacao_financiamento_mg);
    formData.append('data_aprovacao_financiamento_banco', this.angForm.value.data_aprovacao_financiamento_banco);
    formData.append('pn_pendente_no_banco', this.angForm.value.pn_pendente_no_banco || false);
    formData.append('justificacao_pn_pendente_no_banco', this.angForm.value.justificacao_pn_pendente_no_banco);
    formData.append('data_primeiro_pedido_reembolso', this.angForm.value.data_primeiro_pedido_reembolso);
    formData.append('inquerito', this.inqueritoSelecionado);
    formData.append('data_aprovacao_pgas_bm', this.angForm.value.data_aprovacao_pgas_bm)
    formData.append('status_pn', this.getStatus_pn());

    // Success callback 1
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
      console.log('Formulário enviado com sucesso PN implementado!', response);
      Swal.fire({
        icon: "success",
        title: "PN Implementado",
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

    const statusPN = this.getStatus_pn();

    if (statusPN === 'PN implementado') {
      this.dataService.Post_pnElaborados(formData).subscribe(/*successCallback2, errorCallback*/);
      //this.router.navigate(['pn-implementados']);
      // Remover o item selecionado da lista inicial

    } else {
      this.dataService.Post_pnElaborados(formData).subscribe(/*successCallback, errorCallback*/);
    }


  }


  get_pn: any;
  get_pn_elaborados() {
    this.dataService.Get_pnElaborados().subscribe(data => {
      this.get_pn = data.reverse();
      console.log('pn elab', this.get_pn)
    })
  }

  // recebe como parametro o id do inquerito e devolve dados aonde o idnquerito é igual a FK inquerito na tabela formpnelaborados
  pn_entrados: any;
  getFormPN_Data_entradas(inqueritoId: any) {
    this.pn_entrados = this.get_pn.find((item: any) => item.inquerito === inqueritoId);
    console.log('pgas', this.pn_entrados)
    return this.pn_entrados ? this.pn_entrados : 'N/D';
  }

  // levar dados do inquerito selecionado para o formulario pnelaborado
  nome_simplificado_finded: any;
  inqueritoSelecionado: any | null = null;
  selecionarInquerito(item: any) {
    this.inqueritoSelecionado = item;
    console.log('id inq selected', item)
    // com base no id do inquerito local, encontra o item completo do inquerito e me devolve o seu nome_simplificado
    return this.nome_simplificado_finded = this.inqueritos.find((inquerito: any) => inquerito.id === item);
  }

  delete_pn(id: any) {
    this.dataService.deletePnelaborados(id).subscribe()
    this.get_pn_elaborados()
  }



  checkDates() {
    const pnEntregueDate = this.selectedFinanciamentoBancario?.data_pn_entregue_ao_pdac;
    const DataAnaliseCti = this.angForm.get('data_analise_cti')?.value;
    const DataAprovFinancBanco = this.angForm.get('data_aprovacao_financiamento_banco')?.value;
    const today = new Date();

    if (DataAprovFinancBanco < DataAnaliseCti) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A Data de aprovação de financiamento no banco" não pode ser anterior à "Data de análise ao CTI".',
      })
    }

  }

  checkDates2() {
    const DataAnaliseCti = this.angForm.get('data_analise_cti')?.value;
    const DAtaAprovFinancMG = this.angForm.get('data_aprovacao_financiamento_mg')?.value;

    if (DAtaAprovFinancMG < DataAnaliseCti) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A Data de aprovação de financiamento MG" não pode ser anterior à "Data de análise ao CTI".',
      })
    }
  }

  checkDates3() {
    const DataAprovFinancBanco = this.angForm.get('data_aprovacao_financiamento_banco')?.value;
    const DAtaAprovFinancMG = this.angForm.get('data_aprovacao_financiamento_mg')?.value;
    const Data_1_pedido_de_desenbolso = this.angForm.get('data_primeiro_pedido_reembolso')?.value;

    if (Data_1_pedido_de_desenbolso < DAtaAprovFinancMG || Data_1_pedido_de_desenbolso < DataAprovFinancBanco) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: '"A Data de implementação" não pode ser anterior à "Data de aprovação do financiamento ao MG ou Banco".',
      })
    }
  }


  // Função de validação personalizada para justificacao_recusado_pelo_cti
  justificacaoRecusadoPeloCtiValidator(control: AbstractControl) {
    const recusado = control.parent?.get('recusado_pelo_cti')?.value;

    if (recusado) {
      return Validators.required(control);
    } else {
      return null;
    }
  }


  backoffice_data: any;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddDepartamentoComponent)
  }

  inqueritos: any[] = [];
  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      console.log('inqueritos reverse', this.inqueritos);
      this.inqueritos.reverse();
    });
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }

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
        this.inqueritos.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
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
      });

      console.log('dados mapeados: ', this.mappedFormBackoffice);
    });

  }


  getFormBackofficeData(inqueritoId: string): any {
    console.log(inqueritoId)
    return this.formBackoffice.find((item: any) => item.inquerito === inqueritoId);

  }

  get_Form_PGAS_Data(inqueritoId: string): any {
    console.log(inqueritoId)
    return this.pgas.find((item: any) => item.inquerito === inqueritoId);

  }

  // to get Pgas
  pgas: any;
  get_pgas() {
    this.dataService.Get_Pgas().subscribe(data => {
      this.pgas = data.reverse();
      console.log('Pgas form', this.pgas)
    })
  }

  getFormPN_STATUS_Data(inqueritoId: string): any {
    console.log(inqueritoId)
    return this.get_pn.find((item: any) => item.inquerito === inqueritoId);
  }

  /*limparCampos() {
    this.data_analise_cti = null;
    this.recusado_pelo_cti = false;
    this.justificacao_recusado_pelo_cti = null;
    this.data_aprovacao_financiamento_mg = null;
    this.data_aprovacao_financiamento_banco = null;
    this.pn_pendente_no_banco = undefined;
    this.justificacao_pn_pendente_no_banco = null;
    this.data_primeiro_pedido_reembolso = null;
  }*/

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

  devolver_data_entregue_pdcac(id: any) {
    const formBackofficeCopy = [...this.formBackoffice].reverse();
    const inqueritoSelecionado = formBackofficeCopy.find((item: any) => item.inquerito === id);
    console.log('devolvendo ', inqueritoSelecionado);
    return inqueritoSelecionado ? inqueritoSelecionado.data_pn_entregue_ao_pdac : 'N/D';
  }

}
