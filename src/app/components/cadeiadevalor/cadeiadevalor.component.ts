import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadeiadevalor',
  templateUrl: './cadeiadevalor.component.html',
  styleUrls: ['./cadeiadevalor.component.scss']
})
export class CadeiadevalorComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
