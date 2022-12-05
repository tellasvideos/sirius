import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  users:any;

  sideBarOpen = true;
  modalRef: MdbModalRef<CreateUserComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService
    ) { }
    
  ngOnInit(): void {

    // to get all users
    this.dataService.listUsers().subscribe((data)=>{
      this.users = data;
      console.log('user',this.users)
    })
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(CreateUserComponent)
  }
}

