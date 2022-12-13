import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CadeiaVal } from 'src/app/interfaces/cadeiaVal';
import { DataService } from 'src/app/services/data.service';
import { AddCadeiaValorComponent } from '../add-cadeia-valor/add-cadeia-valor.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadeiadevalor',
  templateUrl: './cadeiadevalor.component.html',
  styleUrls: ['./cadeiadevalor.component.scss']
})
export class CadeiadevalorComponent implements OnInit {

  // @ViewChild('add-cadeia-valor' AddCadeiaValorComponent);

  cadeiaDeValor?: CadeiaVal[];

  sideBarOpen = true;

  modalRef: MdbModalRef<AddCadeiaValorComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.atualizarlista();
  }

  // atualiza a lista depois de uma ação
  atualizarlista() {
    this.dataService.getValueChains().subscribe(dados => {
      this.cadeiaDeValor = dados;
      console.log('array list de todas as cadeias:', dados)
    })
  }

  // delete uma cadeia de valor
  deleteCadeia(id: any) {
    this.dataService.deleteValueChain(id).subscribe(
      success => { this.atualizarlista(); },
      error => { this.alert_error(); }
    )
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddCadeiaValorComponent)
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }
}
