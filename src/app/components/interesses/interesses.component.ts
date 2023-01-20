import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ManInteress } from 'src/app/interfaces/manInteress';
import { DataService } from 'src/app/services/data.service';
import { AddInteressesComponent } from '../add-interesses/add-interesses.component';
import Swal from 'sweetalert2';
import { SingleInterestComponent } from 'src/app/single-interest/single-interest.component';
import { AddAndManifestComponent } from '../add-and-manifest/add-and-manifest.component';

@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.component.html',
  styleUrls: ['./interesses.component.scss']
})
export class InteressesComponent implements OnInit {

  provincia: any;

  interest?: ManInteress[];
  keyWord: string = '';
  filterText: string = '';
  sideBarOpen = true;

  apagar = false;

  modalRef: MdbModalRef<AddInteressesComponent> | null = null;
  //modalRef2: MdbModalRef<SingleInterestComponent> | null = null;

  //@ViewChild('tel') public tel: ModalDirective;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getProvincias()
    this.list_interest()
  }

  buscar(id: any) {
    this.dataService.interestExpressionByProvince(id).subscribe(data => {
      this.provincia = data;
      console.log(data)
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
      console.log(data)
    })
  }

  // delete um interest express
  deleteInterest(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      text: "Você está prestes a eliminar a sua Manifestação de Interesse!",
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
      this.provincia = data;
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
