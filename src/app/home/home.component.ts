import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
  username: any;
  retorno: any;
  _errorLogin = false;
  pass_: any;

  constructor(
    private auth: DataService,
    private authService: AuthService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    var data = [
      "1,234",
      "5,678",
      "9,012"
    ];

    console.log(data);
    let numberArray = data[0].split(',');
    let result = numberArray.join('');
    console.log('virgula eliminada: ', result); // Output: 10000

  }

  forgtPass() {
    let User = { "email": this.username }
    //console.log('vindo do input', User)
    this.auth.forgtPass(User).subscribe(

      success => {
        this.retorno = success;
        Swal.fire({
          icon: 'info',
          text: 'Foi enviada uma mensagem ao seu email por favor, acesse para definir sua nova palavra passe.',
        })
        //console.log('foi enviada uma mensagem ao seu email, para recuperar sua palavra passe.', User)
      },

      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Alguma coisa ocorreu mal, tente mais tarde!',
        });
      }
    );
    this.username = '';
  }

  LOGIN_(data: any) {

    //console.log('input user', this.angForm.value)
    localStorage.removeItem('user');
    this.auth.userLogin(this.angForm.value).subscribe(

      success => {
        this.user = success
        //  console.log('Depois do login', success);
        if (this.user.token) {
          this._errorLogin = false;
          this.authService.setSession(this.user.token);
          localStorage.setItem("userToken", this.user.token);
          localStorage.setItem("user", this.angForm.value['username']);
          // console.log(this.user)
          // localStorage.setItem('user', JSON.stringify(this.user));
          this.route.navigate(['/dashboard'])
        }
      },

      error => {
        this._errorLogin = true;
        // console.log('error')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário não autorizado!',
        })
      }

    )
  }

}
