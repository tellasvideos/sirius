import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-cadeia-valor',
  templateUrl: './add-cadeia-valor.component.html',
  styleUrls: ['./add-cadeia-valor.component.scss']
})
export class AddCadeiaValorComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<AddCadeiaValorComponent>) { }

  ngOnInit(): void {
  }

}
