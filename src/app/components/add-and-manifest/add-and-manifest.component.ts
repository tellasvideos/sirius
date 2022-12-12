import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-and-manifest',
  templateUrl: './add-and-manifest.component.html',
  styleUrls: ['./add-and-manifest.component.scss']
})
export class AddAndManifestComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<AddAndManifestComponent>) { }


  ngOnInit(): void {
  }

}
