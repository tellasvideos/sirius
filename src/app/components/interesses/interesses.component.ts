import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ManInteress } from 'src/app/interfaces/manInteress';
import { DataService } from 'src/app/services/data.service';
import { AddInteressesComponent } from '../add-interesses/add-interesses.component';
import Swal from 'sweetalert2';
import { SingleInterestComponent } from 'src/app/single-interest/single-interest.component';

@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.component.html',
  styleUrls: ['./interesses.component.scss']
})
export class InteressesComponent implements OnInit {

  interest?: ManInteress[];

  sideBarOpen = true;

  modalRef: MdbModalRef<AddInteressesComponent> | null = null;
  modalRef2: MdbModalRef<SingleInterestComponent> | null = null;

  //@ViewChild('tel') public tel: ModalDirective;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
   this.list_interest()
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInteressesComponent)
  }

  Ver_Single_interest() {
    this.modalRef2 = this.modalService.open(SingleInterestComponent)
  }

  list_interest(){
    this.dataService.getInterestExpress().subscribe(data =>{
      this.interest = data;
      console.log(data)
    })
  }

   // delete uma cadeia de valor
   deleteInterest(id: any) {
    this.dataService.deleteInterestExpress(id).subscribe(
      success => { this.list_interest(); },
      error => { this.alert_error(); }
    )
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }
}
