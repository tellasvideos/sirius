import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2'
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AddInqueritoComponent } from '../../inserts/add-inquerito/add-inquerito.component';
import { Location } from "@angular/common";

@Component({
  selector: 'app-inquerito',
  templateUrl: './inquerito.component.html',
  styleUrls: ['./inquerito.component.scss']
})
export class InqueritoComponent implements OnInit {

  keyWord: string = '';
  selecionado: string = '';

  opcoes: any = [
    { "name": 'Sim' },
    { "name": 'Não' }
  ]

  tipo_Empresa: any = [
    { "name": 'Fazenda' },
    { "name": 'Cooperativa' },
    { "name": 'Empresa' },
    { "name": 'Agrícola' },
    { "name": 'Outro' }
  ]

  ChangeHandler(event: any) {
    this.selecionado = event.target.value;
  }

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
// novos dados de inqueritos
  nome_simplificado:any;
  provincia:any;
  municipio:any;
  aldeia:any;
  data_1_contacto:any;
  resultado_1_contacto:any;
  documento_em_falta:any;
  documento_em_falta_2:any;
  duplicada_da:any;
  data_1_visita:any;
  resultado_da_visita:any;
  documento_em_falta_3:any;
  duplicada_da_2:any;
  data_validacao_inquerito:any;
  que_tipo_de_negocio_esta:any;
  em_qual_cadeia_de_valor_vai_se_implementar_o_projecto:any;
  que_tipo:any;
  que_tipo_2:any;
  status:any;
  manifestacao_de_interesse:any;
  inqueridor:any;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private route: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.get_interest_express();
    this.get_inquirier();
    this.get_inquireForms();
    this.getProvincia();
    this.getPdac();
  }

  getProvincia(){
    this.dataService.get_Provinces().subscribe(data =>{
      this.provincia = data;
    })
  }

  getPdac(){
    this.dataService.proponentPDAC().subscribe(data =>{
      this.manifestacao_de_interesse = data;
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInqueritoComponent)
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
    this.goBack()
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

  goToInquiridor() {
    this.modalRef?.close();
    this.route.navigate(['inquiridor'])
  }

}
