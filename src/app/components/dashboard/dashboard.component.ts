import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  imgOnheader: any;

  constructor( public img: HeaderComponent ) { }

  ngOnInit(): void {
   //this.img.hideImg() === this.imgOnheader
  }

}
