import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter()
  //logoOn = '../../../assets/logo.jpg';
  constructor() { }

  hideImg() {
    //this.logoOn = '../../../assets/logo.jpg';
  }
  

  ngOnInit(): void {
    //this.hideImg();
  }

  toggleSideBar(){
    this.toggleSidebarForMe.emit();
  }

}
