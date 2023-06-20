import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ManInteress } from 'src/app/interfaces/manInteress';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { SingleInterestComponent } from 'src/app/components/single-view/single-interest/single-interest.component';
import { AddInteressesComponent } from '../../inserts/add-interesses/add-interesses.component';
import { AddAndManifestComponent } from '../../inserts/add-and-manifest/add-and-manifest.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.component.html',
  styleUrls: ['./interesses.component.scss']
})
export class InteressesComponent implements OnInit {

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
  ) {

    this.angForm = this.fb.group({

      consultor_pn_name: ['', Validators.required],
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
      estudo_de_viabilidade: ['', Validators.required],
      termo_compromisso_assinado: ['', Validators.required],
      projeto_riv_completo: ['', Validators.required],
      ftas: ['', Validators.required],
      lista_de_trabalhadores: ['', Validators.required],
      documentos_administrativos: ['', Validators.required],
      ficheiro_riv: [''],
      outros_documentos: [''],
      data_pn_entregue_ao_pdac: [''],
      pn_pendente: [''],
      justificacao_pn_pendente: ['', Validators.required],
      proponente_desistiu: [''],
      created_at: [''],
      consultor_pn: ['']
    })
  }

  ngOnInit(): void {
    this.getProvincias()
    this.list_interest()
    this.getInqueritos()
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

}
