import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  userOb!: Subscription;
  keyWord: string = '';
  users: any;

  usuarios = [
    {
      "id": 1,
      "email": "andre@andre.com",
      "name": "andre",
      "username": "andreusername",
      "department": "git",
      "work_function": "dev",
      "is_admin": true,
      "created_at": "2022-11-08T20:46:22.311618Z"
    },
    {
      "id": 2,
      "email": "user@example.com",
      "name": "kadeu",
      "username": "kadeu123",
      "department": "bash",
      "work_function": "devweb",
      "is_admin": true,
      "created_at": "2022-12-05T09:45:56.823633Z"
    }
  ]

  token: any;

  sideBarOpen = true;
  modalRef: MdbModalRef<CreateUserComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private http: HttpClient
  ) { }



  ngOnInit(): void {

    // to get all users
    this.fetchUsers();
    //console.log(this.usuarios)

  }



  removeUser(id: any) {
    this.dataService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
    })
  }

  fetchUsers() {
    this.dataService.listUsers().subscribe(data => {
      this.users = data;
      console.log('estes são os users: ', this.users)
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(CreateUserComponent)
  }
}

