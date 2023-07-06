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


  InqueritoPreenchido: any;

  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  pdac: any;
  opcoes = ['Sim', 'Nao']
  opcoesDidasTeste = ['Nao']

  angForm: FormGroup;
  sideBarOpen = true;
  id: any;

  id_bo: any;

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
  // inquerito_preenchido!: File;
  aldeia: any;
  data_1_contacto?: string;
  resultado_1_contacto: any;
  documento_em_falta?: ["none", "none", "none", "none", "none", "none"];
  documento_em_falta_2?: ["none", "none", "none", "none", "none", "none"];
  data_1_visita?: string;
  resultado_da_visita: any;
  documento_em_falta_3?: ["none", "none", "none", "none", "none", "none"];
  documento_em_falta_4?: ["none", "none", "none", "none", "none", "none"];
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

  listaDocsEmFalta: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.angForm = this.fb.group({
      responsible: ['', Validators.required],
      interest_expression: ['', Validators.required],
      document_to_proves_date: ['', Validators.required],
      observations: ['', Validators.required],

      nome_simplificado: ['', Validators.required],
      provincia: ['', Validators.required],
      municipio: ['', Validators.required],
      aldeia: ['', Validators.required],
      data_1_contacto: ['', Validators.required],
      resultado_1_contacto: ['', Validators.required],
      documento_em_falta: this.fb.array(Array(5).fill('')),
      documento_em_falta_2: this.fb.array(Array(5).fill('')),
      documento_em_falta_3: this.fb.array(Array(5).fill('')),
      documento_em_falta_4: this.fb.array(Array(5).fill('')),
      duplicada_da: ['', Validators.required],
      data_1_visita: ['', Validators.required],
      resultado_da_visita: ['', Validators.required],
      duplicada_da_2: ['', Validators.required],
      data_validacao_inquerito: ['', Validators.required],
      que_tipo_de_negocio_esta: ['', Validators.required],
      em_qual_cadeia_de_valor_vai_se_implementar_o_projecto: ['', Validators.required],
      que_tipo: ['', Validators.required],
      que_tipo_2: ['', Validators.required],
      que_tipo_3: ['', Validators.required],
      status: ['', Validators.required],
      created_at: ['', Validators.required],
      manifestacao_de_interesse: ['', Validators.required],
      inqueridor: ['', Validators.required],
      didasTeste: [''],
      inquerito_preenchido: [''],
      documents: ['']
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
    this.getInqueritoByIdDocs();
    this.get_inquireFormsInqueritoPreenchido();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        this.dataService.getInqueritoByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });
    });

    this.carregardocs2();
    this.getMunicipio();
    /* this.activatedRoute.params.subscribe(params => {
       const itemId = params['id'];
       // Use o ID do item para buscar os detalhes do item ou realizar qualquer ação necessária
       console.log('ID do item:', itemId);
     });*/

    /* this.angForm.get('resultado_1_contacto')?.valueChanges.subscribe(value => {
       this.carregardocs2();
     });*/

  }

  getMunicipio() {
    this.dataService.getMunicipio().subscribe(data => {
      this.municipio = data;
      //console.log(data)
    })
  }


  duplicateNames: any;

  // nome_simplificado duplicados
  get_inquireFormsByPendentes() {
    this.dataService.get_InquireForm().subscribe(data => {
      const simplifiedNames = data.map(inqueritos => inqueritos.nome_simplificado);
      this.duplicateNames = simplifiedNames.filter((name, index) => simplifiedNames.indexOf(name) !== index);
      console.log('nome_simplificado duplicados', this.duplicateNames);
    });
  }



  getInqueritoByIdDocs() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.listaDocsEmFalta = data;
      console.log('o que qero ver: ', data)
    })
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
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


  editInquerito(data: any) {
    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.get_inquerito();
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
      console.log('inquérito', this.inqueritos['inquerito_preenchido'])
    })
  }

  // mapear o link do Inquerito preenchido
  get_inquireFormsInqueritoPreenchido() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data;
      this.InqueritoPreenchido = data.map(item => item.inquerito_preenchido)
      console.log('link inquérito preenchido', this.InqueritoPreenchido)
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

  /*/ filtrar inqueritos pendentes
  get_inquireFormsByPendentes() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.Inquerito_pendente = data.filter(inqueritos => inqueritos.status === 'Pendente')
      //.map(inqueritos => inqueritos.nome_simplificado);;
      console.log('inquéritos pendentes', this.Inquerito_pendente)
    })
  }*/

  exibirNomeMunicipio() {
    const municipioId = this.angForm.get('municipio')?.value;
    const municipioSelecionado = this.municipio.find((item: any) => item.id === municipioId);
    if (municipioSelecionado) {
      return municipioSelecionado.name;
    }

    return 'N/D';
  }


  // Manipulador de checkboxs
  showDuplicatedInput?: boolean;
  showDuplicatedInput_1?: boolean;
  duplicatedName: string = '';

  showInput() {
    this.showDuplicatedInput = this.angForm.get('duplicada_da')?.value;
  }

  showInputDidas() {
    this.showDuplicatedInput_1 = this.angForm.get('didasTeste')?.value; // Desmarca a opção "Sim"
  }


  tipos_de_prestadores = [
    'mecanizacao',
    'comercializacao',
    'insumos/sementes',
    'transporte',
    'Construçao'
  ]

  tipos_de_negococio = [
    'Productor vegetais',
    'Productor aves',
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
    'Embalagem'
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
    switch (this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      case 'Productor vegetais':
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
          'Embalagem'
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
