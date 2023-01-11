import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() user:any;
  usuario:any;
  proponents:any;
i:any;
  constructor(private ds: DataService, 
    private auth: AuthService) { 
      this.ds.getUser().subscribe(data =>{
        this.usuario = data;
        console.log('olá estas logado: ', data[0].username)
      })
    }

  ngOnInit(): void {
    this.proponentes()

    

    /*for (this.i = 0; this.i <= 4 && this.filterDsc(); this.i++) {
      console.log(this.proponents[0]);
    } */
  }

  proponentes(){
    this.ds.proponentPDAC().subscribe(data => {
      this.proponents = data;
      this.filterDsc()
      console.log(data[0], data[1], data[2], data[3])
    })
  }

  filterDsc(){
    this.proponents = this.proponents.sort(function(a: any, b: any){
      return b._id - a._id
    })
  }

  logout(){
    this.auth.logout()
  }

}
