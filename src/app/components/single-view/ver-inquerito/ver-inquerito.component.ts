import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-ver-inquerito',
  templateUrl: './ver-inquerito.component.html',
  styleUrls: ['./ver-inquerito.component.scss']
})
export class VerInqueritoComponent implements OnInit {

 
  sideBarOpen = true;
  id: any;
  inquiridor: any;
  angForm: FormGroup;
  inqueritosData:any;
  pdac:any;
  userFrontOff:any;
  inquerito:any;
  inqueritos:any;
  Inquerito_pendente:any;
  duplicada_da:any;
  que_tipo_de_negocio_esta:any;
  manifestacao:any;
  nome_simplificado:any;
  resultado_1_contacto:any;
  resultado_da_visita:any;

  opcoes = ['Sim', 'Nao']
  opcoesDidasTeste = ['Nao']
  provincias = ['Huila', 'Huambo', 'Cuanza Sul', 'Bié'];
  provincia:any;
  municipios: any;
  municipio: any;
  docs: any;
  inquerito_preenchido!: File;

  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);


  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.angForm = this.fb.group({
      nome_simplificado: ['', Validators.required] ,
      provincia: ['', Validators.required],
      municipio:['', Validators.required] ,
      aldeia:['', Validators.required] ,
      data_1_contacto: ['', Validators.required],
      resultado_1_contacto: ['', Validators.required],
      documento_em_falta: ['', Validators.required],
      documento_em_falta_2: ['', Validators.required],
      documento_em_falta_3: ['', Validators.required],
      documento_em_falta_4: ['', Validators.required],
      duplicada_da:['', Validators.required] ,
      data_1_visita: ['', Validators.required],
      resultado_da_visita:['', Validators.required] ,
      duplicada_da_2:['', Validators.required] ,
      data_validacao_inquerito:['', Validators.required] ,
      que_tipo_de_negocio_esta: ['', Validators.required],
      em_qual_cadeia_de_valor_vai_se_implementar_o_projecto:['', Validators.required] ,
      que_tipo: ['', Validators.required],
      que_tipo_2: ['', Validators.required],
      que_tipo_3: ['', Validators.required],
      status: ['', Validators.required],
      created_at: ['', Validators.required],
      manifestacao_de_interesse:['', Validators.required] ,
      inqueridor: ['', Validators.required],
      inquerito_preenchido: this.inquerito_preenchido
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.get_inquireFormsByPendentes();
    this.get_inquiridor();
    this.get_interest_express();
    this.get_inquerito();
    this.get_inquireForms();
    this.getPdac();
    this.getUserFrontOFF();
    //this.getInqueritosData();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        this.dataService.getInqueritoByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });
    });
  }

  
  get_interest_express() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.manifestacao = data
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

  get_inquiridor() {
    this.dataService.get_Inquiriers().subscribe(data => {
      this.inquiridor = data;
    })
  }

  get_inquireForms() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data;
      console.log('inquérito', data)
    })
  }

  get_inquerito() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inquerito = data;
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

  getPdac() {
    this.dataService.proponentPDAC().subscribe(data => {
      this.pdac = data;
      this.pdac = this.pdac.sort(function (a: any, b: any) {
        return b._id - a._id
      })
      //console.log(data)

    })

  }

  getUserFrontOFF() {
    this.dataService.getUser().subscribe(data => {
      this.userFrontOff = data.filter(user => user.department === 'Front Off');
      console.log('users do front off: ', data)
    })
  }

  getInqueritosData(){
    this.dataService.get_InquireForm().subscribe(data =>{
      this.inqueritosData = data;
    })
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
    switch (this.resultado_1_contacto) {
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
    switch (this.resultado_da_visita) {
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
    switch (this.que_tipo_de_negocio_esta) {
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
