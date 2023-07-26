import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  user:any;

  constructor(private userService: DataService) { }

  ngOnInit(): void {

     // Pegar dados do user logado
     this.userService.getUserData().subscribe((data: any) => {
      this.user = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log( 'User logado', this.user)
    });
  }

}
