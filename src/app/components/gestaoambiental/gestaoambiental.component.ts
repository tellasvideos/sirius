import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestaoambiental',
  templateUrl: './gestaoambiental.component.html',
  styleUrls: ['./gestaoambiental.component.scss']
})
export class GestaoambientalComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
}
