import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ManInteress } from 'src/app/interfaces/manInteress';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { SingleInterestComponent } from 'src/app/components/single-view/single-interest/single-interest.component';
import { AddInteressesComponent } from '../../inserts/add-interesses/add-interesses.component';
import { AddAndManifestComponent } from '../../inserts/add-and-manifest/add-and-manifest.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin, timer } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.component.html',
  styleUrls: ['./interesses.component.scss']
})
export class InteressesComponent implements OnInit {

  historico_de_producao_ = [
    'Café',
    'Milho',
    'Feijão',
    'Soja',
    'Batata Rena',
    'Batata Doce']
  user_logged: any;

  today: Date = new Date();
  //minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() -31);
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  man_Int_por_provincia: any;
  provincias: any;
  interest?: ManInteress[];
  keyWord: string = '';
  filterText: string = '';
  sideBarOpen = true;

  apagar = false;

  modalRef: MdbModalRef<AddInteressesComponent> | null = null;

  angForm!: FormGroup;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {

    this.angForm = this.fb.group({

      consultor_pn: [''],
      inicio_elaboracao_pn: ['', Validators.required],
      fim_elaboracao_pn: [null],
      fim_verificacao: [null],
      /*area_total_fazenda: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      area_cultivo_pn: ['', Validators.required],
      recursos_proprios: ['', Validators.required],
      financiamento: ['', Validators.required],
      historico_producao_2_anos: ['', Validators.required],
      area_cultura_2_anos: ['', Validators.required],
      producao_cultura_2_anos: ['', Validators.required],

      estudo_de_viabilidade: new FormControl(null),
      termo_compromisso_assinado: new FormControl(null),
      projeto_riv_completo: new FormControl(null),
      ftas: new FormControl(null),
      lista_de_trabalhadores: new FormControl(null),
      documentos_administrativos: new FormControl(null),
      ficheiro_riv: new FormControl(null),
      outros_documentos: new FormControl(null),*/

      financiamento_bancario: [''],
      //data_pn_entregue_ao_pdac: [''],
      pn_pendente: [false],
      justificacao_pn_pendente: ['', Validators.required],
      proponente_desistiu: [false],
      created_at: [''],
      mgCheckbox: [false],
      mgBancoCheckbox: [false],
      status_pn: ['']
    })
  }


