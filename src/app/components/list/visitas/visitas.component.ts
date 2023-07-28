import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

import { Observable, timer } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import * as XLSX from 'xlsx';

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
  pnFiltrado: any;
  angForm!: FormGroup;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private exportAsService: ExportAsService
  ) {

    this.angForm = this.fb.group({
      nome_simplificado: [''],
      data_da_visista: [''],
      tipo_de_visita: [''],
      numero_ficha_acompanhamento: [''],
      ficha_acompanhamento: [''],
      principais_constatacoes: [''],
      recomendacao_ao_produtor: [''],
      consultor_visita1: [null],
      consultor_visita2: [null],
      created_at: ['']
    });

  }

  inqueritoSelecionado: any;

  ngOnInit(): void {
    this.getUserSalvaguarde();
    this.getUserapoioTecnico();
    this.get_visitas();
    this.get_pnElaborados();
    this.getInqueritos();
    this.getNomes_simplificados_com_status_pn_implementado();
    this.getMunicipio()

    /* this.route.queryParams.subscribe(params => {
       this.inqueritoSelecionado = params;
     });*/
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tabela-visitas'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Visitas');

    /* salvar o arquivo */
    const nomeDoArquivo: string = 'visitas.xlsx';
    XLSX.writeFile(wb, nomeDoArquivo);
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

  alert_error_NS() {
    Swal.fire({
      icon: 'error',
      // title: 'Oops...',
      text: 'Por favor, preencha o campo Nome simplificado.',
    })
  }

  alert_error_TV() {
    Swal.fire({
      icon: 'error',
      // title: 'Oops...',
      text: 'Por favor, preencha o campo Tipo de visita.',
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

  public foundItem: any;
  getForm_Visitas_Data_entradas(inqueritoId: any) {
    this.foundItem = this.visitasData.find((item: any) => item.inquerito === inqueritoId);
    this.dataService.getForm_visitas_Byid(this.foundItem.id).subscribe(data => {
      this.angForm.patchValue(data)
    });
    console.log('form_pn id item', this.foundItem.id);
    return this.foundItem ? this.foundItem.id : 'N/D';
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
        formData.append("ficha_acompanhamento", ficha_acompanhamento, ficha_acompanhamento.name);
      }
    }

    formData.append("nome_simplificado", this.angForm.get('nome_simplificado')?.value);
    formData.append("data_da_visista", this.angForm.get('data_da_visista')?.value);
    formData.append("tipo_de_visita", this.angForm.get('tipo_de_visita')?.value);
    formData.append("numero_ficha_acompanhamento", (this.angForm.get('numero_ficha_acompanhamento')?.value));
    formData.append("principais_constatacoes", this.angForm.get('principais_constatacoes')?.value);
    formData.append("recomendacao_ao_produtor", this.angForm.get('recomendacao_ao_produtor')?.value);
    formData.append("consultor_visita1", this.angForm.get('consultor_visita1')?.value);
    formData.append("consultor_visita2", this.angForm.get('consultor_visita2')?.value);
    formData.append("created_at", this.angForm.get('created_at')?.value);

    if (!this.angForm.get('nome_simplificado')?.value) {
      if (!this.angForm.get('nome_simplificado')?.value) {
        this.alert_error_NS();
      }
      return;
    }

    if (!this.angForm.get('tipo_de_visita')?.value) {
      if (!this.angForm.get('tipo_de_visita')?.value) {
        this.alert_error_TV();
      }
      return;
    }

    if (!this.angForm.get('data_da_visista')?.value) {
      if (!this.angForm.get('data_da_visista')?.value) {
        Swal.fire({
          icon: 'error',
          // title: 'Oops...',
          text: 'Por favor, preencha o campo Data da visita.',
        })
      }
      return;
    }


    this.dataService.Save_Visitas(formData).subscribe(

      success => {

        this.alert_success();
        // close modal
        const modal = document.getElementById('exampleModalToggle');
        if (modal) {
          modal.style.display = 'none';

          // Espera 3 segundos antes de recarregar a página
          timer(2000).pipe(delay(2000)).subscribe(() => {
            location.reload();
          });
        }

      },
      error => { this.alert_error(); },
    );

  }

  visitasData: any;

  get_visitas() {
    this.dataService.Get_visitas().subscribe(data => {
      this.visitasData = data;
      console.log('visitasdata', this.visitasData);
    });
  }
  

  pnElaborados: any;
  get_pnElaborados() {
    this.dataService.Get_pnElaborados().subscribe(data => {
      this.pnElaborados = data/*.filter((item:any) => item.status_pn === 'PN implementado' && item.nome_simplificado );*/
    })
  }

  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  inqueritos: any;
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      console.log('inqueritos reverse', this.inqueritos);
    });
  }

  // works
  getNomes_simplificados_com_status_pn_implementado() {

    this.dataService.get_InquireForm().subscribe(data => {
      this.pnFiltrado = this.pnElaborados.filter((item: any) =>
        (item.status_pn === 'PN implementado' && (item.nome_simplificado !== '' || item.nome_simplificado !== null)));
      //console.log('okkkkk', pnFiltrado)
    });
    //  return this.pnFiltrado
  }

  // encontra a provincia do nome_simplificado passado em visitas na lista inqueritos
  get_Provincia_nome_simplificado(nome_simplificado: any) {
    const inqueritoCorrespondente = this.inqueritos.find(
      (item: any) => item.nome_simplificado === nome_simplificado
    );

    if (inqueritoCorrespondente) {
      console.log(inqueritoCorrespondente.provincia);
      return inqueritoCorrespondente.provincia;
    } else {
      // Caso o item não seja encontrado na lista 'inqueritos', você pode retornar um valor padrão ou tratar essa situação de acordo com a sua necessidade.
      return "N/D";
    }
  }

  // encontra o municipio desse nome simplificado na lista inqueritos
  get_Municipio_nome_simplificado(nome_simplificado: any) {
    const inqueritoCorrespondente = this.inqueritos.find(
      (item: any) => item.nome_simplificado === nome_simplificado
    );

    if (inqueritoCorrespondente) {
      console.log(inqueritoCorrespondente.municipio);
      return inqueritoCorrespondente.municipio;
    } else {
      // Caso o item não seja encontrado na lista 'inqueritos', você pode retornar um valor padrão ou tratar essa situação de acordo com a sua necessidade.
      return "N/D";
    }
  }


  municipio: any;
  retorno: any;
  devolver_nome_municipio(id: string) {
    if (!this.municipio) {
      // Se a lista de municípios ainda não foi carregada, retorne um valor padrão ou trate essa situação de acordo com a necessidade.
      return "N/D";
    }

    const municipioCorrespondente = this.municipio.find((municipio: any) => municipio.id === id);
    console.log(municipioCorrespondente)
    if (municipioCorrespondente) {
      return municipioCorrespondente.name;
    } else {
      // Se o município não for encontrado na lista, retorne um valor padrão ou trate essa situação de acordo com a necessidade.
      return "N/D";
    }
  }

  getMunicipio() {
    this.dataService.getMunicipio().subscribe(data => {
      this.municipio = data;
    })
  }

  del(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      text: "Você está prestes a eliminar este registo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.delete_visitas(id).subscribe(
          success => {
            this.get_visitas(), this.get_visitas()
          },
          error => { this.alert_error() }
        )
        Swal.fire(
          'Eliminado!',
          'O seu registo foi eliminado.',
          'success',
        )
      }
    })
    this.get_visitas()
  }

}



