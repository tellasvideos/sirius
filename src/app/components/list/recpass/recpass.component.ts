import { HttpHeaders } from '@angular/common/http';
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

  retorno: any;
  email: any;
  password: any;

  ngOnInit(): void {

  }

  setnewPassword() {
    let DADOS = { "email": this.email, "password": this.password }
    this.ds.setPass(DADOS).subscribe(data => {
      this.retorno = data;
      console.log('pass alterada:', DADOS)
    });
    this.email = '';
    this.password = '';
  }

}
