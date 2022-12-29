import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddInqueritoComponent } from '../add-inquerito/add-inquerito.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inquerito',
  templateUrl: './inquerito.component.html',
  styleUrls: ['./inquerito.component.scss']
})
export class InqueritoComponent implements OnInit {

  sideBarOpen = true;

  modalRef: MdbModalRef<AddInqueritoComponent> | null = null;

  constructor(
    private modalService: MdbModalService
    ) { }

  ngOnInit(): void {

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInqueritoComponent)
  }

}
