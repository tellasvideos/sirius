import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

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
    this.ds.setPass(DADOS).subscribe(

      success => {
        this.retorno = success;
        this.alert_success()
        //console.log('pass alterada:', DADOS)
      },

      error => {
        this.alert_error2();
      }
    );
    this.email = '';
    this.password = '';
  }

  alert_error2() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa ocorreu mal!',
    })

  }

  alert_success() {
    Swal.fire({
      icon: "success",
      title: "Salvo",
      showConfirmButton: false,
      timer: 1500
    })
  }

}
