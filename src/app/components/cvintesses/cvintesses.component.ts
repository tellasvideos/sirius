import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cvintesses',
  templateUrl: './cvintesses.component.html',
  styleUrls: ['./cvintesses.component.scss']
})
export class CvintessesComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
