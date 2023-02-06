import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recpass',
  templateUrl: './recpass.component.html',
  styleUrls: ['./recpass.component.scss']
})
export class RecpassComponent implements OnInit {

  constructor(private ds: DataService, public route: Router) { }

  //token = '1c644080bc6af5e8990a30c964157719cbb6576c';
  url ='http://localhost:4200/recpass';

  user: any =[{
    username: '',
    password: ''
  }] 

  username:any;

  retorno:any;

  ngOnInit(): void {
   
  }

  forgtPass(email: any, route_url: any) {

    console.log(this.username)

    this.ds.forgtPass(this.username, this.url).subscribe(data => {
      this.retorno = data;
      console.log('salvo', this.username, this.url)
    });

  }

}
