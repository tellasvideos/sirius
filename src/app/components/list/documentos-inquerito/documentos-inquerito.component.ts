import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-documentos-inquerito',
  templateUrl: './documentos-inquerito.component.html',
  styleUrls: ['./documentos-inquerito.component.scss']
})
export class DocumentosInqueritoComponent implements OnInit {

  keyWord!: string;
  documentos_inquerito: any;
  user_logged: any;
  sideBarOpen = true;
  userFrontOff: any;
  pdac: any;

  formGroup!: FormGroup;
  angForm!: FormGroup;
  id: any;

  documento_do_proponente!: File;
  documento_1!: File;
  documento_2!: File;
  documento_3!: File;
  documento_4!: File;
  documento_5!: File;
  documento_6!: File;
  documento_7!: File;
  documento_8!: File;
  documento_9!: File;
  documento_10!: File;
  documento_11!: File;
  documento_12!: File;
  documento_13!: File;
  documento_14!: File;
  documento_15!: File;
  documento_16!: File;
  documento_17!: File;
  documento_18!: File;
  documento_19!: File;
  documento_20!: File;
  inquerito_preenchido!: File;


  constructor(
    private dataService: DataService, private activatedRoute: ActivatedRoute, private fb: FormBuilder

  ) {
    this.angForm = this.fb.group({
      documento_do_proponente: [false],
      inquerito_preenchido: [false]
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  // opção 1
  enviarArquivos(post: any) {
    const formData = new FormData();

    if (this.angForm.get('inquerito_preenchido')?.value) {
      const blob = new Blob([this.angForm.get('inquerito_preenchido')?.value], { type: this.angForm.get('inquerito_preenchido')?.value.type });
      formData.append('inquerito_preenchido', blob, this.angForm.get('inquerito_preenchido')?.value.name);
    }

    if (this.angForm.get('documento_do_proponente')?.value) {
      const blob = new Blob([this.angForm.get('documento_do_proponente')?.value], { type: this.angForm.get('documento_do_proponente')?.value.type });
      formData.append('documento_do_proponente', blob, this.angForm.get('documento_do_proponente')?.value.name);
    } else {
      for (let i = 0; i < this.angForm.get('documento_do_proponente')?.value.length; i++) {
        formData.append('documento_do_proponente', this.angForm.get('documento_do_proponente')?.value[i], this.angForm.get('documento_do_proponente')?.value[i].name);
      }
     
    }

    this.alert_success()

    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success(); },
     // error => { this.alert_error(); }
    );
  }

  // opção 2
  enviarDocumentos(post: any) {
    const formData = new FormData();
    for (let i = 0; i < this.angForm.get('documento_do_proponente')?.value.length; i++) {
      formData.append('documento_do_proponente', this.angForm.get('documento_do_proponente')?.value[i], this.angForm.get('documento_do_proponente')?.value[i].name);
    }
    formData.append('inquerito_preenchido', this.angForm.get('inquerito_preenchido')?.value, this.angForm.get('inquerito_preenchido')?.value.name);

    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success(); },
      error => { this.alert_error(); }
    );
  }


  selecionarDocumentos(event: any) {
    this.documento_do_proponente = event.target.files;
  }



  ngOnInit(): void {
    this.getPdac();
    this.getUserFrontOFF();

    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    this.formGroup = new FormGroup({
      documento_do_proponente: new FormControl(),
      inquerito_preenchido: new FormControl()
    });

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        this.dataService.getInqueritoByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });
    });
  }

  // filtrar usuarios do departamento front off
  getUserFrontOFF() {
    this.dataService.getUser().subscribe(data => {
      this.userFrontOff = data.filter(user => user.department === 'Front Off');
      console.log('users do front off: ', data)
    })
  }

  getPdac() {
    this.dataService.proponentPDAC().subscribe(data => {
      this.pdac = data;
      this.pdac = this.pdac.sort(function (a: any, b: any) {
        return b._id - a._id
      })
    })
  }

  alert_error() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alguma coisa correu mal, verifique se preencheu os campos correctamente.",
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
