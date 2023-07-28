import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CadeiaVal } from 'src/app/interfaces/cadeiaVal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AddCadeiaValorComponent } from '../../inserts/add-cadeia-valor/add-cadeia-valor.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-cadeiadevalor',
  templateUrl: './cadeiadevalor.component.html',
  styleUrls: ['./cadeiadevalor.component.scss']
})
export class CadeiadevalorComponent implements OnInit {

  keyWord: string = '';
  cadeiaDeValor?: CadeiaVal[];
  sideBarOpen = true;
  modalRef: MdbModalRef<AddCadeiaValorComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService
  ) {
    this.atualizarlista()
  }

  ngOnInit(): void {
    this.atualizarlista();
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tabela-cadeia'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'cadeiadevalor');

    /* salvar o arquivo */
    const nomeDoArquivo: string = 'cadeia-de-valor.xlsx';
    XLSX.writeFile(wb, nomeDoArquivo);
  }


  // atualiza a lista depois de uma ação
  atualizarlista() {
    this.dataService.getValueChains().subscribe(dados => {
      this.cadeiaDeValor = dados;
      // console.log('array list de todas as cadeias:', dados)
    })
  }

  // delete uma cadeia de valor
  deleteCadeia(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.deleteValueChain(id).subscribe(
          success => { this.atualizarlista(); },
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
