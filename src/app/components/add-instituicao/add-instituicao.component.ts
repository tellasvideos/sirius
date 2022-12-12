import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-instituicao',
  templateUrl: './add-instituicao.component.html',
  styleUrls: ['./add-instituicao.component.scss']
})
export class AddInstituicaoComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<AddInstituicaoComponent>) { }

  ngOnInit(): void {
  }

}
