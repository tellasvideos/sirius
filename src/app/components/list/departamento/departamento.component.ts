import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AddDepartamentoComponent } from '../../inserts/add-departamento/add-departamento.component';


@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {
  keyWord: string = '';
  departamento: any;
  depart: any;
  sideBarOpen = true;

  modalRef: MdbModalRef<AddDepartamentoComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.getDepartaments();
    this.filterDsc();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddDepartamentoComponent)
  }

  // delete uma dep de valor
  deleteDepartamento(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.ds.deleteDepartaments(id).subscribe(
          success => { this.getDepartaments(); },
          error => { this.alert_error(); }
        )
        Swal.fire(
          'Eliminado!',
          'O seu registo foi eliminado.',
          'success',
        )
      }
    })
  }


  getDepartaments() {
    this.ds.get_Departaments().subscribe(data => {
      this.departamento = data;
    })
  }

  filterDsc() {
    this.departamento = this.departamento.sort(function (a: any, b: any) {
      return b._id - a._id
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
