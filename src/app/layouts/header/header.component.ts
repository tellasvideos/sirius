import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardComponent } from 'src/app/components/list/dashboard/dashboard.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter()
  //logoOn = '../../../assets/logo.jpg';

  @Input() keyWord: any;

  // keyWord: string = '';

  cadeia: any;

  constructor(private ds: DataService) { }

  hideImg() {
    //this.logoOn = '../../../assets/logo.jpg';
  }


  ngOnInit(): void {
    //this.hideImg();
    this.getCadeia_de_valor();
  }

  toggleSideBar() {
    this.toggleSidebarForMe.emit();
  }

  getCadeia_de_valor() {
    this.ds.getValueChains().subscribe(data => {
      this.cadeia = data;
      console.log(data);
    })
  }

}