  ngOnInit(): void {
    this.getProvincias()
    this.list_interest()
    this.getInqueritos()
    this.checkDates()
    this.getUserBackOFF()
    this.get_form_backoffice();
    this.getMunicipio();
    this.get_form_backoffice_rev()

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      //console.log('User logado', this.user_logged)
    });

    // leva os dados do inquerito para o backoffice form
    this.route.queryParams.subscribe(params => {
      this.inqueritoSelecionado = params;
    });



    /*/ receber valores no formulario vindo da api para editar
    this.route.paramMap.subscribe(paramId => {
     this.id = paramId.get('id'),
       this.dataService.getInqueritoByid(this.id).subscribe(data => {
         this.angForm.patchValue(data)
       });
   });*/



    /*/ leva os dados do backoffice 
    this.route.queryParams.subscribe(params => {
      this.formBackoffice = params;

      /*this.dataService.Get_Backoffice_data_and_Inquerito_by_id(this.inqueritoSelecionado?.id).subscribe(data => {
        this.alldata = data;
        console.log(data)
      })
    });*/

    /* // Fazer a chamada à API e carregar os dados no formulário
     this.dataService.getBackofficeByID(this.formBackoffice_rev[0].id).subscribe((data: any) => {
       console.log(data); // Verifique se os dados foram retornados corretamente
 
       if (data && data.consultor_pn) {
         // Carregar os dados no formulário usando o patchValue
         this.angForm.patchValue({
           consultor_pn: data.consultor_pn,
           status_pn: data.status_pn
         });
       } else {
         // Tratar a ausência do campo consultor_pn ou dos dados
         console.log("Dados de consultor_pn não encontrados ou inválidos.");
       }
     });*/

  }

  id: any;

  backoffice_data: any;


  checado?: boolean;
  atualizarFinanciamentoBancario(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.checado = true; // A primeira opção é verdadeira
    } else {
      this.checado = false; // A segunda opção é falsa
    }
  }

  showInput(checkboxValue: string) {
    const financiamentoBancarioControl = this.angForm.get('financiamento_bancario');
    const mgCheckboxControl = this.angForm.get('mgCheckbox');
    const mgBancoCheckboxControl = this.angForm.get('mgBancoCheckbox');

    if (checkboxValue === 'mg') {
      financiamentoBancarioControl?.setValue('MG');
      console.log(this.angForm.get('financiamento_bancario')?.value)

      mgBancoCheckboxControl?.setValue(false);
    } else if (checkboxValue === 'mgBanco') {
      financiamentoBancarioControl?.setValue('MG e Banco');
      console.log(this.angForm.get('financiamento_bancario')?.value)
      mgCheckboxControl?.setValue(false);
    }
  }








  getMunicipio() {
    this.dataService.getMunicipio().subscribe(data => {
      this.municipio = data;
    })
  }

  municipio: any;
  retorno: any;
  devolver_nome_municipio(id: any) {
    this.retorno = this.municipio.filter((emp: any) => emp.id === id)[0].name
    return this.retorno
  }



  devolver_status_pn(id: any): string {
    const formBackofficeCopy = [...this.formBackoffice];
    const inqueritoSelecionado = formBackofficeCopy.find((item: any) => item.inquerito === id);
    //console.log('devolvendo ', inqueritoSelecionado);
    return inqueritoSelecionado ? inqueritoSelecionado.status_pn : 'N/D';
  }

  // recebe como parametro o id do inquerito e devolve dados aonde o idnquerito é igual a FK inquerito na tabela formbackoffice
  public foundItem: any;
  getFormBackofficeData_entradas(inqueritoId: any) {
    this.foundItem = this.formBackoffice_rev.find((item: any) => item.inquerito === inqueritoId);
    this.dataService.getFormBackofficeByid(this.foundItem.id).subscribe(data => {
      this.angForm.patchValue(data)
    });
    console.log('formbackoffice single', this.foundItem.status_pn);
    return this.foundItem ? this.foundItem.id : 'N/D';
  }




  getBackofficesByInqueritoId(inqueritoId: any) {
    return this.dataService.Get_Backoffice_data_and_Inquerito_by_id(inqueritoId).pipe(
      switchMap((data: any) => {
        const backoffices = Array.isArray(data) ? data : [data];
        const backofficeIds = backoffices.map((backoffice: any) => backoffice.id);
        return forkJoin(backofficeIds.map((backofficeId: any) =>
          this.dataService.Get_Backoffice_data_and_Inquerito_by_id(backofficeId)
        ));
      })
    ).subscribe(data => {
      //  console.log('yessss', data)
    });
  }

  // to get all data from form backoffice
  formBackoffice: any;
  get_form_backoffice() {
    this.dataService.Get_Backoffice_Form().subscribe(data => {
      this.formBackoffice = data.reverse();
      console.log('backofficeForm', this.formBackoffice)
    })
  }

  // to get all data from form backoffice
  formBackoffice_rev: any;
  get_form_backoffice_rev() {
    this.dataService.Get_Backoffice_Form().subscribe(data => {
      this.formBackoffice_rev = data.reverse();
      console.log('backofficeForm', this.formBackoffice_rev)
    })
  }

  /*/ obter dados das duas tabelas juntos Inquerito e Backoffice por id
  alldata: any;
  get_data_from_inquerito_e_BackOffice(id_inquerito: any) {
    this.dataService.Get_Backoffice_data_and_Inquerito_by_id(id_inquerito).subscribe(data => {
      this.alldata = data;
      console.log('data: ', data)
    })
  }*/

  // Estados PN (Part. 1)
  getStatus_pn() {
    const Estado_MI = this.inqueritoSelecionado?.status === 'Aprovado' && this.angForm.get('inicio_elaboracao_pn')?.value === '';
    const Data_inicio_elaboração_PN = this.angForm.get('inicio_elaboracao_pn')?.value && this.angForm.get('consultor_pn')?.value !== '';
    const Data_fim_elaboração_PN = this.angForm.get('fim_elaboracao_pn')?.value && this.angForm.get('fim_verificacao')?.value === '';
    // const Data_fim_verificacao = this.angForm.get('fim_verificacao')?.value && this.angForm.get('data_pn_entregue_ao_pdac')?.value === '';
    const O_proponente_desistiu = this.angForm.get('proponente_desistiu')?.value === true;

    const O_PN_esta_pendente = this.angForm.get('pn_pendente')?.value === true;

    const Data_PN_entregue_ao_PDAC = this.angForm.get('fim_verificacao')?.value; // linha pendente !!! “Data PN entregue ao PDAC” (pergunta 16) <> ”” & “Data analise pelo CTI” (pergunta 19) = “”

    console.log(Estado_MI, Data_inicio_elaboração_PN,
      Data_fim_elaboração_PN, O_proponente_desistiu,
      O_PN_esta_pendente, Data_PN_entregue_ao_PDAC)

    if (Estado_MI) {
      return 'Inquérito em stock';
    }

    if (Data_inicio_elaboração_PN) {
      return 'PN em elaboração';
    }

    if (Data_fim_elaboração_PN) {
      return 'PN em verificação';
    }

    if (O_proponente_desistiu) {
      return 'Desistência do proponente';
    }

    if (O_PN_esta_pendente) {
      return 'PN pendente no BO';
    }

    if (Data_PN_entregue_ao_PDAC) {
      return 'PN em análise UIP PDAC';
    } else {
      return 'N/D';
    }
  }

  // levar dados do inquerito selecionado para o formulario backoffice
  nome_simplificado_finded: any;
  inqueritoSelecionado: any | null = null;
  selecionarInquerito(item: any) {
    this.inqueritoSelecionado = item;
    console.log('id inq selected', item)
    // com base no id do inquerito local, encontra o item completo do inquerito e me devolve o seu nome_simplificado
    return this.nome_simplificado_finded = this.inqueritos.find((inquerito: any) => inquerito.id === item);

    /* if (this.nome_simplificado_finded) {
       console.log('Inquérito encontrado:', this.nome_simplificado_finded);
     } else {
       console.log('Inquérito não encontrado na lista.');
     }
     console.log('Inquérito encontrado NS:', this.nome_simplificado_finded.nome_simplificado)
     return this.nome_simplificado_finded ? this.nome_simplificado_finded.nome_simplificado : 'N/D';*/
  }


  enviarFormulario(data_: any) {


    if (!this.angForm.get('consultor_pn')?.value) {
      if (!this.angForm.get('consultor_pn')?.value) {
        Swal.fire({
          icon: 'error',
          //title: 'Oops...',
          text: 'Preencha o campo Consultor PN.',
        })
      }
      return;
    }

    if (!this.angForm.get('inicio_elaboracao_pn')?.value) {
      if (!this.angForm.get('inicio_elaboracao_pn')?.value) {
        Swal.fire({
          icon: 'error',
          //title: 'Oops...',
          text: 'Preencha o campo Data início elaboração do PN.',
        })
      }
      return;
    }



    const formData = new FormData();

    formData.append('consultor_pn', this.angForm.get('consultor_pn')?.value);
    formData.append('inicio_elaboracao_pn', (this.angForm.get('inicio_elaboracao_pn')?.value));

    try {
      console.log(this.angForm.get('fim_elaboracao_pn')?.value, this.angForm.get('fim_verificacao')?.value)
      const fimElaboracaoValue = this.angForm.get('fim_elaboracao_pn')?.value;
      formData.append('fim_elaboracao_pn', fimElaboracaoValue instanceof Date ? fimElaboracaoValue.toISOString() : '');
      const fimVerificacaoValue = this.angForm.get('fim_verificacao')?.value;
      formData.append('fim_verificacao', fimVerificacaoValue instanceof Date ? fimVerificacaoValue.toISOString() : '');
      console.log(fimVerificacaoValue instanceof Date ? fimVerificacaoValue.toISOString() : '')
    } catch (error) {
      console.log(error, this.angForm.get('fim_elaboracao_pn')?.value, this.angForm.get('fim_verificacao')?.value)
      formData.append('fim_elaboracao_pn', this.angForm.get('fim_elaboracao_pn')?.value)
      formData.append('fim_verificacao', this.angForm.get('fim_verificacao')?.value);
    }

    formData.append('financiamento_bancario', this.angForm.get('financiamento_bancario')?.value);
    formData.append('pn_pendente', this.angForm.get('pn_pendente')?.value);
    formData.append('justificacao_pn_pendente', this.angForm.get('justificacao_pn_pendente')?.value);
    formData.append('proponente_desistiu', this.angForm.get('proponente_desistiu')?.value);
    formData.append('created_at', this.angForm.get('created_at')?.value);

    let status_pn_salvo = 'N/D';

    console.log(this.angForm.get('fim_verificacao')?.value)
    if (this.angForm.get('proponente_desistiu')?.value === true) {

      status_pn_salvo = 'Desistência do proponente';

    } else if (this.angForm.get('pn_pendente')?.value === true) {

      status_pn_salvo = 'PN pendente no BO';

    } else if (this.inqueritoSelecionado?.status === 'Aprovado' && this.angForm.get('inicio_elaboracao_pn')?.value === '') {

      status_pn_salvo = 'Inquérito em stock';

    } else if (this.angForm.get('inicio_elaboracao_pn')?.value !== '' && (this.angForm.get('fim_elaboracao_pn')?.value === '' || this.angForm.get('fim_elaboracao_pn')?.value === null)) {

      status_pn_salvo = 'PN em elaboração';

    } else if (this.angForm.get('inicio_elaboracao_pn')?.value !== '' && (this.angForm.get('fim_verificacao')?.value === '' || this.angForm.get('fim_verificacao')?.value === null)) {

      status_pn_salvo = 'PN em verificação';

    } else if (this.angForm.get('fim_verificacao')?.value !== '' || this.angForm.get('fim_verificacao')?.value !== null) {

      status_pn_salvo = 'PN em análise UIP PDAC';

    }



    formData.append('status_pn', status_pn_salvo);
    formData.append('inquerito', this.inqueritoSelecionado);

    //const statusPN = this.getStatus_pn();

    // Success callback
    const successCallback = (response: any) => {
      console.log('Formulário enviado com sucesso!', response);
      // Implemente o código para lidar com a resposta da API aqui
      this.alert_success();
      // close modal
      const modal = document.getElementById('exampleModalToggle');
      if (modal) {
        modal.style.display = 'none';
      }
      // Executar o timer somente após a resposta da API ser recebida
      timer(2000).pipe(delay(2000)).subscribe(() => {
        location.reload();
      });

      // this.hideLoading();
    };

    // Success calback 2
    const successCallback2 = (response: any) => {
      console.log('Formulário enviado com sucesso e plano de negocio finalizado!', response);
      // Implemente o código para lidar com a resposta da API aqui
      Swal.fire({
        icon: "success",
        title: "PN em analise UIP PDAC",
        showConfirmButton: false,
        timer: 1500
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
      // this.hideLoading();
    };

    // Error callback
    const errorCallback = (error: any) => {
      console.error('Erro ao enviar o formulário:', error);
      this.alert_error()
      // Implemente o código para lidar com o erro aqui
      //this.hideLoading();
    };

    this.angForm.get('status_pn')?.setValue(status_pn_salvo);


    try {
      if (this.foundItem.id) {
        this.dataService.Update_Backoffice_form(this.foundItem.id, this.angForm.value).subscribe(successCallback, errorCallback);
      } else {
        console.log('')
      }
    } catch (error) {
      this.dataService.Send_Backoffice_form(formData).subscribe(successCallback, errorCallback);
    }


  }




  alert_success() {
    Swal.fire({
      icon: "success",
      title: "Salvo",
      showConfirmButton: false,
      timer: 1500
    })
  }


  userbackOff: any;
  // filtrar usuarios do departamento back off
  getUserBackOFF() {
    this.dataService.getUser().subscribe(data => {
      this.userbackOff = data.filter(user => user.department === 'Back Off');
      console.log('users do back off: ', data)
    })
  }

  checkDates() {
    const pnEntregueDate = this.angForm.get('data_pn_entregue_ao_pdac')?.value;
    const fimVerificacaoDate = this.angForm.get('fim_verificacao')?.value;
    const today = new Date();

    if (pnEntregueDate > today) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data PN entregue ao PDAC" não pode ser posterior à data de hoje.',
      })
      this.angForm.get('data_pn_entregue_ao_pdac')?.setValue('');
    }

    if (pnEntregueDate < fimVerificacaoDate) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data PN entregue ao PDAC" não pode ser anterior à "Data fim verificacção PN".',
      })
      this.angForm.get('data_pn_entregue_ao_pdac')?.setValue('');
    }
  }

  checkDates_1() {
    const pnEntregueDate = this.angForm.get('inicio_elaboracao_pn')?.value;
    const fimVerificacaoDate = this.angForm.get('fim_elaboracao_pn')?.value;
    const today = new Date();

    if (pnEntregueDate > today) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data inicio elaboração" não pode ser posterior à data de hoje.',
      })
    }

    if (pnEntregueDate > fimVerificacaoDate) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data fim elaboracao PN" não pode ser anterior à "Data inicio elaboração PN".',
      })
      this.angForm.get('fim_elaboracao_pn')?.setValue('')
    }
  }

  checkDates_2() {
    const fimVerificacaoDate = this.angForm.get('fim_verificacao')?.value;
    const fimElaboracaoDate = this.angForm.get('fim_elaboracao_pn')?.value;
    const today = new Date();

    if (fimElaboracaoDate > today) {

      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data Fim de elaboração PN" não pode ser posterior à data de hoje.',
      })
      this.angForm.get('fim_elaboracao_pn')?.setValue('')
    }

    if (fimElaboracaoDate > fimVerificacaoDate) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data fim verificação" não pode ser anterior à "Data fim elaboração PN".',
      })
      this.angForm.get('fim_elaboracao_pn')?.setValue('')
    }
  }

  toggleProponenteDesistiu() {
    const proponenteDesistiu = this.angForm.get('proponente_desistiu')?.value;
    const pnPendente = this.angForm.get('pn_pendente')?.value;
    this.angForm.get('proponente_desistiu')?.setValue(proponenteDesistiu);

    if (proponenteDesistiu) {
      //alert('O proponente desistiu!');
      this.angForm.get('justificacao_pn_pendente')?.disable();
    }

    if (pnPendente) {
      this.angForm.get('justificacao_pn_pendente')?.enable();
    } else {
      this.angForm.get('justificacao_pn_pendente')?.disable();
    }
  }

  showDuplicatedInput?: boolean;
  showDuplicatedInput_1?: boolean;

  showInput_2(checkboxValue: any) {
    // this.limpar_form();
    console.log(checkboxValue)
    if (checkboxValue === true) {
      checkboxValue = 'pn_pendente'
    }
    if (checkboxValue === 'pn_pendente') {
      if (this.showDuplicatedInput) {
        return; // Retorna se o checkbox já estiver marcado
      }

      this.showDuplicatedInput = true;
      console.log(this.angForm.get('pn_pendente')?.value);
      this.showDuplicatedInput_1 = false;
      this.angForm.get('proponente_desistiu')?.patchValue(false);
      console.log(this.angForm.get('proponente_desistiu')?.value);
    } else if (checkboxValue === 'proponente_desistiu') {
      if (this.showDuplicatedInput_1) {
        return; // Retorna se o checkbox já estiver marcado
      }

      this.showDuplicatedInput_1 = true;
      console.log(this.angForm.get('proponente_desistiu')?.value);
      this.showDuplicatedInput = false;
      this.angForm.get('pn_pendente')?.patchValue(false);
      console.log(this.angForm.get('pn_pendente')?.value);
    }
  }



  showInput__2(checkboxValue: string) {
    const pnPendente = this.angForm.get('pn_pendente');
    const proponenteDesistiu = this.angForm.get('proponente_desistiu');

    const mgCheckboxControl = this.angForm.get('mgCheckbox');
    const mgBancoCheckboxControl = this.angForm.get('mgBancoCheckbox');

    if (pnPendente && proponenteDesistiu) {
      if (checkboxValue === 'pnPendente') {
        pnPendente.setValue(true);
        proponenteDesistiu.setValue(false);

        mgBancoCheckboxControl?.setValue(false);
      } else if (checkboxValue === 'proponenteDesistiu') {
        pnPendente.setValue(false);
        proponenteDesistiu.setValue(true);

        mgCheckboxControl?.setValue(false);
      }
    }
  }


  inqueritos: any[] = [];
  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado').reverse();
      console.log('inqueritos reverse', this.inqueritos);
    });
  }


  downloadFile(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substr(url.lastIndexOf('/') + 1);
    link.target = "_blank"; // Adiciona o atributo target para abrir em um novo separador
    link.click();
  }

  downloadFile_(fileName: string): void {
    const url = `http://strongboxao.ddns.net:9000/sirius/documents/${fileName}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }

  deleteInquire(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      text: "Você está prestes a eliminar este registo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.deleteInquireForm(id).subscribe(
          success => { this.getInqueritos() },
          error => { this.alert_error() }
        )
        Swal.fire(
          'Eliminado!',
          'O seu registo foi eliminado.',
          'success',
        )
      }
    })
  }

  limitarTexto(texto: string, limite: number): string {
    if (texto.length > limite) {
      return texto.slice(0, limite) + '...';
    }
    return texto;
  }

  buscar(id: any) {
    this.dataService.interestExpressionByProvince(id).subscribe(data => {
      this.man_Int_por_provincia = data;
      //console.log('man interest by province', data)
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInteressesComponent)
  }

  openModaltest(id: any) {
    this.modalRef = this.modalService.open(AddAndManifestComponent)
  }


  list_interest() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.interest = data;
      //console.log('man interest',data)
    })
  }

  // delete um interest express
  deleteInterest(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      text: "Você está prestes a eliminar este Back Off!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.deleteInterestExpress(id).subscribe(
          success => { this.list_interest(); },
          error => { this.alert_error(); }
        )
        Swal.fire(
          'Eliminado!',
          'O seu registo foi eliminado.',
          'success'
        )
      }
    })

  }

  getProvincias() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provincias = data;
      //console.log('provincias', data)
    })
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }

  alert_error2() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Não encontrado',
    })
  }

  // change de files 1
  selectedFile1: any;
  onSelectedFile1(e: any) {
    this.selectedFile1 = e.target.files;
    console.log('Doc estudo de viabilidade', this.selectedFile1)
  }

  // change de files 2
  selectedFile2: any;
  onSelectedFile2(e: any) {
    this.selectedFile2 = e.target.files;
    console.log('Doc termo de compromisso', this.selectedFile2)
  }

  // change de files 3
  selectedFile3: any;
  onSelectedFile3(e: any) {
    this.selectedFile3 = e.target.files;
    console.log('Doc projecto riv', this.selectedFile3)
  }

  // change de files 4
  selectedFile4: any;
  onSelectedFile4(e: any) {
    this.selectedFile4 = e.target.files;
    console.log('Doc ftas', this.selectedFile4)

  }

  // change de files 5
  selectedFile5: any;
  onSelectedFile5(e: any) {
    this.selectedFile5 = e.target.files;
    console.log('Doc lista de trabalhadores', this.selectedFile5)
  }

  // change de files 6
  selectedFile6: any;
  onSelectedFile6(e: any) {
    this.selectedFile6 = e.target.files;
    console.log('Doc docs admins', this.selectedFile6)
  }

  // change de files 7
  selectedFile7: any;
  onSelectedFile7(e: any) {
    this.selectedFile7 = e.target.files;
    console.log('Doc riv file', this.selectedFile7)
  }

  // change de files 8
  selectedFile8: any;
  onSelectedFile8(e: any) {
    this.selectedFile8 = e.target.files;
    console.log('Doc outros docs', this.selectedFile8)
  }

}
