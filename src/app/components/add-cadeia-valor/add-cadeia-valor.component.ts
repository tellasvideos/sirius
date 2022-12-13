import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CadeiaVal } from 'src/app/interfaces/cadeiaVal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-cadeia-valor',
  templateUrl: './add-cadeia-valor.component.html',
  styleUrls: ['./add-cadeia-valor.component.scss']
})
export class AddCadeiaValorComponent implements OnInit {

  cadeiaVal: any;
  desc: any;

  valueChain?: CadeiaVal[];

  constructor(
    public modalRef: MdbModalRef<AddCadeiaValorComponent>,
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.atualizardados();
  }

  salvarCadeiaValor() {
    let cadeia = { "name": this.cadeiaVal, "description": this.desc }
    this.ds.salvaCadeiaDeValor(cadeia).subscribe(
      success => {this.atualizardados()},
      error => {this.alert_error()}
    )
    Swal.fire({
      icon: 'success',
      title: 'Salvo',
      showConfirmButton: false,
      timer: 1500
    })
    this.atualizardados();
    this.modalRef.close();
  }

  atualizardados() {
    this.ds.getValueChains().subscribe(dados => {
      this.valueChain = dados;
      //console.log('cadeia de valores', dados)
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
