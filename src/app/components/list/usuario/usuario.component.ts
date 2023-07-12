import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CreateUserComponent } from '../../inserts/create-user/create-user.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  userOb!: Subscription;
  keyWord: string = '';
  users: any;

  usuario: any;
  token: any;

  sideBarOpen = true;
  modalRef: MdbModalRef<CreateUserComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.dataService.getUser().subscribe(data => {
      this.usuario = data;
      //console.log('all  users: ', data)
    })
    this.getUser();
  }

  // delete uma dep de valor
  deleteUser(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.deleteUser(id).subscribe(
          success => { this.getUser(); },
          error => { this.alert_error(); }
        )
        Swal.fire(
          'Eliminado!',
          'Usuário foi eliminado.',
          'success',
        )
      }
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(CreateUserComponent)
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }

}

