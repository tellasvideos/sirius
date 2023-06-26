import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AddDepartamentoComponent } from '../../inserts/add-departamento/add-departamento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


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
    this.mostrarSegundoCampo = this.recusado_pelo_cti;
  }

  onPendenteNoBanco(){
    this.mostrarSegundoCampo = this.pn_pendente_no_banco;
  }

  // DAdos do Formulario
  data_analise_cti: any;
  recusado_pelo_cti?:boolean;
  justificacao_recusado_pelo_cti:any;
  data_aprovacao_financiamento_mg:any;
  data_aprovacao_financiamento_banco:any;
  pn_pendente_no_banco?:boolean;
  justificacao_pn_pendente_no_banco:any;
  data_primeiro_pedido_reembolso:any;

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

  ngOnInit(): void {

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    // leva os dados do inquerito para o backoffice form
    this.route.queryParams.subscribe(params => {
      this.backoffice_form_data_Selecionado = params;
    });

    this.getInqueritos();

    /* this.activatedRoute.paramMap.subscribe(paramMap => {
       this.id = paramMap.get('id');
       this.dataService.Get_Backoffice_data_and_Inquerito_by_id(this.id).subscribe(data => {
         // Converta data para um array se ainda não for
         const dataArray = Array.isArray(data) ? data : [data];
         this.backoffice_data = dataArray.reverse();
         console.log('aquiiiiiiii', this.backoffice_data);
       });
     });*/

    //this.get_form_backoffice()

    this.get_form_backoffice____();
  }

  backoffice_form_data_Selecionado: any | null = null;
  Financiamento_bancario_data(item: any) {
    this.get_form_backoffice____() === item;
    // console.log(item)
    // this.backoffice_form_data_Selecionado = item;
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

  CheckRecusadoPeloCti() {
    const recusado = this.angForm.get('recusado_pelo_cti')?.value;

    if (recusado) {
      this.angForm.get('justificacao_recusado_pelo_cti')?.enable();
    } else {
      this.angForm.get('justificacao_recusado_pelo_cti')?.disable();
    }

    console.log('runnn')

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
          financiamento_bancario: item.financiamento_bancario
        };
      });

      console.log('dados mapeados: ', this.mappedFormBackoffice);
    });
  }


  getFormBackofficeData(inqueritoId: string): any {
    return this.formBackoffice.find((item: any) => item.inquerito === inqueritoId);
  }



}
