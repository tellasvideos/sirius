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

import * as moment from 'moment';

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
    'Grãos'
  ]

  tipos_de_transformador = [
    'Processamento e negócio Café',
    'Processamento e negócio grãos'
  ]

  resultados_da_visita = [
    'Inquérito em Elaboração',
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

  resultados_De_Contacto = [
    'A ser visitada',
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

  autoCompleteProvincia() {
    const manifestacaoInteresse = this.angForm.get('manifestacao_de_interesse')?.value;

    // Encontrar a PDAC correspondente à manifestação de interesse selecionada
    const Provincia = this.pdac.find((item: any) => item['s2gp/s2g1q1/prop_nome'] === manifestacaoInteresse);

    // Atualizar o valor do campo "provincia" com base na PDAC selecionada
    if (Provincia) {
      this.angForm.patchValue({
        provincia: Provincia['s2gp/s2g3/rep_provincia'],
        municipio: Provincia['s2gp/s2g3/rep_municipio']
      });
      //console.log(Provincia['s2gp/s2g3/rep_provincia']);
      //console.log(Provincia['s2gp/s2g3/rep_municipio']);
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

  carregardocs3() {
    switch (this.angForm.get('resultado_da_visita')?.value) {
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

      documento_em_falta: [null],
      documento_em_falta_2: [null],
      documento_em_falta_3: [null],
      documento_em_falta_4: [null],

      duplicada_da: [''],
      data_1_visita: [''],
      resultado_da_visita: ['', Validators.required],
      duplicada_da_2: [''],
      data_validacao_inquerito: [''],
      que_tipo_de_negocio_esta: ['', Validators.required],
      em_qual_cadeia_de_valor_vai_se_implementar_o_projecto: [null, Validators.required],
      que_tipo: [null, Validators.required],
      que_tipo_2: [null, Validators.required],
      que_tipo_3: [null, Validators.required],
      status: [''],
      created_at: [''],
      manifestacao_de_interesse: ['', Validators.required],
      inqueridor: ['', Validators.required],
      didasTeste: [false],
      // inquerito_preenchido: [''],
      // documents: ['']
    });
  }





  ngOnInit(): void {
    this.get_farm_names();
    this.get_inquirier();
    this.get_inquireForms();
    this.getProvincia();
    this.getPdac();
    this.getUserFrontOFF();
    this.get_MI_Duplicada()
    this.carregarMunicipios();
    this.getMunicipio();
    this.getInqueritoParaPdac();

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      //console.log('User logado', this.user_logged)
    });
    //this.resultados_De_Contacto.sort((a, b) => a.localeCompare(b));

    // receber valores no formulario vindo da api para editar
    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        this.dataService.getInqueritoByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });
    });

  }

  limpar_form() {
    // this.angForm.reset();
    this.angForm.get('nome_simplificado')?.reset();
    this.angForm.get('aldeia')?.reset();
    this.angForm.get('data_1_contacto')?.reset();
    this.angForm.get('resultado_1_contacto')?.reset();
    this.angForm.get('documento_em_falta')?.value === '';
    this.angForm.get('documento_em_falta_2')?.value === '';
    this.angForm.get('documento_em_falta_3')?.value === '';
    this.angForm.get('documento_em_falta_4')?.value === '';
    this.angForm.get('data_1_visita')?.reset();
    this.angForm.get('data_validacao_inquerito')?.reset();
    this.angForm.get('que_tipo_de_negocio_esta')?.value === '';
    this.angForm.get('em_qual_cadeia_de_valor_vai_se_implementar_o_projecto')?.value === '';
    this.angForm.get('que_tipo')?.value === '';
    this.angForm.get('que_tipo_2')?.value === '';
    this.angForm.get('que_tipo_3')?.value === '';
    this.angForm.get('status')?.reset();
    this.angForm.get('inqueridor')?.reset();
    this.angForm.get('resultado_da_visita')?.reset();
  }


  exibirNomeMunicipio() {
    const municipioId = this.angForm.get('municipio')?.value;
    const municipioSelecionado = this.municipio.find((item: any) => item.id === municipioId);
    if (municipioSelecionado) {
      return municipioSelecionado.name;
    }

    return 'N/D';
  }

  getMunicipio() {
    this.dataService.getMunicipio().subscribe(data => {
      this.municipio = data;
      ////console.log(data)
    })
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


  inqueritoPdac: any;
  getInqueritoParaPdac() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritoPdac = data;
    })
  }
  // Tras a lista do pdac e filtra omitindo as MI usadas na lista de inquerito
  getPdac() {
    this.dataService.proponentPDAC().subscribe(data => {
      this.pdac = data;
      this.prop_name = this.pdac
        .map((pdac: any) => pdac['s2gp/s2g1q1/prop_nome'])
        .filter((propNome: any) => !this.inqueritoPdac.some((inq: any) => inq.manifestacao_de_interesse === propNome)).reverse();

      //console.log('Array pdac apenas nomes filtrados:', this.prop_name);

    });

  }



  onChangeValorSelecionado(event: any) {
    this.prop_name = event;
    //console.log(this.prop_name['s2gp/s2g1q1/prop_nome'])
    //this.prop_name); // Chamada da sua função com o valor selecionado
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInqueritoComponent)
  }

  // Manipulador de checkboxs
  showDuplicatedInput?: boolean;
  showDuplicatedInput_1?: boolean;

  // Se duplicada checked = true : didastest = false
  showInput_(checkboxValue: string) {
    this.limpar_form()

    this.showDuplicatedInput = this.angForm.get('duplicada_da')?.value;
    this.showDuplicatedInput_1 = this.angForm.get('didasTeste')?.value;

    if (checkboxValue === 'duplicada') {
      this.showDuplicatedInput === true;
      //console.log(this.angForm.get('duplicada_da')?.value)
      this.showDuplicatedInput_1 === false;
      this.angForm.get('didasTeste')?.patchValue(false);
      //console.log(this.angForm.get('didasTeste')?.value)

    } else if (checkboxValue === 'didasteste') {
      this.showDuplicatedInput_1 === true;
      //console.log(this.angForm.get('didasTeste')?.value)
      this.showDuplicatedInput === false;
      this.angForm.get('duplicada_da')?.patchValue(false);
      //console.log(this.angForm.get('duplicada_da')?.value)
    }
  }



  // Estados manifestações de interesse “Estado MI” atribui automaticamente
  getStatus(): string {
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
    const resultado_Do_1_contacto_12 = this.angForm.get('resultado_1_contacto')?.value === 'A ser visitada';


    const duplicadaDaValue = this.angForm.get('duplicada_da')?.value === true;
    const dataValidacaoInqueritoValue = this.angForm.get('data_validacao_inquerito')?.value || this.angForm.get('que_tipo_de_negocio_esta')?.value;
    const didasTeste = this.angForm.get('didasTeste')?.value === true;
    const DataPrimeiroContacto = this.angForm.get('data_1_contacto')?.value === '';

    if (duplicadaDaValue) {
      return 'MI Duplicada';
    } else if (dataValidacaoInqueritoValue) {
      return 'Aprovado';
    } else if (resultadoDaVisita) {
      return 'Em Análise'
    } else if (DataPrimeiroContacto) {
      return 'Por contactar'
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
    } else if (resultado_Do_1_contacto_12) {
      return 'A ser visitada'
    } else if (resultadoDaVisita_10) {
      return 'Recusada CV'
    } else if (resultado_Do_1_contacto_11) {
      return 'Recusada CV'
    } else {
      return 'N/D';
    }
  }




  // Guarda dados do form caso a MI for duplicada (Botao 1)
  save_inquerito2() {

    const formData = new FormData();

    formData.append("status", this.getStatus());
    formData.append("provincia", this.angForm.get('provincia')?.value);
    formData.append("municipio", this.angForm.get('municipio')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);
    formData.append("duplicada_da_2", this.angForm.get('duplicada_da_2')?.value);
    formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);
    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);


    this.dataService.EditInquerito(this.id, formData).subscribe(
      success => {
        this.alert_success();
        const modal = document.getElementById('exampleModalToggle');
        if (modal) {
          modal.style.display = 'none';
        }
        this.route.navigate(['inquerito']);
        // Espera 3 segundos antes de recarregar a página
        timer(2000).pipe(delay(2000)).subscribe(() => {
          location.reload();
        });
      },
      error => { this.alert_error(); }
    )
    this.get_inquireForms();
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

    const formData = new FormData();

    formData.append("status", this.getStatus());
    formData.append("resultado_1_contacto", this.angForm.get('resultado_1_contacto')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("provincia", this.angForm.get('provincia')?.value);
    formData.append("municipio", this.angForm.get('municipio')?.value);
    formData.append("aldeia", this.angForm.get('aldeia')?.value);
    formData.append("data_1_contacto", this.angForm.get('data_1_contacto')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);
    formData.append("duplicada_da", this.angForm.get('duplicada_da')?.value);

    formData.append("documento_em_falta", this.angForm.get('documento_em_falta')?.value);
    formData.append("documento_em_falta_2", this.angForm.get('documento_em_falta_2')?.value);
    formData.append("documento_em_falta_3", this.angForm.get('documento_em_falta_3')?.value);
    formData.append("documento_em_falta_4", this.angForm.get('documento_em_falta_4')?.value);


    this.dataService.EditInquerito(this.id, formData).subscribe(
      success => {
        this.alert_success();
        const modal = document.getElementById('exampleModalToggle');
        if (modal) {
          modal.style.display = 'none';
        }
        this.route.navigate(['inquerito']);
        // Espera 1 segundos antes de recarregar a página
        timer(1000).pipe(delay(1000)).subscribe(() => {
          location.reload();
        });
      },
      error => { this.alert_error(); }
    )

    this.get_inquireForms();

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


    let formData = new FormData();

    formData.append("status", this.getStatus());

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
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);


    let data_1_visita = this.angForm.get('data_1_visita')?.value;
    if (data_1_visita === '') {
      data_1_visita = '1111-11-11'; // Defina um valor de data padrão se estiver vazio
    } else {
      const formattedDate = moment(data_1_visita).format('YYYY-MM-DD');
      data_1_visita = formattedDate;
    }

    formData.append("data_1_visita", data_1_visita);
    formData.append("resultado_da_visita", this.angForm.get('resultado_da_visita')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);

    this.dataService.EditInquerito(this.id, formData).subscribe(
      success => {
        this.alert_success();
        const modal = document.getElementById('exampleModalToggle');
        if (modal) {
          modal.style.display = 'none';
        }
        this.route.navigate(['inquerito']);
        // Espera 1 segundos antes de recarregar a página
        timer(1000).pipe(delay(1000)).subscribe(() => {
          location.reload();
        });
      },
      error => { this.alert_error(); }
    )
    this.get_inquireForms();
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


    let formData = new FormData();

    formData.append("status", this.getStatus());
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
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);


    this.dataService.EditInquerito(this.id, formData).subscribe(
      success => {
        this.alert_success();
        const modal = document.getElementById('exampleModalToggle');
        if (modal) {
          modal.style.display = 'none';
        }
        this.route.navigate(['inquerito']);
        // Espera 3 segundos antes de recarregar a página
        timer(2000).pipe(delay(2000)).subscribe(() => {
          location.reload();
        });
      },
      error => { this.alert_error(); }
    )



    this.get_inquireForms();

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


    if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
      if (!this.angForm.get('que_tipo_de_negocio_esta')?.value) {
        this.alert_error_Que_tipo_negocio();
      }
      return;
    }



    const formData = new FormData();


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
    formData.append("status", this.getStatus());
    formData.append("created_at", this.angForm.get('created_at')?.value);
    formData.append("manifestacao_de_interesse", this.angForm.get('manifestacao_de_interesse')?.value);
    formData.append("inqueridor", this.angForm.get('inqueridor')?.value);
    formData.append("didasTeste", this.angForm.get('didasTeste')?.value);

    this.dataService.EditInquerito(this.id, formData).subscribe(
      success => {
        this.alert_success_MI_Aproved();
        const modal = document.getElementById('exampleModalToggle');
        if (modal) {
          modal.style.display = 'none';
        }
        this.route.navigate(['inquerito']);
        // Espera 3 segundos antes de recarregar a página
        timer(2000).pipe(delay(2000)).subscribe(() => {
          location.reload();
        });
      },
      error => { this.alert_error(); }
    )

    this.get_inquireForms();

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
      //console.log('inquérito', data)
    })
  }

  mi: any;
  get_MI_Duplicada() {
    this.dataService.proponentPDAC().subscribe(data => {
      this.mi = data;
      const simplifiedNames = data.map(mi => mi['s2gp/s2g1q1/prop_nome']);
      this.duplicateNames = simplifiedNames.filter((name, index) => simplifiedNames.indexOf(name) !== index);

      this.mi = data.map(mi => mi['s2gp/s2g1q1/prop_nome'])
      this.mi = this.mi.sort(function (a: any, b: any) {
        return b._id - a._id
      })
      //console.log('MI duplicados', this.duplicateNames);
    })
  }

  // Alert services
  alert_error() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alguma coisa correu mal, tente novamente.",
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
      ////console.log('manifestacao: ', data)

    })

  }

  // obter o nome da fazenda (nome_simplificado) da janela back off
  get_farm_names() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.manifestacao = data;
      const farmNames = data.map(item => item.farm_name);
      //console.log('farm_names ou nomes simplificados: ', farmNames);
    });
  }


  get_inquirier() {
    this.dataService.get_Inquiriers().subscribe(data => {
      this.inquiridor = data;
      ////console.log('inqiridor: ', data)
    })
  }

  // filtrar usuarios do departamento front off
  getUserFrontOFF() {
    this.dataService.getUser().subscribe(data => {
      this.userFrontOff = data.filter(user => user.department === 'Front Off');
      //console.log('users do front off: ', data)
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


  onSelectedFile(e: any) {
    this.selectedFile = e.target.files;
    //console.log('multiple docs selected', this.selectedFile)
  }

  onSelectedFile2(e: any) {
    this.selectedFile2 = e.target.files;
    //console.log('inquerito selected ', this.selectedFile2)
  }


  isGuardar5Visible(): boolean {
    const dataValidacao = this.angForm.get('data_validacao_inquerito')?.value;

    return !!dataValidacao;
  }

  showGuardar4(): boolean {
    return !this.isGuardar5Visible();
  }


  onFilesSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const files: FileList = inputElement.files;
      const selectedFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        selectedFiles.push(files[i]);
      }
      this.angForm.get('documents')?.setValue(selectedFiles);
    }
  }


  onFileSelected2(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.angForm.get('inquerito_preenchido')?.setValue(inputElement.files[0]);
    }
  }


  arquivosSelecionados: File[] = [];

  selecionarArquivos(event: any) {
    this.arquivosSelecionados = Array.from(event.target.files);
  }



  OnDatachange(event: any) {
    const inputDate = event.target.value;
    const dateParts = inputDate.split('/');

    if (dateParts.length === 3) {
      const day = dateParts[0];
      const month = dateParts[1];
      const year = dateParts[2];

      const formattedDate = `${year}-${month}-${day}`;
      this.angForm.patchValue({ data_1_visita: formattedDate });
    }
  }

  // mapear apenas os nomes simplificados
  nomes_simplificados: any;
  get_Nomes_simplificados() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data;

      this.nomes_simplificados = this.inqueritos.map((inquerito: any) => inquerito.nome_simplificado);
      //console.log('Nomes simplificados:', this.nomes_simplificados);
    });
  }

  isVisitInProgress(): boolean {
    const resultado_1_contacto = this.angForm.get('resultado_1_contacto')?.value;
    const duplicada_da = this.angForm.get('duplicada_da')?.value;
    const didasTeste = this.angForm.get('didasTeste')?.value;

    return resultado_1_contacto === 'A ser visitada' && !duplicada_da && !didasTeste;
  }


}
