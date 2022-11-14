import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //img: any;

  constructor() { }

  hideImg() {
   document.getElementById('img')
  }
  

  ngOnInit(): void {
    //this.hideImg();
  }

}
