import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddInstituicaoComponent } from '../add-instituicao/add-instituicao.component';

@Component({
  selector: 'app-instituicoes',
  templateUrl: './instituicoes.component.html',
  styleUrls: ['./instituicoes.component.scss']
})
export class InstituicoesComponent implements OnInit {

  sideBarOpen = true;

  modalRef: MdbModalRef<AddInstituicaoComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInstituicaoComponent)
  }
}
