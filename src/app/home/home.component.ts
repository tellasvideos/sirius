import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

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

  pass_: any;

  constructor(private auth: DataService) { }

  ngOnInit(): void {
  }

  
  login(email:any, pass:any){

   
    this.user[0].username == email;
    this.user[0].password == pass;

    console.log(this.user)

    localStorage.removeItem('user');
    this.auth.userLogin(this.user).subscribe(data =>{
      this.user = data
      console.log('Depois do login', data);
    })

  }

}
