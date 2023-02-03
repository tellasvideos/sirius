import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-inquerito',
  templateUrl: './add-inquerito.component.html',
  styleUrls: ['./add-inquerito.component.scss']
})
export class AddInqueritoComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<AddInqueritoComponent>) { }

  ngOnInit(): void {
  }

}
