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
    this.mostrarSegundoCampo = this.angForm.get('pn_pendente_no_banco')?.value;
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
      pn_pendente_no_banco: [false],
      justificacao_pn_pendente_no_banco: ['', Validators.required],
      data_primeiro_pedido_reembolso: [''],
      created_at: ['']
    })
  }

  inqueritoSelecionado: any;

  ngOnInit(): void {

    // leva os dados do inquerito para o backoffice form
    this.route.queryParams.subscribe(params => {
      this.inqueritoSelecionado = params;
    });


    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    // leva os dados do backoffice para o pnelaborados form
    this.route.queryParams.subscribe(params => {
      this.mappedFormBackoffice = params;
    });

    this.getInqueritos();
    this.get_form_backoffice____();
  }

  selecionarInquerito(item: any) {
    this.inqueritoSelecionado = item;
    console.log(' to get inquerito selected', this.inqueritoSelecionado?.id)
  }


  alert_success() {
    Swal.fire({
      icon: "success",
      title: "Salvo",
      showConfirmButton: false,
      timer: 1500
    })
  }

  // Estados PN (Part. 2)
  getStatus_pn() {

    // PN pendente no CTI
    const DataAnaliseCti0 = this.angForm.get('data_analise_cti')?.value === true;

    // “PN aprovado pelo CTI, em análise MG
    const DataAnaliseCti = this.angForm.get('data_analise_cti')?.value !== "" && this.angForm.get('recusado_pelo_cti')?.value === false;

    // PN pendente no banco
    const PN_pendente_Banco = this.angForm.get('pn_pendente_no_banco')?.value === true;

    // PN aprovado pelo CTI, MG aprovado, em análise no Banco
    const DataAnaliseCti_2 =
      this.angForm.get('data_analise_cti')?.value !== "" &&
      this.angForm.get('recusado_pelo_cti')?.value === false &&
      this.angForm.get('data_aprovacao_financiamento_mg')?.value !== "" &&
      this.selectedFinanciamentoBancario?.financiamento_bancario > 0;

    // Financiamento aprovado  
    const Data_Aprovacao_Financ_MG =
      (this.angForm.get('data_aprovacao_financiamento_mg')?.value !== "" && this.selectedFinanciamentoBancario?.financiamento_bancario === 0) ||
      (this.angForm.get('data_aprovacao_financiamento_mg')?.value !== "" && this.angForm.get('data_aprovacao_financiamento_banco')?.value !== "");

    // PN implementado
    const Data_1_pedido_desbolso =
      this.angForm.get('data_primeiro_pedido_reembolso')?.value && this.angForm.get('data_aprovacao_PGA_by_BM')?.value ||
      this.data_aprovacao_PGA_by_BM && this.angForm.get('data_primeiro_pedido_reembolso')?.value

    if (DataAnaliseCti0) {
      return 'PN pendente no CTI'
    } else if (DataAnaliseCti) {
      return 'PN aprovado pelo CTI, em análise MG'
    } else if (DataAnaliseCti_2) {
      return 'PN aprovado pelo CTI, MG aprovado, em análise no Banco'
    } else if (PN_pendente_Banco) {
      return 'PN pendente no banco'
    } else if (Data_Aprovacao_Financ_MG) {
      return 'Financiamento aprovado'
    } else if (Data_1_pedido_desbolso) {
      return 'PN implementado'
    } else {
      return 'N/D'
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
    formData.append('inquerito', this.inqueritoSelecionado?.id);
    formData.append('status_pn', this.getStatus_pn());

    const successCallback = (response: any) => {
      console.log('Formulário enviado com sucesso!', response);
      this.alert_success();
    };

    const successCallback2 = (response: any) => {
      console.log('Formulário enviado com sucesso PN implementado!', response);
      // Restante do código para o callback de sucesso 2
    };

    const errorCallback = (error: any) => {
      console.error('Erro ao enviar o formulário:', error);
      this.alert_error();
    };

    if (this.getStatus_pn() === 'PN implementado') {
      this.dataService.Post_pnElaborados(formData).subscribe(successCallback2, errorCallback);
    } else {
      this.dataService.Post_pnElaborados(formData).subscribe(successCallback, errorCallback);
    }
  }


  /*/ Form que envia o pnelaborados
  enviarPN_elaborados() {

    let pnElaborados = {
      "recusado_pelo_cti": this.recusado_pelo_cti,
      "justificacao_recusado_pelo_cti": this.justificacao_recusado_pelo_cti,
      "data_aprovacao_financiamento_mg": this.data_aprovacao_financiamento_mg,
      "data_aprovacao_financiamento_banco": this.data_aprovacao_financiamento_banco,
      "pn_pendente_no_banco": this.pn_pendente_no_banco || false,
      "justificacao_pn_pendente_no_banco": this.justificacao_pn_pendente_no_banco,
      "data_primeiro_pedido_reembolso": this.data_primeiro_pedido_reembolso,
      "inquerito": this.inqueritoSelecionado?.id,
      "status_pn": this.getStatus_pn()
    };

    let Status_PN = this.getStatus_pn()

    // Success callback 1
    const successCallback = (response: any) => {
      console.log('Formulário enviado com sucesso!', response);
      this.alert_success();
      /* const modal = document.getElementById('exampleModalToggle');
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

    // Condição que define o status_pn
    if (Status_PN === 'PN implementado') {
      this.dataService.Post_pnElaborados(pnElaborados).subscribe(successCallback2, errorCallback);
      // this.router.navigate(['pn-implementado']);
    } else {
      this.dataService.Post_pnElaborados(pnElaborados).subscribe(successCallback, errorCallback);
    }

  }*/

  data_aprovacao_PGA_by_BM = 'Data de aprovacao PG by BM'; // dados ficticios, futuramente substituido pelo pga


  selectedFinanciamentoBancario: any;
  mostrarFinanciamento(inqueritoId: any) {
    this.selectedFinanciamentoBancario = this.getFormBackofficeData(inqueritoId);
    if (this.selectedFinanciamentoBancario) {
      console.log(this.selectedFinanciamentoBancario?.financiamento_bancario);
    }
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
        text: '"A Data do 1º pedido de desembolso" não pode ser anterior à "Data de aprovação do financiamento ao MG ou Banco".',
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
      console.log('inqueritos', this.inqueritos);
      this.inqueritos.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
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
    return this.formBackoffice.find((item: any) => item.inquerito === inqueritoId);
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


}
