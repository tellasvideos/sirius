import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pn-implementados',
  templateUrl: './pn-implementados.component.html',
  styleUrls: ['./pn-implementados.component.scss']
})
export class PnImplementadosComponent implements OnInit {
  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  keyWord: string = '';
  sideBarOpen = true;

  user_logged: any;

  angForm!: FormGroup;

  inqueritos:any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ){ }

  ngOnInit(): void {
     // Pegar dados do user logado
     this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    this.getInqueritos()

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      console.log('inqueritos', this.inqueritos);
      this.inqueritos.sort((a:any, b:any) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

}
