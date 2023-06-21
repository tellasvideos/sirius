import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ManInteress } from 'src/app/interfaces/manInteress';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { SingleInterestComponent } from 'src/app/components/single-view/single-interest/single-interest.component';
import { AddInteressesComponent } from '../../inserts/add-interesses/add-interesses.component';
import { AddAndManifestComponent } from '../../inserts/add-and-manifest/add-and-manifest.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.component.html',
  styleUrls: ['./interesses.component.scss']
})
export class InteressesComponent implements OnInit {

  historico_de_producao_ = [
    'Café',
    'Milho',
    'Feijão',
    'Soja',
    'Batata Rena',
    'Batata Doce']
  user_logged: any;

  today: Date = new Date();
  //minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() -31);
  maxDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 0);

  man_Int_por_provincia: any;
  provincias: any;
  interest?: ManInteress[];
  keyWord: string = '';
  filterText: string = '';
  sideBarOpen = true;

  apagar = false;

  modalRef: MdbModalRef<AddInteressesComponent> | null = null;

  angForm!: FormGroup;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.angForm = this.fb.group({

      consultor_pn: ['', Validators.required],
      inicio_elaboracao_pn: ['', Validators.required],
      fim_elaboracao_pn: [''],
      fim_verificacao: [''],
      area_total_fazenda: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      area_cultivo_pn: ['', Validators.required],
      recursos_proprios: ['', Validators.required],
      financiamento: ['', Validators.required],
      financiamento_bancario: ['', Validators.required],
      historico_producao_2_anos: ['', Validators.required],
      area_cultura_2_anos: ['', Validators.required],
      producao_cultura_2_anos: ['', Validators.required],

      estudo_de_viabilidade: new FormControl(null),
      termo_compromisso_assinado: new FormControl(null),
      projeto_riv_completo: new FormControl(null),
      ftas: new FormControl(null),
      lista_de_trabalhadores: new FormControl(null),
      documentos_administrativos: new FormControl(null),
      ficheiro_riv: new FormControl(null),
      outros_documentos: new FormControl(null),

      /*estudo_de_viabilidade: ['', Validators.required],
      termo_compromisso_assinado: ['', Validators.required],
      projeto_riv_completo: ['', Validators.required],
      ftas: ['', Validators.required],
      lista_de_trabalhadores: ['', Validators.required],
      documentos_administrativos: ['', Validators.required],
      ficheiro_riv: [''],
      outros_documentos: [''],*/
      data_pn_entregue_ao_pdac: [''],
      pn_pendente: [false],
      justificacao_pn_pendente: ['', Validators.required],
      proponente_desistiu: [false],
      created_at: [''],
      //consultor_pn: ['']
    })
  }

  ngOnInit(): void {
    this.getProvincias()
    this.list_interest()
    this.getInqueritos()
    this.checkDates()
    this.getUserBackOFF()

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    this.route.queryParams.subscribe(params => {
      this.inqueritoSelecionado = params;
    });
  }

  inqueritoSelecionado: any | null = null;
  /*// levar dados do inquerito selecionado para o formulario backoffice
  //inqueritos: any[] = [];
  inqueritoSelecionadoId: number | null = null;
  inqueritoSelecionado: any | null = null; // Declare a variável inqueritoSelecionado

  selecionarInquerito(id: number) {
    this.inqueritoSelecionadoId = id;

    this.dataService.getInqueritoDetalhes(id).subscribe(
      (inquerito) => {
        this.inqueritoSelecionado = inquerito;
        console.log( this.inqueritoSelecionadoId)
      },
      (error) => {
        console.error('Erro ao obter detalhes do inquérito:', error);
      }
    );
  }*/

  selecionarInquerito(item: any) {
    this.inqueritoSelecionado = item;
  }

  enviarFormulario() {
    if (this.angForm.valid) {
      const formData = new FormData();

      formData.append('consultor_pn', this.angForm.get('consultor_pn')?.value);
      formData.append('inicio_elaboracao_pn', (this.angForm.get('inicio_elaboracao_pn')?.value));
      formData.append('fim_elaboracao_pn', (this.angForm.get('fim_elaboracao_pn')?.value));
      formData.append('fim_verificacao', (this.angForm.get('fim_verificacao')?.value));
      formData.append('area_total_fazenda', this.angForm.get('area_total_fazenda')?.value);
      formData.append('area_cultivo_pn', this.angForm.get('area_cultivo_pn')?.value);
      formData.append('recursos_proprios', this.angForm.get('recursos_proprios')?.value);
      formData.append('financiamento', this.angForm.get('financiamento')?.value);
      formData.append('financiamento_bancario', this.angForm.get('financiamento_bancario')?.value);
      formData.append('historico_producao_2_anos', this.angForm.get('historico_producao_2_anos')?.value);
      formData.append('area_cultura_2_anos', this.angForm.get('area_cultura_2_anos')?.value);
      formData.append('producao_cultura_2_anos', this.angForm.get('producao_cultura_2_anos')?.value);
      formData.append('estudo_de_viabilidade', this.angForm.get('estudo_de_viabilidade')?.value);
      formData.append('termo_compromisso_assinado', this.angForm.get('termo_compromisso_assinado')?.value);
      formData.append('projeto_riv_completo', this.angForm.get('projeto_riv_completo')?.value);
      formData.append('ftas', this.angForm.get('ftas')?.value);
      formData.append('lista_de_trabalhadores', this.angForm.get('lista_de_trabalhadores')?.value);
      formData.append('documentos_administrativos', this.angForm.get('documentos_administrativos')?.value);
      formData.append('ficheiro_riv', this.angForm.get('ficheiro_riv')?.value);

      // Tratar o campo 'outros_documentos' para lidar com múltiplos arquivos
      const outrosDocumentosFiles = this.angForm.get('outros_documentos')?.value;
      for (let i = 0; i < outrosDocumentosFiles.length; i++) {
        formData.append('outros_documentos[]', outrosDocumentosFiles[i]);
      }

      formData.append('data_pn_entregue_ao_pdac', (this.angForm.get('data_pn_entregue_ao_pdac')?.value));
      formData.append('pn_pendente', this.angForm.get('pn_pendente')?.value);
      formData.append('justificacao_pn_pendente', this.angForm.get('justificacao_pn_pendente')?.value);
      formData.append('proponente_desistiu', this.angForm.get('proponente_desistiu')?.value);
      formData.append('created_at', this.angForm.get('created_at')?.value);

      this.http.post('http://strongboxao.ddns.net:8001/api/v1/formulariosbackoffice/', formData)
        .subscribe(
          (response) => {
            console.log('Formulário enviado com sucesso!', response);
            // Implemente o código para lidar com a resposta da API aqui
          },
          (error) => {
            console.error('Erro ao enviar o formulário:', error);
            // Implemente o código para lidar com o erro aqui
          }
        );
    }
  }

  /*private formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toISOString();
  }*/

  userbackOff: any;
  // filtrar usuarios do departamento back off
  getUserBackOFF() {
    this.dataService.getUser().subscribe(data => {
      this.userbackOff = data.filter(user => user.department === 'Back Off');
      console.log('users do back off: ', data)
    })
  }

  checkDates() {
    const pnEntregueDate = this.angForm.get('data_pn_entregue_ao_pdac')?.value;
    const fimVerificacaoDate = this.angForm.get('fim_verificacao')?.value;
    const today = new Date();

    if (pnEntregueDate > today) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data PN entregue ao PDAC" não pode ser posterior à data de hoje.',
      })
    }

    if (pnEntregueDate < fimVerificacaoDate) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data PN entregue ao PDAC" não pode ser anterior à "Data fim verificacção PN".',
      })
    }
  }

  checkDates_1() {
    const pnEntregueDate = this.angForm.get('inicio_elaboracao_pn')?.value;
    const fimVerificacaoDate = this.angForm.get('fim_elaboracao_pn')?.value;
    const today = new Date();

    if (pnEntregueDate > today) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data inicio elaboração" não pode ser posterior à data de hoje.',
      })
    }

    if (pnEntregueDate > fimVerificacaoDate) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data fim elaboracao PN" não pode ser anterior à "Data inicio elaboração PN".',
      })
    }
  }

  checkDates_2() {
    const fimVerificacaoDate = this.angForm.get('fim_verificacao')?.value;
    const fimElaboracaoDate = this.angForm.get('fim_elaboracao_pn')?.value;
    const today = new Date();

    if (fimElaboracaoDate > today) {

      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data Fim de elaboração PN" não pode ser posterior à data de hoje.',
      })

    }

    if (fimElaboracaoDate > fimVerificacaoDate) {
      Swal.fire({
        icon: 'error',
        //title: 'Oops...',
        text: 'A "Data fim verificação" não pode ser anterior à "Data fim elaboração PN".',
      })
    }
  }

  toggleProponenteDesistiu() {
    const proponenteDesistiu = this.angForm.get('proponente_desistiu')?.value;
    this.angForm.get('proponente_desistiu')?.setValue(proponenteDesistiu);

    if (proponenteDesistiu) {
      //alert('O proponente desistiu!');
    }
  }



  toggleJustificacaoPnPendente() {
    const pnPendente = this.angForm.get('pn_pendente')?.value;
    if (pnPendente) {
      this.angForm.get('justificacao_pn_pendente')?.enable();
    } else {
      this.angForm.get('justificacao_pn_pendente')?.disable();
    }
  }



  inqueritos: any[] = [];
  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      console.log(this.inqueritos);
      this.inqueritos.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }


  downloadFile(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substr(url.lastIndexOf('/') + 1);
    link.target = "_blank"; // Adiciona o atributo target para abrir em um novo separador
    link.click();
  }

  downloadFile_(fileName: string): void {
    const url = `http://strongboxao.ddns.net:9000/sirius/documents/${fileName}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }

  deleteInquire(id: any) {
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
        this.dataService.deleteInquireForm(id).subscribe(
          success => { this.getInqueritos() },
          error => { this.alert_error() }
        )
        Swal.fire(
          'Eliminado!',
          'O seu registo foi eliminado.',
          'success',
        )
      }
    })
  }

  limitarTexto(texto: string, limite: number): string {
    if (texto.length > limite) {
      return texto.slice(0, limite) + '...';
    }
    return texto;
  }

  buscar(id: any) {
    this.dataService.interestExpressionByProvince(id).subscribe(data => {
      this.man_Int_por_provincia = data;
      //console.log('man interest by province', data)
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddInteressesComponent)
  }

  openModaltest(id: any) {
    this.modalRef = this.modalService.open(AddAndManifestComponent)
  }


  list_interest() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.interest = data;
      //console.log('man interest',data)
    })
  }

  // delete um interest express
  deleteInterest(id: any) {
    Swal.fire({
      title: 'De certeza que quer eliminar?',
      text: "Você está prestes a eliminar este Back Off!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2CBF04',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((apagar) => {
      if (apagar.isConfirmed) {
        this.dataService.deleteInterestExpress(id).subscribe(
          success => { this.list_interest(); },
          error => { this.alert_error(); }
        )
        Swal.fire(
          'Eliminado!',
          'O seu registo foi eliminado.',
          'success'
        )
      }
    })

  }

  getProvincias() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provincias = data;
      //console.log('provincias', data)
    })
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }

  alert_error2() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Não encontrado',
    })
  }

}
