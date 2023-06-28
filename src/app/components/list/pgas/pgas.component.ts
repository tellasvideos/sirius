import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pgas',
  templateUrl: './pgas.component.html',
  styleUrls: ['./pgas.component.scss']
})
export class PgasComponent implements OnInit {

  // oculta os dias depois do dia de hoje
  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  keyWord: string = '';

  sideBarOpen = true;
  inqueritos: any[] = [];
  user_logged: any;

  angForm!: FormGroup;

  _touched: boolean = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) {

    this.angForm = this.fb.group({
      nome_simplificado: [null, Validators.required], // Nome simplificado
      consultor_pgas: [null, Validators.required], // Consultor pgas
      data_inicio_elaboracao_pgas: [''], // Data inicio elaboracao pgas
      data_fim_elaboracao_pgas: [''], // Data fim elaboracao pgas
      data_aprovacao_pgas_banco_mundial: [''], // Data aprovacao pgas banco mundial
      elaboracao_ogas_pendente: [false], // Elaboracao ogas pendente
      justificacao_pgas_pendente: [null], // Justificacao pgas pendente
      created_at: [''], // Created at
      inquerito: [null], // Referência ao inquérito (pode ser um objeto ou apenas o ID, dependendo da implementação)
      status_pgas: ['']
    });

  }


  ngOnInit(): void {
    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    this.getInqueritos()
    this.get_farm_names()
    this.getUserSalvaguarde()
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      console.log('inqueritos', this.inqueritos);
      this.inqueritos.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  // obter o nome da fazenda (nome_simplificado) da janela back off
  nomesSimplificados: any;
  get_farm_names() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data;
      this.nomesSimplificados = data.map(item => item.nome_simplificado);
      console.log('farm_names ou nomes simplificados: ', this.nomesSimplificados);
    });
  }

  // filtrar usuarios do departamento Salvaguarde
  userSalvaGuarde: any;
  getUserSalvaguarde() {
    this.dataService.getUser().subscribe(data => {
      this.userSalvaGuarde = data.filter(user => user.department === 'Salvaguarde');
      console.log('users do Salvaguarde: ', data)
    })
  }

  checkDates1() {
    const DataInicioPGAS = this.angForm.get('data_inicio_elaboracao_pgas')?.value;
    const DataFimPGAS = this.angForm.get('data_fim_elaboracao_pgas')?.value;

    if (DataFimPGAS >= DataInicioPGAS) {
    } else {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A Data fim elaboração PGAS" não pode ser anterior à "Data inicio elaboração PGAS".',
      })
      this.angForm.get('data_fim_elaboracao_pgas')?.setValue('');
    }
  }

  checkDates2() {
    const DataPGA_BancoMundial = this.angForm.get('data_aprovacao_pgas_banco_mundial')?.value;
    const DataFimPGAS = this.angForm.get('data_fim_elaboracao_pgas')?.value;

    if (DataFimPGAS <= DataPGA_BancoMundial) {
    } else {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'Data de aprovação do PGAS pelo Banco Mundial" não pode ser anterior à "Data fim de elaboração do PGAS".',
      })
      this.angForm.get('data_aprovacao_pgas_banco_mundial')?.setValue('');
    }
  }

  checkOption?: boolean;
  OnElaboracao_ogas_pendente() {
    this.checkOption = this.angForm.get('elaboracao_ogas_pendente')?.value;
  }

}
