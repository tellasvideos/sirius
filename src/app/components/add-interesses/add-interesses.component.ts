import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-interesses',
  templateUrl: './add-interesses.component.html',
  styleUrls: ['./add-interesses.component.scss'],
  preserveWhitespaces: true,
})
export class AddInteressesComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<AddInteressesComponent>) { }

  ngOnInit(): void {
  }

}
