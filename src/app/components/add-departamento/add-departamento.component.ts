import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-departamento',
  templateUrl: './add-departamento.component.html',
  styleUrls: ['./add-departamento.component.scss']
})
export class AddDepartamentoComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<AddDepartamentoComponent>) { }


  ngOnInit(): void {
  }

}
