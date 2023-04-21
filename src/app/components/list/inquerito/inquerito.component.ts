import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2'
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AddInqueritoComponent } from '../../inserts/add-inquerito/add-inquerito.component';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inquerito',
  templateUrl: './inquerito.component.html',
  styleUrls: ['./inquerito.component.scss']
})
export class InqueritoComponent implements OnInit {

  angForm!: FormGroup;
  user_logged: any;
  userFrontOff: any;
  formAprovado = false;
  Inquerito_pendente: any;

  isFormValid = false; // variável para armazenar o estado de validação do formulário
  pdac: any;

  today: Date = new Date();
  minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  keyWord: string = '';
  selecionado: string = '';

  estado = ['Aprovado', 'Pendente']

  opcoes = ['Sim', 'Nao']

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
    'Serviços mecânicos',
    'Negócio insumos'
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

  resultados_da_visita = ['Em análise',
    'Incomunicavel: não atende',
    'Incontactável: N° tel errado',
    'Pendente por falta de documento',
    'Recusada: actividade inelegível',
    'Recusada: MI duplicada',
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
    'Recusada: MI duplicada',
    'Recusada: proponente desistiu',
    'Recusada por falta dos 10%',
    'Recusada por divida',
    'Recusada: Zona ilegivel',
    'Recusada por falta de documentação legal',
    'Didas teste'
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
      case 'Em análise':
        this.docs = ['data'];
        break;
      default:
        this.docs = [];
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

  reloadOnce: any;

  inqueritos: any;
  sideBarOpen = true;
  modalRef: MdbModalRef<AddInqueritoComponent> | null = null;

  observations: any;
  responsible: any;
  document_to_proves_date: any;
  created_at: any;
  interest_expression: any;
  manifestacao: any;
  inquiridor: any;

  uploadFile: any;
  // novos dados de inqueritos
  nome_simplificado: any;
  provincia: any;
  inquerito_preenchido!: File;
  aldeia: any;
  data_1_contacto?: string;
  resultado_1_contacto: any;
  documento_em_falta?: ["none", "none", "none", "none", "none", "none"];
  documento_em_falta_2?: ["none", "none", "none", "none", "none", "none"];
  duplicada_da: any;
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
  manifestacao_de_interesse?: any;
  inqueridor: any;

  data: any;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private route: Router,
    private location: Location,
    private http: HttpClient,
    private fb: FormBuilder
    // public activeModal: NgbActiveModal
  ) {
    /* this.angForm = this.fb.group({
       nome_simplificado: [''],
       provincia: [''],
       municipio: [''],
       aldeia: [''],
       data_1_contacto: [''],
       resultado_1_contacto: [''],
       documento_em_falta: ['none', 'item2', 'item3'],
       documento_em_falta_2: ['none', 'item2', 'item3'],
       documento_em_falta_3: ['none', 'item2', 'item3'],
       documento_em_falta_4: ['none', 'item2', 'item3'],
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
       //created_at: [''],
       manifestacao_de_interesse: [''],
       inqueridor: [''],
       inquerito_preenchido: ['']
     });*/
  }

  /* fecharModal() {
     this.activeModal.close();
   }*/

  ngOnInit(): void {
    this.get_interest_express();
    this.get_inquirier();
    this.get_inquireForms();
    this.getProvincia();
    this.getPdac();
    this.getUserFrontOFF();
    this.get_inquireFormsByPendentes()

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });
    //this.resultados_De_Contacto.sort((a, b) => a.localeCompare(b));

  }

  // função para verificar o estado de validação do formulário
  /*checkFormValidity(): void {
    const formControl = document.querySelector('input') as HTMLInputElement;
    const value = formControl.value;

    const formControls = document.querySelectorAll('input, select, textarea');
    let isFormValid = true;

    formControls.forEach(control => {
      if (control.hasAttribute('required') && !control) {
        isFormValid = false;
      }
    });

    this.isFormValid = isFormValid;
  }*/


  getProvincia() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provincia = data;
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

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInqueritoComponent)
  }

  /* onFileSelected(event: { target: { inquerito_preenchido: any[]; }; }) {
     const file = event.target.inquerito_preenchido[0];
     const reader = new FileReader();
     reader.onload = () => {
       const fileData = new Blob([reader.result], { type: file.type });
       this.uploadFile(fileData);
     };
     reader.readAsArrayBuffer(file);
   }*/


  save_inquerito() {

    let InquireForm = {
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
    }

    if (this.inquerito_preenchido) {
      const formData = new FormData();
      const blob = new Blob([this.inquerito_preenchido], { type: this.inquerito_preenchido.type });
      formData.append('inqerito_preenchido', blob, this.inquerito_preenchido.name);
    }

    this.dataService.salvaInquireForm(InquireForm).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }

    )

    this.get_inquireForms();
    //this.location.reload();
    //this.goBack()
    const modal = document.getElementById('exampleModalToggle3');
    if (modal) {
      modal.style.display = 'none';
    }
    this.route.navigateByUrl('/inquerito', { skipLocationChange: true }).then(() => {
      this.route.navigate([this.route.url]);
    });

  }

  save_inquireForm() {
    let InquireForm = {
      "observations": this.observations,
      "responsible": this.responsible,
      "document_to_proves_date": this.document_to_proves_date,
      "created_at": this.created_at,
      "interest_expression": this.interest_expression
    }
    this.dataService.salvaInquireForm(InquireForm).subscribe(
      success => { this.alert_success },
      error => { this.alert_error }
    )
    this.get_inquireForms();
    this.observations = '';
    this.responsible = '';
    this.document_to_proves_date = '';
    this.interest_expression = '';
    // this.fecharModal()
    // this.goBack()
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

  // filtrar inqueritos pendentes
  get_inquireFormsByPendentes() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.Inquerito_pendente = data.filter(inqueritos => inqueritos.status === 'Pendente');
      console.log('inquéritos pendentes', this.Inquerito_pendente)
    })
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

  get_interest_express() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.manifestacao = data;
      //console.log('manifestacao: ', data)

    })

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
  onChangeyes(event: any) {
    this.duplicada_da = event.target.value;
    if (this.duplicada_da === this.opcoes[0]) {

    } else {
      this.duplicada_da = false
    }
  }

}
