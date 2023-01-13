import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import { AddInquiridorComponent } from '../add-inquiridor/add-inquiridor.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inquiridor',
  templateUrl: './inquiridor.component.html',
  styleUrls: ['./inquiridor.component.scss']
})
export class InquiridorComponent implements OnInit {

  inquiridores: any;
  keyWord: string = '';
  sideBarOpen = true;

  modalRef: MdbModalRef<InquiridorComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getInquiridores();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInquiridorComponent)
  }

  getInquiridores(){
    this.dataService.get_Inquiriers().subscribe(data =>{
      this.inquiridores = data;
      console.log(data)
    })
  }

  deleteInquirier(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      text: "Você está prestes a eliminar os dados deste inquiridor!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.deleteInquirier(id).subscribe(
          success => { this.getInquiridores(); },
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

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }
}