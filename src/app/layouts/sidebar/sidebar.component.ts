import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() user: any;
  usuario: any;
  proponents?: any;
  i: any;

  logged: any;

  user_logged:any;

  constructor(private ds: DataService,
    private auth: AuthService) {

  }

  ngOnInit(): void {

    const userData = String(localStorage.getItem('user'));
    if (userData) {
      const user = String(userData);
      this.logged = user;
      // console.log( 'passado', this.logged)
    }
    this.proponentes()

    // Pegar dados do user logado
    this.ds.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      //console.log('User logadooooo', this.user_logged.department)
    });
  }

  proponentes() {
    this.ds.proponentPDAC().subscribe(data => {
      this.proponents = data;
      this.filterDsc()
      //  console.log(this.proponents[0]['s2gp/s2g1q1/prop_nome'])
    })
  }

  filterDsc() {
    this.proponents = this.proponents.sort(function (a: any, b: any) {
      return b._id - a._id
    })
  }

  logout() {
    this.auth.logout()
  }

}
