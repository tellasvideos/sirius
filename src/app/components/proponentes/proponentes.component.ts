import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proponentes',
  templateUrl: './proponentes.component.html',
  styleUrls: ['./proponentes.component.scss']
})
export class ProponentesComponent implements OnInit {
  sideBarOpen = true;
  keyWord: string = '';
  proponente:any;
  //modalRef: MdbModalRef<AddInqueritoComponent> | null = null;

  propName:any;


  constructor(private modalService: MdbModalService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.proponentPDAC().subscribe(data =>{
      this.proponente = data;
      this.filterDsc()
      console.log(data[0]['s2gp/s2g1q1/prop_nome'])

    })
   
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
   
  }

  filterDsc(){
    this.proponente = this.proponente.sort(function(a: any, b: any){
      return b._id - a._id
    })
  }

}
