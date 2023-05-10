import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-edit-inquerito',
  templateUrl: './edit-inquerito.component.html',
  styleUrls: ['./edit-inquerito.component.scss']
})
export class EditInqueritoComponent implements OnInit {

  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  pdac: any;
  opcoes = ['Sim', 'Nao']
  opcoesDidasTeste = ['Nao']

  angForm!: FormGroup;
  sideBarOpen = true;
  id: any;

  inquiridor: any;
  manifestacao: any;
  inquerito: any;
  inqueritos: any;
  provincia: any;
  provincias = ['Huila', 'Huambo', 'Cuanza Sul', 'Bié'];
  municipios: any;
  municipio: any;
  docs: any;

  Inquerito_pendente: any;
  manifestacao_de_interesse: any;
  duplicada_da: any;
  nome_simplificado: any;
  userFrontOff: any;
  inquerito_preenchido!: File;
  aldeia: any;
  data_1_contacto?: string;
  resultado_1_contacto: any;
  documento_em_falta?: ["Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs"];
  documento_em_falta_2?: ["Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs"];
  data_1_visita?: string;
  resultado_da_visita: any;
  documento_em_falta_3?: ["Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs"];
  documento_em_falta_4?: ["Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs", "Sem Docs"];
  duplicada_da_2: any;
  data_validacao_inquerito: any;
  que_tipo_de_negocio_esta: any;
  em_qual_cadeia_de_valor_vai_se_implementar_o_projecto: any;
  que_tipo: any;
  que_tipo_2: any;
  que_tipo_3: any;
  status: any;
  inqueridor: any;
  created_at: any;


  constructor(
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    //private location: Location

  ) {
    this.angForm = this.fb.group({
      nome_simplificado: [''],
      provincia: [''],
      municipio: [''],
      aldeia: [''],
      data_1_contacto: [''],
      resultado_1_contacto: [''],
      documento_em_falta: this.fb.array(Array(9).fill('sem documentos em falta')),
      documento_em_falta_2: this.fb.array(Array(9).fill('sem documentos em falta')),
      documento_em_falta_3: this.fb.array(Array(9).fill('sem documentos em falta')),
      documento_em_falta_4: this.fb.array(Array(9).fill('sem documentos em falta')),
      duplicada_da: [''],
      data_1_visita: [''],
      resultado_da_visita: [''],
      duplicada_da_2: [''],
      data_validacao_inquerito: [''],
      que_tipo_de_negocio_esta: [''],
      em_qual_cadeia_de_valor_vai_se_implementar_o_projecto: [''],
      que_tipo: [''],
      que_tipo_2: [''],
      que_tipo_3: [''],
      status: [''],
      created_at: [''],
      manifestacao_de_interesse: [''],
      inqueridor: [''],
      inquerito_preenchido: [false]
    })
  }

  ngOnInit(): void {
    this.get_inquireFormsByPendentes();
    this.get_inquiridor();
    this.get_interest_express();
    this.get_inquerito();
    this.get_inquireForms();
    this.getPdac();
    this.getUserFrontOFF();



    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        this.dataService.getInqueritoByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });
    });

  }

  update_inquerito(data: any) {

    /* let InquireForm = {
       "nome_simplificado": this.nome_simplificado,
       "provincia": this.provincia,
       "municipio": this.municipio,
       "aldeia": this.aldeia,
       "data_1_contacto": this.data_1_contacto,
       "resultado_1_contacto": this.resultado_1_contacto,
       "documento_em_falta": this.documento_em_falta,
       "documento_em_falta_2": this.documento_em_falta_2,
       "documento_em_falta_3": this.documento_em_falta_3,
       "documento_em_falta_4": this.documento_em_falta_4,
       "duplicada_da": this.duplicada_da,
       "data_1_visita": this.data_1_visita,
       "resultado_da_visita": this.resultado_da_visita,
       "duplicada_da_2": this.duplicada_da_2,
       "data_validacao_inquerito": this.data_validacao_inquerito,
       "que_tipo_de_negocio_esta": this.que_tipo_de_negocio_esta,
       "em_qual_cadeia_de_valor_vai_se_implementar_o_projecto": this.em_qual_cadeia_de_valor_vai_se_implementar_o_projecto,
       "que_tipo": this.que_tipo,
       "que_tipo_2": this.que_tipo_2,
       "que_tipo_3": this.que_tipo_3,
       "status": this.status,
       "created_at": this.created_at,
       "manifestacao_de_interesse": this.manifestacao_de_interesse,
       "inqueridor": this.inqueridor,
       "inquerito_preenchido": this.inquerito_preenchido
     }*/

    if (this.inquerito_preenchido) {
      const formData = new FormData();
      const blob = new Blob([this.inquerito_preenchido], { type: this.inquerito_preenchido.type });
      formData.append('inqerito_preenchido', blob, this.inquerito_preenchido.name);
    }

    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }

    )
    this.get_inquireForms();
    console.log(this.docs)
    this.route.navigate(['inquerito/']);
    //  this.goBack()

  }

  goBack(): void {
    //  (this.location as any).back();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  getPdac() {
    this.dataService.proponentPDAC().subscribe(data => {
      this.pdac = data;
      console.log('pedac array', data)
      this.pdac = this.pdac.sort(function (a: any, b: any) {
        return b._id - a._id
      })

    })

  }


  editInquerito(data: any) {
    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.get_inquerito();
    console.log('documentos selecionados', this.angForm.get('documento_em_falta_2')?.value)
    this.route.navigate(['inquerito/']);
  }

  getUserFrontOFF() {
    this.dataService.getUser().subscribe(data => {
      this.userFrontOff = data.filter(user => user.department === 'Front Off');
      console.log('users do front off: ', data)
    })
  }

  get_interest_express() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.manifestacao = data
    })
  }

  get_inquiridor() {
    this.dataService.get_Inquiriers().subscribe(data => {
      this.inquiridor = data;
    })
  }

  get_inquerito() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inquerito = data;
    })
  }

  get_inquireForms() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data;
      console.log('inquérito', data)
    })
  }


  alert_error() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alguma coisa correu mal, tente mais tarde.",
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

  // filtrar inqueritos pendentes
  get_inquireFormsByPendentes() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.Inquerito_pendente = data.filter(inqueritos => inqueritos.status === 'Pendente')
      //.map(inqueritos => inqueritos.nome_simplificado);;
      console.log('inquéritos pendentes', this.Inquerito_pendente)
    })
  }


  // muda o comportamento da checkbox sim ou não
  onChangeyes(event: any) {
    this.duplicada_da = event.target.value;
    if (this.duplicada_da === this.opcoes[0]) {

    } else {
      // this.duplicada_da == false
    }

  }

  onChangeDidasTeste(event: any) {
    this.nome_simplificado = event.target.value;
    if (this.nome_simplificado === this.opcoesDidasTeste) {
      this.nome_simplificado = ''
    } else {
      //  this.nome_simplificado = false
      this.nome_simplificado = ''
    }
  }


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
    //'Pendente por falta de documento',
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

  estado = ['Aprovado', 'Pendente']


  carregarMunicipios() {
    switch (this.provincia) {
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


}
