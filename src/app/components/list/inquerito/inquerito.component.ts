import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2'
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AddInqueritoComponent } from '../../inserts/add-inquerito/add-inquerito.component';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location, } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';

import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-inquerito',
  templateUrl: './inquerito.component.html',
  styleUrls: ['./inquerito.component.scss']
})
export class InqueritoComponent implements OnInit {

  selectedFile: any;
  selectedFile2: any;

  isFileFieldsFilled: boolean = false;

  items = [
    'Valor 1',
    'Valor 2',
    'Valor 3'
  ];

  duplicateNames: any;



  angForm!: FormGroup;
  user_logged: any;
  userFrontOff: any;
  formAprovado = false;
  Inquerito_pendente: any;

  isFormValid = false; // variável para armazenar o estado de validação do formulário
  pdac: any;

  today: Date = new Date();
  //minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() -31);
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  keyWord: string = '';
  selecionado: string = '';

  estado = ['Aprovado', 'Pendente']

  opcoes = ['Sim', 'Nao']
  opcoesDidasTeste = ['Nao']

  tipos_de_prestadores = [
    'mecanizacao',
    'comercializacao',
    'insumos/sementes',
    'transporte',
    'Construçao'
  ]

  tipos_de_negococio = [
    'Productor',
    'Agregador',
    'Transformador',
    'Distribuidor',
    'Prestador de serviços',
    //'Serviços mecânicos',
    // 'Negócio insumos'
  ]

  tipos_de_agregador = [
    'Descasque',
    'Seleção',
    'embalagem'
  ]

  tipos_de_cadeia_de_valor = [
    'Tuberculos',
    'Café',
    'Grãos',
    'Avicultura'
  ]

  tipos_de_transformador = [
    'Processamento e negócio Café',
    'Processamento e negócio grãos'
  ]

  resultados_da_visita = ['Inquérito em Elaboração',
    //'Incomunicavel: não atende',
    'Incontactável: N° tel errado',
    'Pendente por falta de documento',
    'Recusada: actividade inelegível',
    //'Recusada: MI duplicada',
    'Recusada: proponente desistiu',
    'Recusada por falta dos 10%',
    'Recusado por dívida',
    'Recusada: zona inelegível',
    'Recusada por falta de documentação legal',
    'Didas teste'
  ]

  resultados_De_Contacto = ['A ser visitada',
    'Incomunicavel: Não atende',
    'Incomunicavel: Nº Tel errado',
    'Pendente por falta de documento',
    'Recusada: actividade inelegivel',
    // 'Recusada: MI duplicada',
    'Recusada: proponente desistiu',
    'Recusada por falta dos 10%',
    'Recusada por divida',
    'Recusada: Zona ilegivel',
    'Recusada por falta de documentação legal',
    //  'Didas teste'
  ];
  provincias = ['Huila', 'Huambo', 'Cuanza Sul', 'Bié'];
  municipios: any;
  municipio: any;
  docs: any;
  selectedParc: any;
  parceiros: any;



  MI_duplida() {

  }

  loadTipoNegocio() {
    switch (this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      case 'Productor':
        this.docs = [
          'Tuberculos',
          'Café',
          'Grãos',
          'Avicultura'
        ]
        break;
      case 'Agregador':
        this.docs = [
          'Descasque',
          'Seleção',
          'embalagem'
        ]
        break;
      case 'Transformador':
        this.docs = [
          'Processamento e negócio Café',
          'Processamento e negócio grãos'
        ]
        break;
      case 'Prestador de serviços':
        this.docs = [
          'mecanizacao',
          'comercializacao',
          'insumos/sementes',
          'transporte',
          'Construçao'
        ]
        break;
      default:
        this.docs = [];
    }
  }

  carregardocs3() {
    switch (this.angForm.get('resultado_da_visita')?.value) {
      case 'A ser visitada':
        this.docs = ['Título de terra',
          'croquis de localização',
          'alvará comercial',
          'certidão comercia',
          'certidão de Não devedor da AGT',
          'INSS',
          'BI',
          'NIF',
          'Otro'];
        break;
      case 'Recusada por falta de documentação legal':
        this.docs = ['Título de terra',
          'croquis de localização',
          'alvará comercial',
          'certidão comercia',
          'certidão de Não devedor da AGT',
          'INSS',
          'BI',
          'NIF',
          'Otro'];
        break;
      case 'Pendente por falta de documento':
        this.docs = ['Título de terra',
          'croquis de localização',
          'alvará comercial',
          'certidão comercia',
          'certidão de Não devedor da AGT',
          'INSS',
          'BI',
          'NIF',
          'Otro'];
        break;
      case 'Recusada: MI duplicada':
        this.docs = ['Pendestes da M. Interesse'];
        break;
      case 'Inquérito em Elaboração':
        this.docs = ['data'];
        break;
      default:
        this.docs = [];
    }

  }

  carregardocs2() {
    switch (this.angForm.get('resultado_1_contacto')?.value) {
      case 'Recusada por falta de documentação legal':
        this.docs = ['Título de terra',
          'croquis de localização',
          'alvará comercial',
          'certidão comercia',
          'certidão de Não devedor da AGT',
          'INSS',
          'BI',
          'NIF',
          'Otro'];
        break;
      case 'Pendente por falta de documento':
        this.docs = ['Título de terra',
          'croquis de localização',
          'alvará comercial',
          'certidão comercia',
          'certidão de Não devedor da AGT',
          'INSS',
          'BI',
          'NIF',
          'Otro'];
        break;
      case 'Recusada: MI duplicada':
        this.docs = ['Pendestes da M. Interesse'];
        break;
      default:
        this.docs = [];
    }
  }

