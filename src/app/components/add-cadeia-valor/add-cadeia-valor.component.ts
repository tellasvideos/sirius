import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-cadeia-valor',
  templateUrl: './add-cadeia-valor.component.html',
  styleUrls: ['./add-cadeia-valor.component.scss']
})
export class AddCadeiaValorComponent implements OnInit {
  cadeiaVal: any;
  constructor(public modalRef: MdbModalRef<AddCadeiaValorComponent>, private ds: DataService) { }

  ngOnInit(): void {
  }
  salvarCadeiaValor(){
    let description = 'Uma descrição da cadeia'
    let cadeia = {"name": this.cadeiaVal, "description": description}
    this.ds.salvaCadeiaDeValor(cadeia).subscribe(data =>{
      console.log(data)
      // 
    })
  }

}
