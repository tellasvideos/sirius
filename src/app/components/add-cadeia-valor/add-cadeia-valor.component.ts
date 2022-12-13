import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CadeiaVal } from 'src/app/interfaces/cadeiaVal';
import { DataService } from 'src/app/services/data.service';

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
    this.ds.getValueChains().subscribe(dados =>{
      this.valueChain = dados;
      //console.log('cadeia de valores', dados)
    })
  }

  salvarCadeiaValor() {
    let cadeia = { "name": this.cadeiaVal, "description": this.desc }
    this.ds.salvaCadeiaDeValor(cadeia).subscribe(data => {
      console.log(data)
      // 
    })
  }

}
