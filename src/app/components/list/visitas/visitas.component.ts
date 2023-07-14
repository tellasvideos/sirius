import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

import { Observable, timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

  today: Date = new Date();
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);


  keyWord: string = '';
  departamento: any;
  depart: any;
  sideBarOpen = true;

  angForm!: FormGroup;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private fb: FormBuilder
  ) {

    this.angForm = this.fb.group({
      nome_simplificado: [''],
      data_da_visista: [''],
      tipo_de_visita: [''],
      numero_ficha_acompanhamento: [''],
      ficha_acompanhamento: [''],
      principais_constatacoes: [''],
      recomendacao_ao_produtor: [''],
      consultor_visita1: [''],
      consultor_visita2: [''],
      created_at: ['']
    });

  }

  ngOnInit(): void {
    this.getUserSalvaguarde();
    this.getUserapoioTecnico();
    this.get_visitas();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  alert_success() {
    Swal.fire({
      icon: "success",
      title: "Salvo",
      showConfirmButton: false,
      timer: 1400
    })
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }

  visitaOPtions = [
    'Acompanhamento técnico',
    'Salvaguarde'
  ]

  selectedFile: any;
  onSelectedFile(e: any) {
    this.selectedFile = e.target.files;
    console.log('doc selected', this.selectedFile)
  }

  option: any;
  carregartipo_visita() {
    switch (this.angForm.get('tipo_de_visita')?.value) {
      case 'Acompanhamento técnico':
        this.option = this.UserapoioTecnico;
        console.log(this.angForm.get('tipo_de_visita')?.value)
        break;
      case 'Salvaguarde':
        this.option = this.userSalvaGuarde;
        break;
      default:
        this.option = [];
    }
  }

  // filtrar usuarios do departamento Salvaguarde
  userSalvaGuarde: any;
  getUserSalvaguarde() {
    this.dataService.getUser().subscribe(data => {
      this.userSalvaGuarde = data.filter(user => user.department === 'Salvaguarde');
      console.log('salva', this.userSalvaGuarde)
    })
  }


  // filtrar usuarios do departamento Apoio técnico
  UserapoioTecnico: any
  getUserapoioTecnico() {
    this.dataService.getUser().subscribe(data => {
      this.UserapoioTecnico = data.filter(user => user.department === 'Apoio Técnico');
      console.log('apoio', this.UserapoioTecnico)
    })
  }

  saveVisitas() {

    const formData = new FormData()

    let fileList2: FileList = this.selectedFile;
    let ficha_acompanhamento: FileList = fileList2;

    // Verificar se há um arquivo selecionado
    if (this.selectedFile && this.selectedFile?.length > 0) {
      const ficha_acompanhamento = this.selectedFile[0];

      // Verificar se o arquivo não está vazio
      if (ficha_acompanhamento.size > 0) {
        formData.append("ficha_acompanhamento", this.angForm.get('ficha_acompanhamento')?.value);
      }
    }

    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("data_da_visista", this.angForm.get('data_da_visista')?.value);
    formData.append("tipo_de_visita", this.angForm.get('tipo_de_visita')?.value);
    formData.append("numero_ficha_acompanhamento", (this.angForm.get('numero_ficha_acompanhamento')?.value));
    formData.append("principais_constatacoes", this.angForm.get('principais_constatacoes')?.value);
    formData.append("consultor_visita1", this.angForm.get('consultor_visita1')?.value);
    formData.append("consultor_visita2", this.angForm.get('consultor_visita2')?.value);
    formData.append("created_at", this.angForm.get('created_at')?.value);

    this.dataService.Save_Visitas(formData).subscribe(
      success => {

        this.alert_success();
        // close modal
        const modal = document.getElementById('exampleModalToggle');
        if (modal) {
          modal.style.display = 'none';

          /*/ Espera 3 segundos antes de recarregar a página
          timer(2000).pipe(delay(2000)).subscribe(() => {
            location.reload();
          });*/
        }

      },
      error => { this.alert_error(); },
    );
    // this.get_inquireForms();
  }

  visitasData: any;
  get_visitas(){
    this.dataService.Get_visitas().subscribe(data =>{
      this.visitasData = data;
      console.log('visitasdata', this.visitasData)
    })
  }


}



