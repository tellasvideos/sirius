import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  proponents:any;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.proponentes()
  }

  proponentes(){
    this.ds.proponentPDAC().subscribe(data => {
      this.proponents = data;
      this.filterDsc()
      console.log(data.length)
    })
  }

  filterDsc(){
    this.proponents = this.proponents.sort(function(a: any, b: any){
      return b._id - a._id
    })
  }

}
