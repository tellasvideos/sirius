import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  angForm: FormGroup;

  user: any = [{

    username: '',
    password: ''

  }]

  _errorLogin = false;
  pass_: any;

  constructor(
    private auth: DataService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  LOGIN_(data: any) {

    console.log(this.angForm.value)

    localStorage.removeItem('user');

    this.auth.userLogin(this.angForm.value).subscribe(

      success => {
        this.user = success
       // console.log('Depois do login', success);

        if (this.user.token) {
          this._errorLogin = false;
          localStorage.setItem("userToken", this.user.token);
          this.route.navigate(['/dashboard'])
        }
      },

      error => {
        this._errorLogin = true;
        console.log('error')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário não autorizado!',
        })
      }

    )
  }


  login(data: any) {
    console.log(this.angForm.value)
    localStorage.removeItem('user');
    this.auth.userLogin(this.angForm.value).subscribe(data => {
      this.user = data;
      //console.log('Depois do login', data);
      if (this.user.token) {
        this._errorLogin = false;
        localStorage.setItem("userToken", this.user.token);
        this.route.navigate(['/dashboard'])
      } else {
        this._errorLogin = true;
        console.log('error')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário não autorizado!',
        })
      }
    }

    )
  }

  /*
  LOGIN_(email: any, pass: any) {
    this.user[0].username == email;
    this.user[0].password == pass;

    console.log(this.user)

    localStorage.removeItem('user');

    this.auth.userLogin(this.user).subscribe(

      success => {
        this.user = success
        console.log('Depois do login', success);

        if (this.user.token) {
          this._errorLogin = false;
          localStorage.setItem("userToken", this.user.token);
          this.route.navigate(['/dashboard'])
        }
      },

      error => {
        this._errorLogin = true;
        console.log('error')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário não autorizado!',
        })
      }

    )
  }

  */


}
