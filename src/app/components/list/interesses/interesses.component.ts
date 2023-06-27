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
import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';

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

      consultor_pn: ['', Validators.required],
      inicio_elaboracao_pn: ['', Validators.required],
      fim_elaboracao_pn: [''],
      fim_verificacao: [''],
      area_total_fazenda: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      area_cultivo_pn: ['', Validators.required],
      recursos_proprios: ['', Validators.required],
      financiamento: ['', Validators.required],
      financiamento_bancario: ['', Validators.required],
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
      outros_documentos: new FormControl(null),


      data_pn_entregue_ao_pdac: [''],
      pn_pendente: [false],
      justificacao_pn_pendente: ['', Validators.required],
      proponente_desistiu: [false],
      created_at: [''],
    })
  }

  ngOnInit(): void {
    this.getProvincias()
    this.list_interest()
    this.getInqueritos()
    this.checkDates()
    this.getUserBackOFF()
    this.get_form_backoffice()

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    // leva os dados do inquerito para o backoffice form
    this.route.queryParams.subscribe(params => {
      this.inqueritoSelecionado = params;
    });

    /*/ leva os dados do backoffice para o inquerito selecionado
    this.route.queryParams.subscribe(params => {
      this.backofficeFormSelecionado = params;

      this.dataService.Get_Backoffice_data_and_Inquerito_by_id(this.inqueritoSelecionado?.id).subscribe(data => {
        this.alldata = data;
        console.log(data)
      })
    });*/


  }

  // to get all data from form backoffice
  formBackoffice: any;
  get_form_backoffice() {
    this.dataService.Get_Backoffice_Form().subscribe(data => {
      this.formBackoffice = data;
      console.log(this.formBackoffice)
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
    const Data_inicio_elaboração_PN = this.angForm.get('inicio_elaboracao_pn')?.value && this.angForm.get('fim_elaboracao_pn')?.value === '';
    const Data_fim_elaboração_PN = this.angForm.get('fim_elaboracao_pn')?.value && this.angForm.get('fim_verificacao')?.value === '';
    const Data_fim_verificacao = this.angForm.get('fim_verificacao')?.value && this.angForm.get('data_pn_entregue_ao_pdac')?.value === '';
    const O_proponente_desistiu = this.angForm.get('proponente_desistiu')?.value === true;
    const O_PN_esta_pendente = this.angForm.get('pn_pendente')?.value === true;
    const Data_PN_entregue_ao_PDAC = this.angForm.get('data_pn_entregue_ao_pdac')?.value; // linha pendente !!! “Data PN entregue ao PDAC” (pergunta 16) <> ”” & “Data analise pelo CTI” (pergunta 19) = “”

    if (Estado_MI) {
      return 'Inquérito em stock';
    } else if (Data_inicio_elaboração_PN) {
      return 'PN em elaborção';
    } else if (Data_fim_elaboração_PN) {
      return 'PN em verificação'
    } else if (Data_fim_verificacao) {
      return 'PN finalizado'
    } else if (O_proponente_desistiu) {
      return 'Desistência do proponente'
    } else if (O_PN_esta_pendente) {
      return 'PN pendente no BO'
    } else if (Data_PN_entregue_ao_PDAC) {
      return 'PN em analise UIP PDAC'
    } {
      return 'Não definido'
    }
  }

  // levar dados do inquerito selecionado para o formulario backoffice
  inqueritoSelecionado: any | null = null;
  selecionarInquerito(item: any) {
    this.inqueritoSelecionado = item;
  }

  // ver backoffice form deste inquérito
  ver_Backoffice_form_inquerito(itemId: number) {
  }


  enviarFormulario(data_: any) {
    const formData = new FormData();

    formData.append('consultor_pn', this.angForm.get('consultor_pn')?.value);
    formData.append('inicio_elaboracao_pn', (this.angForm.get('inicio_elaboracao_pn')?.value));
    formData.append('fim_elaboracao_pn', (this.angForm.get('fim_elaboracao_pn')?.value));
    formData.append('fim_verificacao', (this.angForm.get('fim_verificacao')?.value));
    formData.append('area_total_fazenda', this.angForm.get('area_total_fazenda')?.value);
    formData.append('area_cultivo_pn', this.angForm.get('area_cultivo_pn')?.value);
    formData.append('recursos_proprios', this.angForm.get('recursos_proprios')?.value);
    formData.append('financiamento', this.angForm.get('financiamento')?.value);
    formData.append('financiamento_bancario', this.angForm.get('financiamento_bancario')?.value);
    formData.append('historico_producao_2_anos', this.angForm.get('historico_producao_2_anos')?.value);
    formData.append('area_cultura_2_anos', this.angForm.get('area_cultura_2_anos')?.value);
    formData.append('producao_cultura_2_anos', this.angForm.get('producao_cultura_2_anos')?.value);

    // Tratamento para upload de um arquivo (estudo de viabilidade)
    let fileList1: FileList = this.selectedFile1;
    let estudo_de_viabilidade: FileList = fileList1;

    // Verificar se há um arquivo selecionado
    if (this.selectedFile1 && this.selectedFile1?.length > 0) {
      const Estudo_de_viabilidade = this.selectedFile1[0];

      // Verificar se o arquivo não está vazio
      if (Estudo_de_viabilidade.size > 0) {
        formData.append("estudo_de_viabilidade", Estudo_de_viabilidade, Estudo_de_viabilidade.name);
      }
    }

    // Tratamento para upload de um arquivo (Termo de compromisso) 
    let fileList2: FileList = this.selectedFile2;
    let termo_compromisso_assinado: FileList = fileList2;

    // Verificar se há um arquivo selecionado
    if (this.selectedFile2 && this.selectedFile2?.length > 0) {
      const Termo_compromisso_assinado = this.selectedFile2[0];

      // Verificar se o arquivo não está vazio
      if (Termo_compromisso_assinado.size > 0) {
        formData.append('termo_compromisso_assinado', Termo_compromisso_assinado, Termo_compromisso_assinado.name);
      }
    }

    // Tratamento para upload de um arquivo (projeto_riv_completo) 
    let fileList3: FileList = this.selectedFile3;
    let projeto_riv_completo: FileList = fileList3;

    // Verificar se há um arquivo selecionado
    if (this.selectedFile3 && this.selectedFile3?.length > 0) {
      const Projeto_riv_completo = this.selectedFile3[0];

      // Verificar se o arquivo não está vazio
      if (Projeto_riv_completo.size > 0) {
        formData.append('projeto_riv_completo', Projeto_riv_completo, Projeto_riv_completo.name);
      }
    }

    // Tratamento para upload de um arquivo (Ftas) 
    let fileList4: FileList = this.selectedFile4;
    let ftas: FileList = fileList4;

    // Verificar se há um arquivo selecionado
    if (this.selectedFile4 && this.selectedFile4?.length > 0) {
      const Ftas = this.selectedFile4[0];

      // Verificar se o arquivo não está vazio
      if (Ftas.size > 0) {
        formData.append('ftas', Ftas, Ftas.name);
      }
    }

    // Tratamento para upload de um arquivo (lista_de_trabalhadores) 
    let fileList5: FileList = this.selectedFile5;
    let lista_de_trabalhadores: FileList = fileList5;

    // Verificar se há um arquivo selecionado
    if (this.selectedFile5 && this.selectedFile5?.length > 0) {
      const Lista_de_trabalhadores = this.selectedFile5[0];

      // Verificar se o arquivo não está vazio
      if (Lista_de_trabalhadores.size > 0) {
        formData.append('lista_de_trabalhadores', Lista_de_trabalhadores, Lista_de_trabalhadores.name);
      }
    }

    // Tratamento para upload de um arquivo (documentos_administrativos) 
    let fileList6: FileList = this.selectedFile6;
    let documentos_administrativos: FileList = fileList6;

    // Verificar se há um arquivo selecionado
    if (this.selectedFile6 && this.selectedFile6?.length > 0) {
      const Documentos_administrativos = this.selectedFile6[0];

      // Verificar se o arquivo não está vazio
      if (Documentos_administrativos.size > 0) {
        formData.append('documentos_administrativos', Documentos_administrativos, Documentos_administrativos.name);
      }
    }

    // Tratamento para upload de um arquivo (ficheiro_riv) 
    let fileList7: FileList = this.selectedFile7;
    let ficheiro_riv: FileList = fileList7;

    // Verificar se há um arquivo selecionado
    if (this.selectedFile7 && this.selectedFile7?.length > 0) {
      const Ficheiro_riv = this.selectedFile7[0];

      // Verificar se o arquivo não está vazio
      if (Ficheiro_riv.size > 0) {
        formData.append('ficheiro_riv', Ficheiro_riv, Ficheiro_riv.name);
      }
    }

    // Tratamento para upload de um arquivo (outros_documentos) inqueritoSelecionado?.id
    let fileList8: FileList = this.selectedFile8;
    let documents: FileList = fileList8;

    for (let i = 0; i < documents?.length; i++) {
      formData.append("files", documents[i], documents[i].name);
    }

    formData.append('data_pn_entregue_ao_pdac', (this.angForm.get('data_pn_entregue_ao_pdac')?.value));
    formData.append('pn_pendente', this.angForm.get('pn_pendente')?.value);
    formData.append('justificacao_pn_pendente', this.angForm.get('justificacao_pn_pendente')?.value);
    formData.append('proponente_desistiu', this.angForm.get('proponente_desistiu')?.value);
    formData.append('created_at', this.angForm.get('created_at')?.value);
    formData.append('status_pn', this.getStatus_pn());

    formData.append('inquerito', this.inqueritoSelecionado?.id);

    const statusPN = this.getStatus_pn();

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
        title: "PN Elaborado",
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

    // condição que define o status_pn
    if (statusPN === 'PN finalizado') {
      this.dataService.Send_Backoffice_form(formData).subscribe(successCallback2, errorCallback);
      this.router.navigate(['pn-elaborados']);
    } else {
      this.dataService.Send_Backoffice_form(formData).subscribe(successCallback, errorCallback);
    }

  }

  isLoading: boolean = false;
  showLoading() {
    // Exibir o indicador de loading
    // Por exemplo, definir uma variável de controle no componente para mostrar/ocultar o indicador
    this.isLoading = true;
  }

  hideLoading() {
    // Ocultar o indicador de loading
    // Por exemplo, alterar o valor da variável de controle no componente
    this.isLoading = false;
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
    }

    if (pnEntregueDate < fimVerificacaoDate) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data PN entregue ao PDAC" não pode ser anterior à "Data fim verificacção PN".',
      })
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

    }

    if (fimElaboracaoDate > fimVerificacaoDate) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data fim verificação" não pode ser anterior à "Data fim elaboração PN".',
      })
    }
  }

  toggleProponenteDesistiu() {
    const proponenteDesistiu = this.angForm.get('proponente_desistiu')?.value;
    this.angForm.get('proponente_desistiu')?.setValue(proponenteDesistiu);

    if (proponenteDesistiu) {
      //alert('O proponente desistiu!');
    }
  }



  toggleJustificacaoPnPendente() {
    const pnPendente = this.angForm.get('pn_pendente')?.value;
    if (pnPendente) {
      this.angForm.get('justificacao_pn_pendente')?.enable();
    } else {
      this.angForm.get('justificacao_pn_pendente')?.disable();
    }
  }



  inqueritos: any[] = [];
  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      console.log(this.inqueritos);
      this.inqueritos.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
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