  carregarMunicipios() {
    switch (this.angForm.get('provincia')?.value) {
      case 'Huila':
        this.municipios = ['Caconda', 'Caluquembe', 'Chicomba'];
        break;
      case 'Cuanza Sul':
        this.municipios = ['Amboim', 'Cassongue', 'Cela', 'Ebo', 'Libolo', 'Mussende', 'Quibala', 'Quilenda', 'Seles', 'Sumbe'];
        break;
      case 'Huambo':
        this.municipios = ['Bailundo', 'Caála', 'Ecunha', 'Huambo', 'Mungo'];
        break;
      case 'Bié':
        this.municipios = ['Camacupa', 'Catabola', 'Chinguar'];
        break;
      default:
        this.municipios = [];
    }
  }

  reloadOnce: any;

  inqueritos: any;
  sideBarOpen = true;
  modalRef: MdbModalRef<AddInqueritoComponent> | null = null;

  provincia: any;
  interest_expression: any;
  manifestacao: any;
  inquiridor: any;

  data: any;
  prop_name: any;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private route: Router,
    private location: Location,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.angForm = this.fb.group({
      nome_simplificado: [''],
      provincia: ['', Validators.required],
      municipio: ['', Validators.required],
      aldeia: ['', Validators.required],
      data_1_contacto: ['', Validators.required],
      resultado_1_contacto: ['', Validators.required],
      documento_em_falta: this.fb.array(Array(5).fill('sem falta'), Validators.required),
      documento_em_falta_2: this.fb.array(Array(5).fill('sem falta'), Validators.required),
      documento_em_falta_3: this.fb.array(Array(5).fill('sem falta'), Validators.required),
      documento_em_falta_4: this.fb.array(Array(5).fill('sem falta'), Validators.required),
      duplicada_da: [''],
      data_1_visita: ['', Validators.required],
      resultado_da_visita: ['', Validators.required],
      duplicada_da_2: [''],
      data_validacao_inquerito: ['', Validators.required],
      que_tipo_de_negocio_esta: ['', Validators.required],
      em_qual_cadeia_de_valor_vai_se_implementar_o_projecto: ['', Validators.required],
      que_tipo: ['', Validators.required],
      que_tipo_2: ['', Validators.required],
      que_tipo_3: ['', Validators.required],
      status: [''],
      created_at: [''],
      manifestacao_de_interesse: ['', Validators.required],
      inqueridor: ['', Validators.required],
      didasTeste: [false],
      inquerito_preenchido: ['', Validators.required],
      documents: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.get_farm_names();
    this.get_interest_express();
    this.get_inquirier();
    this.get_inquireForms();
    this.getProvincia();
    this.getPdac();
    this.getUserFrontOFF();
    this.get_inquireFormsByPendentes();

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });
    //this.resultados_De_Contacto.sort((a, b) => a.localeCompare(b));

  }


  getProvincia() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provincia = data;
    })
  }

  getPdac() {
    this.dataService.proponentPDAC().subscribe(data => {
      this.pdac = data;
      this.prop_name = data.map(pdac => pdac['s2gp/s2g1q1/prop_nome'])
      console.log('array pdac apenas nomes', this.prop_name)
      this.pdac = this.pdac.sort(function (a: any, b: any) {
        return b._id - a._id
      })
    })
  }

  onChangeValorSelecionado(event: any) {
    this.prop_name = event;
    console.log(this.prop_name['s2gp/s2g1q1/prop_nome'])
    //this.prop_name); // Chamada da sua função com o valor selecionado
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInqueritoComponent)
  }


  // Guarda dados do form caso a MI for duplicada
  save_inquerito2() {

    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      if (!this.angForm.get('manifestacao_de_interesse')?.value) {
        this.alert_error_MI();
      }
      return;
    }

   /* if (!this.angForm.get('provincia')?.value) {
      if (!this.angForm.get('provincia')?.value) {
        this.alert_error_MI();
      }
      return;
    }*/

    let fileList: FileList = this.selectedFile;
    let documents: FileList = fileList;

    let fileList2: FileList = this.selectedFile2;
    let inquerito_preenchido: FileList = fileList2;
    // let inquerito_preenchido: File | undefined = fileList2.length > 0 ? fileList2[0] : undefined;

    let formData = new FormData();

    for (let i = 0; i < documents?.length; i++) {
      formData.append("files", documents[i], documents[i].name);
    }

    // Verificar se há um arquivo selecionado
    if (this.selectedFile2 && this.selectedFile2?.length > 0) {
      const inqueritoPreenchido = this.selectedFile2[0];

      // Verificar se o arquivo não está vazio
      if (inqueritoPreenchido.size > 0) {
        formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
      }
    }

    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("provincia", this.angForm.get('provincia')?.value);
    formData.append("municipio", this.angForm.get('municipio')?.value);
    formData.append("aldeia", this.angForm.get('aldeia')?.value);
    formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
    formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
    formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
    formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
    formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
    formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);
    formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
    formData.append("data_1_visita", this.angForm.get('data_1_visita')?.value);
    formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
    formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
    formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
    formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
    formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
    formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
    formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
    formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);
    formData.append("status", this.angForm.get('status')?.value);
    formData.append("created_at", this.angForm.get('created_at')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

    this.dataService.salvaInquireForm(formData).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }

    )

    this.get_inquireForms();
    // this.clearInput();
    this.route.navigate(['inquerito/']);

  }

  // Guarda até a opção resultado da visita no campo resultado do primeiro contacto
  save_inquerito_2_parte() {

    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      if (!this.angForm.get('manifestacao_de_interesse')?.value) {
        this.alert_error_MI();
      }
      return;
    }

    if (!this.angForm.get('inqueridor')?.value) {
      if (!this.angForm.get('inqueridor')?.value) {
        this.alert_error_Inqueridor();
      }
      return;
    }

   if (!this.angForm.get('provincia')?.value) {
      if (!this.angForm.get('provincia')?.value) {
        this.alert_error_Prov();
      }
      return;
    }

    if (!this.angForm.get('municipio')?.value) {
      if (!this.angForm.get('municipio')?.value) {
        this.alert_error_Mun();
      }
      return;
    }

    if (!this.angForm.get('aldeia')?.value) {
      if (!this.angForm.get('aldeia')?.value) {
        this.alert_error_Ald();
      }
      return;
    }

    if (!this.angForm.get('data_1_contacto')?.value) {
      if (!this.angForm.get('data_1_contacto')?.value) {
        this.alert_error_Dat_1_con();
      }
      return;
    }

    if (!this.angForm.get('resultado_1_contacto')?.value) {
      if (!this.angForm.get('resultado_1_contacto')?.value) {
        this.alert_error_Result_1_con();
      }
      return;
    }

    let fileList: FileList = this.selectedFile;
    let documents: FileList = fileList;

    let fileList2: FileList = this.selectedFile2;
    let inquerito_preenchido: FileList = fileList2;
    // let inquerito_preenchido: File | undefined = fileList2.length > 0 ? fileList2[0] : undefined;

    let formData = new FormData();

    for (let i = 0; i < documents?.length; i++) {
      formData.append("files", documents[i], documents[i].name);
    }

    // Verificar se há um arquivo selecionado
    if (this.selectedFile2 && this.selectedFile2?.length > 0) {
      const inqueritoPreenchido = this.selectedFile2[0];

      // Verificar se o arquivo não está vazio
      if (inqueritoPreenchido.size > 0) {
        formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
      }
    }

    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("provincia", this.angForm.get('provincia')?.value);
    formData.append("municipio", this.angForm.get('municipio')?.value);
    formData.append("aldeia", this.angForm.get('aldeia')?.value);
    formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
    formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
    formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
    formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
    formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
    formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);
    formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
    formData.append("data_1_visita", this.angForm.get('data_1_visita')?.value);
    formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
    formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
    formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
    formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
    formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
    formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
    formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
    formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);
    formData.append("status", this.angForm.get('status')?.value);
    formData.append("created_at", this.angForm.get('created_at')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

    this.dataService.salvaInquireForm(formData).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }

    )

    this.get_inquireForms();
    // this.clearInput();
    this.route.navigate(['inquerito/']);

  }

  // Guarda até o campo resultado da visita
  save_inquerito_3_parte() {

    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      if (!this.angForm.get('manifestacao_de_interesse')?.value) {
        this.alert_error_MI();
      }
      return;
    }

    if (!this.angForm.get('inqueridor')?.value) {
      if (!this.angForm.get('inqueridor')?.value) {
        this.alert_error_Inqueridor();
      }
      return;
    }

   if (!this.angForm.get('provincia')?.value) {
      if (!this.angForm.get('provincia')?.value) {
        this.alert_error_Prov();
      }
      return;
    }

    if (!this.angForm.get('municipio')?.value) {
      if (!this.angForm.get('municipio')?.value) {
        this.alert_error_Mun();
      }
      return;
    }

    if (!this.angForm.get('aldeia')?.value) {
      if (!this.angForm.get('aldeia')?.value) {
        this.alert_error_Ald();
      }
      return;
    }

    if (!this.angForm.get('data_1_contacto')?.value) {
      if (!this.angForm.get('data_1_contacto')?.value) {
        this.alert_error_Dat_1_con();
      }
      return;
    }

    
    if (!this.angForm.get('resultado_1_contacto')?.value) {
      if (!this.angForm.get('resultado_1_contacto')?.value) {
        this.alert_error_Result_1_con();
      }
      return;
    }

    if (!this.angForm.get('data_1_visita')?.value) {
      if (!this.angForm.get('data_1_visita')?.value) {
        this.alert_error_Dat_1_vis();
      }
      return;
    }

    if (!this.angForm.get('resultado_da_visita')?.value) {
      if (!this.angForm.get('resultado_da_visita')?.value) {
        this.alert_error_Result();
      }
      return;
    }

    let fileList: FileList = this.selectedFile;
    let documents: FileList = fileList;

    let fileList2: FileList = this.selectedFile2;
    let inquerito_preenchido: FileList = fileList2;
    // let inquerito_preenchido: File | undefined = fileList2.length > 0 ? fileList2[0] : undefined;

    let formData = new FormData();

    for (let i = 0; i < documents?.length; i++) {
      formData.append("files", documents[i], documents[i].name);
    }

    // Verificar se há um arquivo selecionado
    if (this.selectedFile2 && this.selectedFile2?.length > 0) {
      const inqueritoPreenchido = this.selectedFile2[0];

      // Verificar se o arquivo não está vazio
      if (inqueritoPreenchido.size > 0) {
        formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
      }
    }

    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("provincia", this.angForm.get('provincia')?.value);
    formData.append("municipio", this.angForm.get('municipio')?.value);
    formData.append("aldeia", this.angForm.get('aldeia')?.value);
    formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
    formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
    formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
    formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
    formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
    formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);
    formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
    formData.append("data_1_visita", this.angForm.get('data_1_visita')?.value);
    formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
    formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
    formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
    formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
    formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
    formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
    formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
    formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);
    formData.append("status", this.angForm.get('status')?.value);
    formData.append("created_at", this.angForm.get('created_at')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

    this.dataService.salvaInquireForm(formData).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }

    )

    this.get_inquireForms();
    // this.clearInput();
    this.route.navigate(['inquerito/']);

  }

  // Guarda apartir do campo resultado da visita na opção Inquérito elaborado
  save_inquerito_4_parte() {

    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      if (!this.angForm.get('manifestacao_de_interesse')?.value) {
        this.alert_error_MI();
      }
      return;
    }

    if (!this.angForm.get('inqueridor')?.value) {
      if (!this.angForm.get('inqueridor')?.value) {
        this.alert_error_Inqueridor();
      }
      return;
    }

   if (!this.angForm.get('provincia')?.value) {
      if (!this.angForm.get('provincia')?.value) {
        this.alert_error_Prov();
      }
      return;
    }

    if (!this.angForm.get('municipio')?.value) {
      if (!this.angForm.get('municipio')?.value) {
        this.alert_error_Mun();
      }
      return;
    }

    if (!this.angForm.get('aldeia')?.value) {
      if (!this.angForm.get('aldeia')?.value) {
        this.alert_error_Ald();
      }
      return;
    }

    if (!this.angForm.get('data_1_contacto')?.value) {
      if (!this.angForm.get('data_1_contacto')?.value) {
        this.alert_error_Dat_1_con();
      }
      return;
    }

    
    if (!this.angForm.get('resultado_1_contacto')?.value) {
      if (!this.angForm.get('resultado_1_contacto')?.value) {
        this.alert_error_Result_1_con();
      }
      return;
    }

    if (!this.angForm.get('data_1_visita')?.value) {
      if (!this.angForm.get('data_1_visita')?.value) {
        this.alert_error_Dat_1_vis();
      }
      return;
    }

    if (!this.angForm.get('resultado_da_visita')?.value) {
      if (!this.angForm.get('resultado_da_visita')?.value) {
        this.alert_error_Result();
      }
      return;
    }

    if (!this.angForm.get('data_validacao_inquerito')?.value) {
      if (!this.angForm.get('data_validacao_inquerito')?.value) {
        this.alert_error_Dat_val_inq();
      }
      return;
    }

    if (!this.angForm.get('inquerito_preenchido')?.value) {
      if (!this.angForm.get('inquerito_preenchido')?.value) {
        this.alert_error_Inq_pre();
      }
      return;
    }

    if (!this.angForm.get('documents')?.value) {
      if (!this.angForm.get('documents')?.value) {
        this.alert_error_Docs();
      }
      return;
    }

    if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
        this.alert_error_Que_tipo_negocio();
      }
      return;
    }

    if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
      if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
        this.alert_error_Em_qual_cadeia();
      }
      return;
    }

    
    


    let fileList: FileList = this.selectedFile;
    let documents: FileList = fileList;

    let fileList2: FileList = this.selectedFile2;
    let inquerito_preenchido: FileList = fileList2;
    // let inquerito_preenchido: File | undefined = fileList2.length > 0 ? fileList2[0] : undefined;

    let formData = new FormData();

    for (let i = 0; i < documents?.length; i++) {
      formData.append("files", documents[i], documents[i].name);
    }

    // Verificar se há um arquivo selecionado
    if (this.selectedFile2 && this.selectedFile2?.length > 0) {
      const inqueritoPreenchido = this.selectedFile2[0];

      // Verificar se o arquivo não está vazio
      if (inqueritoPreenchido.size > 0) {
        formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
      }
    }

    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("provincia", this.angForm.get('provincia')?.value);
    formData.append("municipio", this.angForm.get('municipio')?.value);
    formData.append("aldeia", this.angForm.get('aldeia')?.value);
    formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
    formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
    formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
    formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
    formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
    formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);
    formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
    formData.append("data_1_visita", this.angForm.get('data_1_visita')?.value);
    formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
    formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
    formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
    formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
    formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
    formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
    formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
    formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);
    formData.append("status", this.angForm.get('status')?.value);
    formData.append("created_at", this.angForm.get('created_at')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

    this.dataService.salvaInquireForm(formData).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }

    )

    this.get_inquireForms();
    // this.clearInput();
    this.route.navigate(['inquerito/']);

  }

  // Guarda até produtor
  save_inquerito_5_parte() {

    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      if (!this.angForm.get('manifestacao_de_interesse')?.value) {
        this.alert_error_MI();
      }
      return;
    }

    if (!this.angForm.get('inqueridor')?.value) {
      if (!this.angForm.get('inqueridor')?.value) {
        this.alert_error_Inqueridor();
      }
      return;
    }

   if (!this.angForm.get('provincia')?.value) {
      if (!this.angForm.get('provincia')?.value) {
        this.alert_error_Prov();
      }
      return;
    }

    if (!this.angForm.get('municipio')?.value) {
      if (!this.angForm.get('municipio')?.value) {
        this.alert_error_Mun();
      }
      return;
    }

    if (!this.angForm.get('aldeia')?.value) {
      if (!this.angForm.get('aldeia')?.value) {
        this.alert_error_Ald();
      }
      return;
    }

    if (!this.angForm.get('data_1_contacto')?.value) {
      if (!this.angForm.get('data_1_contacto')?.value) {
        this.alert_error_Dat_1_con();
      }
      return;
    }

    
    if (!this.angForm.get('resultado_1_contacto')?.value) {
      if (!this.angForm.get('resultado_1_contacto')?.value) {
        this.alert_error_Result_1_con();
      }
      return;
    }

    if (!this.angForm.get('data_1_visita')?.value) {
      if (!this.angForm.get('data_1_visita')?.value) {
        this.alert_error_Dat_1_vis();
      }
      return;
    }

    if (!this.angForm.get('resultado_da_visita')?.value) {
      if (!this.angForm.get('resultado_da_visita')?.value) {
        this.alert_error_Result();
      }
      return;
    }

    if (!this.angForm.get('data_validacao_inquerito')?.value) {
      if (!this.angForm.get('data_validacao_inquerito')?.value) {
        this.alert_error_Dat_val_inq();
      }
      return;
    }

    if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
        this.alert_error_Que_tipo_negocio();
      }
      return;
    }

    if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
      if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
        this.alert_error_Em_qual_cadeia();
      }
      return;
    }

    if (!this.angForm.get('que_tipo')?.value) {
      if (!this.angForm.get('que_tipo')?.value) {
        this.alert_error_produtor();
      }
      return;
    }

    if (!this.angForm.get('que_tipo_2')?.value) {
      if (!this.angForm.get('que_tipo_2')?.value) {
        this.alert_error_Agregador();
      }
      return;
    }

    if (!this.angForm.get('que_tipo_3')?.value) {
      if (!this.angForm.get('que_tipo_3')?.value) {
        this.alert_error_Transform();
      }
      return;
    }

    if (!this.angForm.get('inquerito_preenchido')?.value) {
      if (!this.angForm.get('inquerito_preenchido')?.value) {
        this.alert_error_Inq_pre();
      }
      return;
    }

    if (!this.angForm.get('documents')?.value) {
      if (!this.angForm.get('documents')?.value) {
        this.alert_error_Docs();
      }
      return;
    }


    let fileList: FileList = this.selectedFile;
    let documents: FileList = fileList;

    let fileList2: FileList = this.selectedFile2;
    let inquerito_preenchido: FileList = fileList2;
    // let inquerito_preenchido: File | undefined = fileList2.length > 0 ? fileList2[0] : undefined;

    let formData = new FormData();

    for (let i = 0; i < documents?.length; i++) {
      formData.append("files", documents[i], documents[i].name);
    }

    // Verificar se há um arquivo selecionado
    if (this.selectedFile2 && this.selectedFile2?.length > 0) {
      const inqueritoPreenchido = this.selectedFile2[0];

      // Verificar se o arquivo não está vazio
      if (inqueritoPreenchido.size > 0) {
        formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
      }
    }

    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("provincia", this.angForm.get('provincia')?.value);
    formData.append("municipio", this.angForm.get('municipio')?.value);
    formData.append("aldeia", this.angForm.get('aldeia')?.value);
    formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
    formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
    formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
    formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
    formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
    formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);
    formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
    formData.append("data_1_visita", this.angForm.get('data_1_visita')?.value);
    formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
    formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
    formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
    formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
    formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
    formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
    formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
    formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);
    formData.append("status", this.angForm.get('status')?.value);
    formData.append("created_at", this.angForm.get('created_at')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

    this.dataService.salvaInquireForm(formData).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }

    )

    this.get_inquireForms();
    // this.clearInput();
    this.route.navigate(['inquerito/']);

  }

  // Guarda até agregador
  save_inquerito_6_parte() {

    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      if (!this.angForm.get('manifestacao_de_interesse')?.value) {
        this.alert_error_MI();
      }
      return;
    }

    if (!this.angForm.get('inqueridor')?.value) {
      if (!this.angForm.get('inqueridor')?.value) {
        this.alert_error_Inqueridor();
      }
      return;
    }

   if (!this.angForm.get('provincia')?.value) {
      if (!this.angForm.get('provincia')?.value) {
        this.alert_error_Prov();
      }
      return;
    }

    if (!this.angForm.get('municipio')?.value) {
      if (!this.angForm.get('municipio')?.value) {
        this.alert_error_Mun();
      }
      return;
    }

    if (!this.angForm.get('aldeia')?.value) {
      if (!this.angForm.get('aldeia')?.value) {
        this.alert_error_Ald();
      }
      return;
    }

    if (!this.angForm.get('data_1_contacto')?.value) {
      if (!this.angForm.get('data_1_contacto')?.value) {
        this.alert_error_Dat_1_con();
      }
      return;
    }

    
    if (!this.angForm.get('resultado_1_contacto')?.value) {
      if (!this.angForm.get('resultado_1_contacto')?.value) {
        this.alert_error_Result_1_con();
      }
      return;
    }

    if (!this.angForm.get('data_1_visita')?.value) {
      if (!this.angForm.get('data_1_visita')?.value) {
        this.alert_error_Dat_1_vis();
      }
      return;
    }

    if (!this.angForm.get('resultado_da_visita')?.value) {
      if (!this.angForm.get('resultado_da_visita')?.value) {
        this.alert_error_Result();
      }
      return;
    }

    if (!this.angForm.get('data_validacao_inquerito')?.value) {
      if (!this.angForm.get('data_validacao_inquerito')?.value) {
        this.alert_error_Dat_val_inq();
      }
      return;
    }

    if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
        this.alert_error_Que_tipo_negocio();
      }
      return;
    }

    if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
      if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
        this.alert_error_Em_qual_cadeia();
      }
      return;
    }

    if (!this.angForm.get('que_tipo')?.value) {
      if (!this.angForm.get('que_tipo')?.value) {
        this.alert_error_Agregador();
      }
      return;
    }

    if (!this.angForm.get('inquerito_preenchido')?.value) {
      if (!this.angForm.get('inquerito_preenchido')?.value) {
        this.alert_error_Inq_pre();
      }
      return;
    }

    if (!this.angForm.get('documents')?.value) {
      if (!this.angForm.get('documents')?.value) {
        this.alert_error_Docs();
      }
      return;
    }


    let fileList: FileList = this.selectedFile;
    let documents: FileList = fileList;

    let fileList2: FileList = this.selectedFile2;
    let inquerito_preenchido: FileList = fileList2;
    // let inquerito_preenchido: File | undefined = fileList2.length > 0 ? fileList2[0] : undefined;

    let formData = new FormData();

    for (let i = 0; i < documents?.length; i++) {
      formData.append("files", documents[i], documents[i].name);
    }

    // Verificar se há um arquivo selecionado
    if (this.selectedFile2 && this.selectedFile2?.length > 0) {
      const inqueritoPreenchido = this.selectedFile2[0];

      // Verificar se o arquivo não está vazio
      if (inqueritoPreenchido.size > 0) {
        formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
      }
    }

    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("provincia", this.angForm.get('provincia')?.value);
    formData.append("municipio", this.angForm.get('municipio')?.value);
    formData.append("aldeia", this.angForm.get('aldeia')?.value);
    formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
    formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
    formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
    formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
    formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
    formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);
    formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
    formData.append("data_1_visita", this.angForm.get('data_1_visita')?.value);
    formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
    formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
    formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
    formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
    formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
    formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
    formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
    formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);
    formData.append("status", this.angForm.get('status')?.value);
    formData.append("created_at", this.angForm.get('created_at')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

    this.dataService.salvaInquireForm(formData).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }

    )

    this.get_inquireForms();
    // this.clearInput();
    this.route.navigate(['inquerito/']);

  }

 // Guarda até transformador
 save_inquerito_7_parte() {

  if (!this.angForm.get('manifestacao_de_interesse')?.value) {
    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      this.alert_error_MI();
    }
    return;
  }

  if (!this.angForm.get('inqueridor')?.value) {
    if (!this.angForm.get('inqueridor')?.value) {
      this.alert_error_Inqueridor();
    }
    return;
  }

 if (!this.angForm.get('provincia')?.value) {
    if (!this.angForm.get('provincia')?.value) {
      this.alert_error_Prov();
    }
    return;
  }

  if (!this.angForm.get('municipio')?.value) {
    if (!this.angForm.get('municipio')?.value) {
      this.alert_error_Mun();
    }
    return;
  }

  if (!this.angForm.get('aldeia')?.value) {
    if (!this.angForm.get('aldeia')?.value) {
      this.alert_error_Ald();
    }
    return;
  }

  if (!this.angForm.get('data_1_contacto')?.value) {
    if (!this.angForm.get('data_1_contacto')?.value) {
      this.alert_error_Dat_1_con();
    }
    return;
  }

  
  if (!this.angForm.get('resultado_1_contacto')?.value) {
    if (!this.angForm.get('resultado_1_contacto')?.value) {
      this.alert_error_Result_1_con();
    }
    return;
  }

  if (!this.angForm.get('data_1_visita')?.value) {
    if (!this.angForm.get('data_1_visita')?.value) {
      this.alert_error_Dat_1_vis();
    }
    return;
  }

  if (!this.angForm.get('resultado_da_visita')?.value) {
    if (!this.angForm.get('resultado_da_visita')?.value) {
      this.alert_error_Result();
    }
    return;
  }

  if (!this.angForm.get('data_validacao_inquerito')?.value) {
    if (!this.angForm.get('data_validacao_inquerito')?.value) {
      this.alert_error_Dat_val_inq();
    }
    return;
  }

  if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
    if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      this.alert_error_Que_tipo_negocio();
    }
    return;
  }

  if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
    if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
      this.alert_error_Em_qual_cadeia();
    }
    return;
  }

  if (!this.angForm.get('que_tipo_2')?.value) {
    if (!this.angForm.get('que_tipo_2')?.value) {
      this.alert_error_Transform();
    }
    return;
  }

  if (!this.angForm.get('inquerito_preenchido')?.value) {
    if (!this.angForm.get('inquerito_preenchido')?.value) {
      this.alert_error_Inq_pre();
    }
    return;
  }

  if (!this.angForm.get('documents')?.value) {
    if (!this.angForm.get('documents')?.value) {
      this.alert_error_Docs();
    }
    return;
  }


  let fileList: FileList = this.selectedFile;
  let documents: FileList = fileList;

  let fileList2: FileList = this.selectedFile2;
  let inquerito_preenchido: FileList = fileList2;
  // let inquerito_preenchido: File | undefined = fileList2.length > 0 ? fileList2[0] : undefined;

  let formData = new FormData();

  for (let i = 0; i < documents?.length; i++) {
    formData.append("files", documents[i], documents[i].name);
  }

  // Verificar se há um arquivo selecionado
  if (this.selectedFile2 && this.selectedFile2?.length > 0) {
    const inqueritoPreenchido = this.selectedFile2[0];

    // Verificar se o arquivo não está vazio
    if (inqueritoPreenchido.size > 0) {
      formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
    }
  }

  formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
  formData.append("provincia", this.angForm.get('provincia')?.value);
  formData.append("municipio", this.angForm.get('municipio')?.value);
  formData.append("aldeia", this.angForm.get('aldeia')?.value);
  formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
  formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
  formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
  formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
  formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
  formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);
  formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
  formData.append("data_1_visita", this.angForm.get('data_1_visita')?.value);
  formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
  formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
  formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
  formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
  formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
  formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
  formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
  formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);
  formData.append("status", this.angForm.get('status')?.value);
  formData.append("created_at", this.angForm.get('created_at')?.value);
  formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
  formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
  formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

  this.dataService.salvaInquireForm(formData).subscribe(
    success => { this.alert_success(); },
    error => { this.alert_error(); }

  )

  this.get_inquireForms();
  // this.clearInput();
  this.route.navigate(['inquerito/']);

}

