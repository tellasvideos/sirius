import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  meuFormGroup!: FormGroup;

  constructor(
    public modalRef: MdbModalRef<AddCadeiaValorComponent>,
    private ds: DataService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.atualizardados();
  }

  salvarCadeiaValor() {

    if(!this.cadeiaVal || !this.desc){
      this.modalRef.close()
      Swal.fire({
        icon: "error",
        title: "Os campos devem ser preenchidos corretamente.",
        showConfirmButton: true,
      })
      return;
    }

    let cadeia = { "name": this.cadeiaVal, "description": this.desc }
    this.ds.salvaCadeiaDeValor(cadeia).subscribe(
      success => { this.atualizardados() },
      error => { this.alert_error() }
    )
    this.atualizardados();
    Swal.fire({
      icon: 'success',
      title: 'Salvo',
      showConfirmButton: false,
      timer: 1500
    })
    this.valueChain?.push(cadeia);
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
