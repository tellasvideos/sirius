import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddInquiridorComponent } from '../add-inquiridor/add-inquiridor.component';

@Component({
  selector: 'app-inquiridor',
  templateUrl: './inquiridor.component.html',
  styleUrls: ['./inquiridor.component.scss']
})
export class InquiridorComponent implements OnInit {

  sideBarOpen = true;

  modalRef: MdbModalRef<InquiridorComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInquiridorComponent)
  }
}