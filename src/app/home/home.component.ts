import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any = [{

    username: '',
    password: ''

  }]

  _errorLogin = false;

  pass_: any;

  constructor(private auth: DataService, private route: Router) { }

  ngOnInit(): void {
  }

  login(email: any, pass: any) {
    this.user[0].username == email;
    this.user[0].password == pass;

    console.log(this.user)

    localStorage.removeItem('user');

    this.auth.userLogin(this.user).subscribe(data => {
      this.user = data
      console.log('Depois do login', data);

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

  LOGIN_(email: any, pass: any) {
    this.user[0].username == email;
    this.user[0].password == pass;

    console.log(this.user)

    localStorage.removeItem('user');

    this.auth.userLogin(this.user).subscribe(success => {
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


  /* 
  loginParceiro(mail: any) {

    this.usern[0].email == mail;
    //console.log(mail)
    localStorage.removeItem('user');
    this.sub.getUserAfricaplay(mail, this.token).subscribe(data => {
      this.user = data;
      //console.log(data)
      //console.log(this.sub.getUserAfricaplay)
      try {
        if (this.user[0].email) {
          this.errorLogin = false;
          this.auth.setSession(this.user);
          localStorage.setItem('profile', JSON.stringify(this.user[0]));
          localStorage.setItem('user', JSON.stringify(this.user[0]));
          this.rt.navigate(['/destaques']);
          //this.sub.getUserAfricaplay(this.user[0].ID);
          this.sub.isActive();
        } else {

        }
      } catch (error) {
        this.errorLogin = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Conta Inválida!',
          width: '500',
          confirmButtonColor: "#fbb03b",
          confirmButtonText: `Tentar novamente`,
        });
        this.user = [{
          ID: '',
          created: '',
          email: '',
          fimSubscricao: '',
          pass: '',
          status: '',
          sub: ''
        }];
      }
    })
  }
   */

}
