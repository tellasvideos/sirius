import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddAndManifestComponent } from '../../inserts/add-and-manifest/add-and-manifest.component';

@Component({
  selector: 'app-andamentomanifes',
  templateUrl: './andamentomanifes.component.html',
  styleUrls: ['./andamentomanifes.component.scss']
})
export class AndamentomanifesComponent implements OnInit {

  sideBarOpen = true;

  modalRef: MdbModalRef<AddAndManifestComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddAndManifestComponent)
  }

}
