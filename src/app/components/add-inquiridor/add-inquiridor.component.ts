import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-inquiridor',
  templateUrl: './add-inquiridor.component.html',
  styleUrls: ['./add-inquiridor.component.scss']
})
export class AddInquiridorComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<AddInquiridorComponent>) { }


  ngOnInit(): void {
  }

}
