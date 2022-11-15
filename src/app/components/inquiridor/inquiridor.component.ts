import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inquiridor',
  templateUrl: './inquiridor.component.html',
  styleUrls: ['./inquiridor.component.scss']
})
export class InquiridorComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
}