// Guarda até prestador de servicos
save_inquerito_8_parte() {

  if (!this.angForm.get('manifestacao_de_interesse')?.value) {
    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      this.alert_error_MI();
    }
    return;
  }

  if (!this.angForm.get('inqueridor')?.value) {
    if (!this.angForm.get('inqueridor')?.value) {
      this.alert_error_Inqueridor();
    }
    return;
  }

 if (!this.angForm.get('provincia')?.value) {
    if (!this.angForm.get('provincia')?.value) {
      this.alert_error_Prov();
    }
    return;
  }

  if (!this.angForm.get('municipio')?.value) {
    if (!this.angForm.get('municipio')?.value) {
      this.alert_error_Mun();
    }
    return;
  }

  if (!this.angForm.get('aldeia')?.value) {
    if (!this.angForm.get('aldeia')?.value) {
      this.alert_error_Ald();
    }
    return;
  }

  if (!this.angForm.get('data_1_contacto')?.value) {
    if (!this.angForm.get('data_1_contacto')?.value) {
      this.alert_error_Dat_1_con();
    }
    return;
  }

  
  if (!this.angForm.get('resultado_1_contacto')?.value) {
    if (!this.angForm.get('resultado_1_contacto')?.value) {
      this.alert_error_Result_1_con();
    }
    return;
  }

  if (!this.angForm.get('data_1_visita')?.value) {
    if (!this.angForm.get('data_1_visita')?.value) {
      this.alert_error_Dat_1_vis();
    }
    return;
  }

  if (!this.angForm.get('resultado_da_visita')?.value) {
    if (!this.angForm.get('resultado_da_visita')?.value) {
      this.alert_error_Result();
    }
    return;
  }

  if (!this.angForm.get('data_validacao_inquerito')?.value) {
    if (!this.angForm.get('data_validacao_inquerito')?.value) {
      this.alert_error_Dat_val_inq();
    }
    return;
  }

  if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
    if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      this.alert_error_Que_tipo_negocio();
    }
    return;
  }

  if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
    if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
      this.alert_error_Em_qual_cadeia();
    }
    return;
  }

  if (!this.angForm.get('que_tipo_3')?.value) {
    if (!this.angForm.get('que_tipo_3')?.value) {
      this.alert_error_Prestador();
    }
    return;
  }

  if (!this.angForm.get('inquerito_preenchido')?.value) {
    if (!this.angForm.get('inquerito_preenchido')?.value) {
      this.alert_error_Inq_pre();
    }
    return;
  }

  if (!this.angForm.get('documents')?.value) {
    if (!this.angForm.get('documents')?.value) {
      this.alert_error_Docs();
    }
    return;
  }


  let fileList: FileList = this.selectedFile;
  let documents: FileList = fileList;

  let fileList2: FileList = this.selectedFile2;
  let inquerito_preenchido: FileList = fileList2;
  // let inquerito_preenchido: File | undefined = fileList2.length > 0 ? fileList2[0] : undefined;

  let formData = new FormData();

  for (let i = 0; i < documents?.length; i++) {
    formData.append("files", documents[i], documents[i].name);
  }

  // Verificar se há um arquivo selecionado
  if (this.selectedFile2 && this.selectedFile2?.length > 0) {
    const inqueritoPreenchido = this.selectedFile2[0];

    // Verificar se o arquivo não está vazio
    if (inqueritoPreenchido.size > 0) {
      formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
    }
  }

  formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
  formData.append("provincia", this.angForm.get('provincia')?.value);
  formData.append("municipio", this.angForm.get('municipio')?.value);
  formData.append("aldeia", this.angForm.get('aldeia')?.value);
  formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
  formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
  formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
  formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
  formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
  formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);
  formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
  formData.append("data_1_visita", this.angForm.get('data_1_visita')?.value);
  formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
  formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
  formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
  formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
  formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
  formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
  formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
  formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);
  formData.append("status", this.angForm.get('status')?.value);
  formData.append("created_at", this.angForm.get('created_at')?.value);
  formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
  formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
  formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

  this.dataService.salvaInquireForm(formData).subscribe(
    success => { this.alert_success(); },
    error => { this.alert_error(); }

  )

  this.get_inquireForms();
  // this.clearInput();
  this.route.navigate(['inquerito/']);

}


  // Limpa todos os campos do formulario incluindo o formArray
  resetForm() {
    const excludedFields = ['data_1_contacto', 'data_1_visita', 'data_validacao_inquerito', 'created_at'];
  
    Object.keys(this.angForm.controls).forEach((controlName) => {
      if (!excludedFields.includes(controlName)) {
        this.angForm.get(controlName)?.reset();
      }
    });
  
    this.angForm.markAsUntouched();
    this.angForm.markAsPristine();
  }

  goBack(): void {
    this.location.back();
  }

  deleteInquire(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      text: "Você está prestes a eliminar este Inquérito!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.deleteInquireForm(id).subscribe(
          success => { this.get_inquireForms() },
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

  get_inquireForms() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data;
      console.log('inquérito', data)
    })
  }

  // nome_simplificado duplicados
  get_inquireFormsByPendentes() {
    this.dataService.get_InquireForm().subscribe(data => {
      const simplifiedNames = data.map(inqueritos => inqueritos.nome_simplificado);
      this.duplicateNames = simplifiedNames.filter((name, index) => simplifiedNames.indexOf(name) !== index);
      console.log('nome_simplificado duplicados', this.duplicateNames);
    });
  }

  alert_error() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alguma coisa correu mal, verifique se preencheu os campos correctamente.",
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

  alert_error_MI() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo de Manifestação de Interesse",
    })
  }

  alert_error_Prov() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo província",
    })
  }

  alert_error_Mun() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo Município",
    })
  }

  alert_error_Ald() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo Aldeia",
    })
  }

  alert_error_Dat_1_con() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo de Data do primeiro contacto",
    })
  }

  alert_error_Dat_1_vis() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo de Data da primeira visita",
    })
  }

  alert_error_Result() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo de Resultado da visita",
    })
  }

  alert_error_Result_1_con() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo de Resultado do primeiro contacto",
    })
  }

  alert_error_Dat_val_inq() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo de Data da validação do inquérito",
    })
  }

  alert_error_Que_tipo_negocio() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo que Tipo de negócio está",
    })
  }

  alert_error_Em_qual_cadeia() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo Em qual cadeia de valor vai se implementar o projeto",
    })
  }

  alert_error_produtor() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo Que tipo de Produtor",
    })
  }

  alert_error_Agregador() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo Que tipo de Agregador",
    })
  }

  alert_error_Transform() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo Que tipo de Transformador",
    })
  }

  alert_error_Prestador() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo Que tipo de prestador de serviço",
    })
  }

  alert_error_Inqueridor() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo Inqueridor",
    })
  }

  alert_error_Inq_pre() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo de Inquérito preenchido",
    })
  }

  alert_error_Docs() {
    Swal.fire({
      icon: "error",
      //title: "Oops...",
      text: "Por favor, preencha o campo de Documentos do proponente",
    })
  }

  get_interest_express() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.manifestacao = data;
      //console.log('manifestacao: ', data)

    })

  }

  // obter o nome da fazenda (nome_simplificado) da janela back off
  get_farm_names() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.manifestacao = data;
      const farmNames = data.map(item => item.farm_name);
      console.log('farm_names ou nomes simplificados: ', farmNames);
    });
  }


  get_inquirier() {
    this.dataService.get_Inquiriers().subscribe(data => {
      this.inquiridor = data;
      //console.log('inqiridor: ', data)
    })
  }

  // filtrar usuarios do departamento front off
  getUserFrontOFF() {
    this.dataService.getUser().subscribe(data => {
      this.userFrontOff = data.filter(user => user.department === 'Front Off');
      console.log('users do front off: ', data)
    })
  }

  goToInquiridor() {
    this.modalRef?.close();
    this.route.navigate(['inquiridor'])
  }

  // muda o comportamento da checkbox sim ou não
  onChangeyes_(event: any) {
    this.angForm.patchValue({
      duplicada_da: event.target.value === this.opcoes[0]
    });
    if (this.angForm.get('duplicada_da')!.value === this.opcoes[0]) {
      // this.opcoes[0] = ''
    } else {
      // this.duplicada_da == false
    }

  }

  onChangeyes(event: any) {
    const selectedOption = event.target.value;
    this.angForm.patchValue({
      duplicada_da: selectedOption === 'Sim' ? null : ''
    });
  }

  showDuplicatedInput: boolean = false;
  duplicatedName: string = '';

  showInput(show: boolean) {
    this.showDuplicatedInput = show;
    this.angForm.get('duplicada_da');
    if (!show) {
      this.duplicatedName = ''; // Limpa o valor do input quando for ocultado
    }
  }

  onSelectedFile(e: any) {
    this.selectedFile = e.target.files;
    console.log('doc selected', this.selectedFile)
  }

  onSelectedFile2(e: any) {
    this.selectedFile2 = e.target.files;
    console.log('doc selected 2', this.selectedFile2)
  }

}
