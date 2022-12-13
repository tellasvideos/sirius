import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CadeiaVal } from 'src/app/interfaces/cadeiaVal';
import { DataService } from 'src/app/services/data.service';
import { AddCadeiaValorComponent } from '../add-cadeia-valor/add-cadeia-valor.component';

@Component({
  selector: 'app-cadeiadevalor',
  templateUrl: './cadeiadevalor.component.html',
  styleUrls: ['./cadeiadevalor.component.scss']
})
export class CadeiadevalorComponent implements OnInit {

  cadeiaDeValor?: CadeiaVal[];

  sideBarOpen = true;

  modalRef: MdbModalRef<AddCadeiaValorComponent> | null = null;
  
  constructor(private modalService: MdbModalService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getValueChains().subscribe(dados =>{
      this.cadeiaDeValor = dados;
      console.log('array list de todas as cadeias:', dados)
    })
  }

  deleteCadeia(cadeia: any){

  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddCadeiaValorComponent)
  }
}
