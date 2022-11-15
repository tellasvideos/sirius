import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-andamentomanifes',
  templateUrl: './andamentomanifes.component.html',
  styleUrls: ['./andamentomanifes.component.scss']
})
export class AndamentomanifesComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
