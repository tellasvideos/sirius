import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2'
import { AddInqueritoComponent } from '../../inserts/add-inquerito/add-inquerito.component';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location, } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as bootstrap from 'bootstrap';

import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-edit-inquerito',
  templateUrl: './edit-inquerito.component.html',
  styleUrls: ['./edit-inquerito.component.scss']
})
export class EditInqueritoComponent implements OnInit {

  @ViewChild('exampleModalToggle')
  modal: any;

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
    'Mecanizacão',
    'comercializacão',
    'Insumos/sementes',
    'Transporte',
    'Construção'
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
    //'Incontactável: N° tel errado',
    'Pendente por falta de documento',
    'Recusada: actividade inelegível',
    //'Recusada: MI duplicada',
    'Recusada: proponente desistiu',
    'Recusada por falta dos 10%',
    'Recusado por dívida',
    'Recusada: zona inelegível',
    'Recusada por falta de área',
    'Recusada por falta de documentação legal',
    'Recusada: CV inelegível'
    //'Didas teste'
  ]

  resultados_De_Contacto = ['A ser visitada',
    'Incomunicavel: Não atende',
    'Incomunicavel: Nº Tel errado',
    'Pendente por falta de documento',
    'Recusada: actividade inelegível',
    // 'Recusada: MI duplicada',
    'Recusada: proponente desistiu',
    'Recusada por falta dos 10%',
    'Recusada por dívida',
    'Recusada: zona inelegível',
    'Recusada por falta de documentação legal',
    'Recusada por falta de área',
    'Recusada: CV inelegível'
    //  'Didas teste'
  ];
  provincias = ['Huila', 'Huambo', 'Cuanza Sul', 'Bié'];
  municipios: any;
  municipio: any;
  docs: any;
  selectedParc: any;
  parceiros: any;



  fecharModal() {
    const modal = document.getElementById('exampleModalToggle');
    const backdrop = document.getElementsByClassName('modal-backdrop')[0];

    if (modal && backdrop) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      backdrop.parentNode?.removeChild(backdrop);

      // Remover a classe 'modal-open' do elemento 'body'
      document.body.classList.remove('modal-open');
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
      //default:
      //  this.municipios = [];
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
  id: any;
  data: any;
  prop_name: any;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private route: Router,
    private location: Location,
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService_: NgbModal,
    private activatedRoute: ActivatedRoute,

  ) {
    this.angForm = this.fb.group({
      nome_simplificado: [''],
      provincia: ['', Validators.required],
      municipio: ['', Validators.required],
      aldeia: ['', Validators.required],
      data_1_contacto: ['', Validators.required],
      resultado_1_contacto: ['', Validators.required],
      documento_em_falta: this.fb.array(Array(5).fill('sem falta')),
      documento_em_falta_2: this.fb.array(Array(5).fill('sem falta')),
      documento_em_falta_3: this.fb.array(Array(5).fill('sem falta')),
      documento_em_falta_4: this.fb.array(Array(5).fill('sem falta')),
      duplicada_da: [''],
      data_1_visita: ['', Validators.required],
      resultado_da_visita: ['', Validators.required],
      duplicada_da_2: [''],
      data_validacao_inquerito: ['YYYY-MM-DD', Validators.required],
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
    this.carregarMunicipios();

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });
    //this.resultados_De_Contacto.sort((a, b) => a.localeCompare(b));

    // receber valores no formulario vindo da api para editar
    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        this.dataService.getInqueritoByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });
    });

    // recebe o status do inquerito ou estado da MI por id
    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id');
      this.getStatusById(this.id);
    });
  }


  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.hide();
    }
  }

  fecharModal_() {
    this.modalService_.dismissAll();
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

  estados: string[] = [];
  estadoSelecionado?: string;

  gerarListaEstados(): void {
    const estadoSelecionado = this.getStatus();
    this.estados = [];

    const todosOsEstados = [
      'Aprovado',
      'Em Análise',
      'Por contactar',
      'MI Duplicada',
      'Incomunicavel: Não atende',
      'Incomunicavel: Nº Tel errado',
      'Pendente por falta de documento',
      'Recusada por falta de documentação legal',
      'Recusada por falta dos 10%',
      'Recusada por dívida',
      'Recusada: Actividade inelegível',
      'Recusada: proponente desistiu',
      'Recusada: zona inelegível',
      'Recusada por falta de área',
      'Recusada CV'
    ];

    this.estados.push(estadoSelecionado); // Adicionar o estado selecionado como o primeiro item

    this.estados = this.estados.concat(todosOsEstados.filter(estado => estado !== estadoSelecionado));
    // this.estados.push(''); // Adicionar uma opção vazia
  }


  getStatusById(id: string): void {
    this.dataService.getInqueritoByid(id).subscribe(data => {
      this.angForm.patchValue(data);
      this.gerarListaEstados();
    });
  }

  onEstadoSelecionado(): void {
    // Implemente a lógica para tratar o estado selecionado pelo usuário
    console.log('Estado selecionado:', this.estadoSelecionado);
  }


  // Estados manifestações de interesse “Estado MI” atribui automaticamente
  public getStatus(): string {
    const resultadoDaVisita = this.angForm.get('resultado_da_visita')?.value === 'Inquérito em Elaboração';
    const resultadoDaVisita_2 = this.angForm.get('resultado_da_visita')?.value === 'Recusada por falta dos 10%';
    const resultadoDaVisita_3 = this.angForm.get('resultado_da_visita')?.value === 'Recusado por dívida';
    const resultadoDaVisita_4 = this.angForm.get('resultado_da_visita')?.value === 'Recusada: actividade inelegível';
    const resultadoDaVisita_5 = this.angForm.get('resultado_da_visita')?.value === 'Recusada: proponente desistiu';
    const resultadoDaVisita_6 = this.angForm.get('resultado_da_visita')?.value === 'Recusada: zona inelegível';
    const resultadoDaVisita_7 = this.angForm.get('resultado_da_visita')?.value === 'Pendente por falta de documento';
    const resultadoDaVisita_8 = this.angForm.get('resultado_da_visita')?.value === 'Recusada por falta de documentação legal';
    const resultadoDaVisita_9 = this.angForm.get('resultado_da_visita')?.value === 'Recusada por falta de área';
    const resultadoDaVisita_10 = this.angForm.get('resultado_da_visita')?.value === 'Recusada: CV inelegível';

    const resultado_Do_1_contacto = this.angForm.get('resultado_1_contacto')?.value === 'Incomunicavel: Não atende';
    const resultado_Do_1_contacto_2 = this.angForm.get('resultado_1_contacto')?.value === 'Incomunicavel: Nº Tel errado';
    const resultado_Do_1_contacto_3 = this.angForm.get('resultado_1_contacto')?.value === 'Pendente por falta de documento';
    const resultado_Do_1_contacto_4 = this.angForm.get('resultado_1_contacto')?.value === 'Recusada por falta de documentação legal';
    const resultado_Do_1_contacto_5 = this.angForm.get('resultado_1_contacto')?.value === 'Recusada por falta dos 10%';
    const resultado_Do_1_contacto_6 = this.angForm.get('resultado_1_contacto')?.value === 'Recusada por dívida';
    const resultado_Do_1_contacto_7 = this.angForm.get('resultado_1_contacto')?.value === 'Recusada: actividade inelegível';
    const resultado_Do_1_contacto_8 = this.angForm.get('resultado_1_contacto')?.value === 'Recusada: proponente desistiu';
    const resultado_Do_1_contacto_9 = this.angForm.get('resultado_1_contacto')?.value === 'Recusada: zona inelegível';
    const resultado_Do_1_contacto_10 = this.angForm.get('resultado_1_contacto')?.value === 'Recusada por falta de área';
    const resultado_Do_1_contacto_11 = this.angForm.get('resultado_1_contacto')?.value === 'Recusada: CV inelegível';

    const duplicadaDaValue = this.angForm.get('duplicada_da')?.value;
    const dataValidacaoInqueritoValue = this.angForm.get('data_validacao_inquerito')?.value;
    const didasTeste = this.angForm.get('didasTeste')?.value === true;

    if (duplicadaDaValue) {
      return 'MI Duplicada';
    } else if (dataValidacaoInqueritoValue) {
      return 'Aprovado';
    } else if (resultadoDaVisita) {
      return 'Em Análise'
    } else if (resultado_Do_1_contacto) {
      return 'Incomunicavel: Não atende'
    } else if (resultado_Do_1_contacto_2) {
      return 'Incomunicavel: Nº Tel errado'
    } else if (resultado_Do_1_contacto_3) {
      return 'Pendente por falta de documento'
    } else if (resultadoDaVisita_7) {
      return 'Pendente por falta de documento'
    } else if (resultado_Do_1_contacto_4) {
      return 'Recusada por falta de documentação legal'
    } else if (resultadoDaVisita_8) {
      return 'Recusada por falta de documentação legal'
    } else if (resultadoDaVisita_2) {
      return 'Recusada por falta dos 10%'
    } else if (resultado_Do_1_contacto_5) {
      return 'Recusada por falta dos 10%'
    } else if (resultado_Do_1_contacto_6) {
      return 'Recusada por dívida'
    } else if (resultadoDaVisita_3) {
      return 'Recusada por dívida'
    } else if (resultadoDaVisita_4) {
      return 'Recusada: Actividade inelegível'
    } else if (resultado_Do_1_contacto_7) {
      return 'Recusada: Actividade inelegível'
    } else if (resultado_Do_1_contacto_8) {
      return 'Recusada: proponente desistiu'
    } else if (resultadoDaVisita_5) {
      return 'Recusada: proponente desistiu'
    } else if (didasTeste) {
      return 'Candidatura Inválida'
    } else if (resultado_Do_1_contacto_9) {
      return 'Recusada: zona inelegível'
    } else if (resultadoDaVisita_6) {
      return 'Recusada: zona inelegível'
    } else if (resultadoDaVisita_9) {
      return 'Recusada por falta de área'
    } else if (resultado_Do_1_contacto_10) {
      return 'Recusada por falta de área'
    } else if (resultadoDaVisita_10) {
      return 'Recusada CV'
    } else if (resultado_Do_1_contacto_11) {
      return 'Recusada CV'
    } else {
      return '';
    }
  }




  // Guarda dados do form caso a MI for duplicada (Botao 1)
  save_inquerito2() {
    if (!this.angForm.get('manifestacao_de_interesse')?.value) {
      if (!this.angForm.get('manifestacao_de_interesse')?.value) {
        this.alert_error_MI();
      }
      return;
    }

    const fileList: FileList = this.selectedFile;
    const documents: FileList = fileList;

    const fileList2: FileList = this.selectedFile2;
    const inquerito_preenchido: FileList = fileList2;

    const formData = new FormData();

    for (let i = 0; i < documents?.length; i++) {
      formData.append("files", documents[i], documents[i].name);
    }

    if (this.selectedFile2 && this.selectedFile2?.length > 0) {
      const inqueritoPreenchido = this.selectedFile2[0];

      if (inqueritoPreenchido.size > 0) {
        formData.append("inquerito_preenchido", inqueritoPreenchido, inqueritoPreenchido.name);
      }
    }

    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }
    );

    this.get_inquireForms();
    this.resetForm();
    //this.fecharModal_();
    //this.fecharModal();
    // this.closeModal('exampleModalToggle');

    /*/ close modal
    const modal = document.getElementById('exampleModalToggle');
    if (modal) {
      modal.style.display = 'none';
    }

    // Espera 3 segundos antes de recarregar a página
    timer(2000).pipe(delay(2000)).subscribe(() => {
      location.reload();
    });*/
  }












  // Guarda até a opção resultado da visita no campo resultado do primeiro contacto (Botao 2)
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

    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }
    )

    this.get_inquireForms();
    this.resetForm();
    // this.closeModal('exampleModalToggle');

    /*/ close modal
    const modal = document.getElementById('exampleModalToggle');
    if (modal) {
      modal.style.display = 'none';
    }

    // Espera 2 segundos antes de recarregar a página
    timer(2000).pipe(delay(2000)).subscribe(() => {
      location.reload();
    });*/
  }






  // Guarda até o campo resultado da visita (Botao 3)
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


    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }
    )

    this.get_inquireForms();
    this.resetForm();
    //this.closeModal('exampleModalToggle');

    /*/ close modal
    const modal = document.getElementById('exampleModalToggle');
    if (modal) {
      modal.style.display = 'none';
    }
    // Espera 3 segundos antes de recarregar a página
    timer(2000).pipe(delay(2000)).subscribe(() => {
      location.reload();
    });*/
  }







  // Guarda apartir do campo resultado da visita na opção Inquérito elaborado (Botao 4)
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

    /*if (!this.angForm.get('data_validacao_inquerito')?.value) {
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
    }*/

    /*if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
      if (!this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value) {
        this.alert_error_Em_qual_cadeia();
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

    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }
    )

    this.get_inquireForms();
    this.resetForm();
    //this.closeModal('exampleModalToggle');

    /*const modal = document.getElementById('exampleModalToggle');
    if (modal) {
      modal.style.display = 'none';
    }

    // Espera 3 segundos antes de recarregar a página
    timer(3000).pipe(delay(3000)).subscribe(() => {
      location.reload();
    });*/
  }




  save_inquerito_5_parte_() {
    /* if (this.angForm.invalid) {
       this.alert_error();
       return;
     }*/

    const formData = new FormData();

    const documents: FileList = this.selectedFile;
    if (documents) {
      for (let i = 0; i < documents.length; i++) {
        formData.append('files', documents[i], documents[i].name);
      }
    }

    const inqueritoPreenchido: FileList = this.selectedFile2;
    if (inqueritoPreenchido && inqueritoPreenchido.length > 0 && inqueritoPreenchido[0].size > 0) {
      formData.append('inquerito_preenchido', inqueritoPreenchido[0], inqueritoPreenchido[0].name);
    }

    formData.append("status", this.getStatus());

    const formValue = this.angForm.value;
    Object.keys(formValue).forEach(key => {
      formData.append(key, formValue[key]);
    });

    this.dataService.EditInquerito(this.id, formData).subscribe(
      success => {
        this.alert_success();
        this.get_inquireForms();
        this.resetForm();
      },
      error => {
        this.alert_error();
      }
    );
  }



  // Guarda todos os campos do formulário (botao 5)
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

   /* if (!this.angForm.get('data_validacao_inquerito')?.value) {
      if (!this.angForm.get('data_validacao_inquerito')?.value) {
        this.alert_error_Dat_val_inq();
      }
      return;
    }*/

    if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
        this.alert_error_Que_tipo_negocio();
      }
      return;
    }

   /* if (!this.angForm.get('inquerito_preenchido')?.value) {
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

    // Obter os valores atuais dos campos documento_em_falta
    const documentoEmFalta = this.angForm.get('documento_em_falta')?.value;
    const documentoEmFalta2 = this.angForm.get('documento_em_falta_2')?.value;
    const documentoEmFalta3 = this.angForm.get('documento_em_falta_3')?.value;
    const documentoEmFalta4 = this.angForm.get('documento_em_falta_4')?.value;

    // Remover os campos antes de enviar para a API
    const formValue = { ...this.angForm.value };
    delete formValue.documento_em_falta;
    delete formValue.documento_em_falta_2;
    delete formValue.documento_em_falta_3;
    delete formValue.documento_em_falta_4;

    formData.append("status", this.getStatus());
    formData.append("data_validacao_inquerito", this.angForm.get('data_validacao_inquerito')?.value);
    formData.append("que_tipo_de_negocio_esta", this.angForm.get('que_tipo_de_negocio_esta')?.value);
    formData.append("em_qual_cadeia_de_valor_vai_se_implementar_o_projecto", this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value);
    formData.append("que_tipo", this.angForm.get('que_tipo')?.value);
    formData.append("que_tipo_2", this.angForm.get('que_tipo_2')?.value);
    formData.append("que_tipo_3", this.angForm.get('que_tipo_3')?.value);


    this.dataService.EditInquerito(this.id, formData).subscribe(
      success => {
        this.alert_success();
      },
      error => { this.alert_error(); }
    )

    this.get_inquireForms();
    // this.resetForm();
    //this.closeModal('exampleModalToggle');

    /*/ close modal
    const modal = document.getElementById('exampleModalToggle');
    if (modal) {
      modal.style.display = 'none';
    }

    // Espera 2 segundos antes de recarregar aa página
    timer(2000).pipe(delay(2000)).subscribe(() => {
      location.reload();
    });*/
  }









  // Limpa todos os campos do formulario 
  resetForm() {
    const excludedFields = ['data_1_contacto', 'data_1_visita', 'data_validacao_inquerito', 'created_at', 'didasTeste', 'duplicada_da'];

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

  // Alert services
  alert_error() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alguma coisa correu mal, verifique a sua conexão de internet. Se persistir entre em contacto com a equipa de suporte",
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

  alert_success_MI_Aproved() {
    Swal.fire({
      icon: "success",
      title: "Manifestação de Interesse Aprovada",
      showConfirmButton: false,
      timer: 2000
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
      text: "Por favor, preencha o campo em falta",
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

  // Manipulador de checkboxs
  showDuplicatedInput: boolean = false;
  showDuplicatedInput_1: boolean = true;
  duplicatedName: string = '';

  showInput(show: boolean) {
    this.showDuplicatedInput = show;
    if (!show) {
      this.angForm.get('duplicada_da')?.setValue(''); // Desmarca a opção "Sim"
      this.duplicatedName = ''; // Limpa o valor do campo duplicado
    }
    // this.resetForm()
    this.angForm.get('duplicada_da')?.reset();
  }

  showInputDidas(show: boolean) {
    this.showDuplicatedInput_1 = show;
    if (!show) {
      this.angForm.get('didasTeste')?.setValue(true); // Desmarca a opção "Sim"
      this.duplicatedName = ''; // Limpa o valor do campo duplicado
    }
    // this.resetForm()
    //this.angForm.get('didasTeste')?.reset();
  }

  onSelectedFile(e: any) {
    this.selectedFile = e.target.files;
    console.log('doc selected', this.selectedFile)
  }

  onSelectedFile2(e: any) {
    this.selectedFile2 = e.target.files;
    console.log('doc selected 2', this.selectedFile2)
  }


  isGuardar5Visible(): boolean {
    const dataValidacao = this.angForm.get('data_validacao_inquerito')?.value;

    return !!dataValidacao;
  }

  showGuardar4(): boolean {
    return !this.isGuardar5Visible();
  }




}
