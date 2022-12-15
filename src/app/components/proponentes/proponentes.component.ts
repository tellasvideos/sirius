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

  proponente:any;
  //modalRef: MdbModalRef<AddInqueritoComponent> | null = null;

  constructor(private modalService: MdbModalService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.proponentPDAC().subscribe(data =>{
      this.proponente = data;
      console.log(data)
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
   
  }

}