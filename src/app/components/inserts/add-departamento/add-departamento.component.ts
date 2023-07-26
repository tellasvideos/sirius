import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2"


@Component({
  selector: 'app-add-departamento',
  templateUrl: './add-departamento.component.html',
  styleUrls: ['./add-departamento.component.scss']
})
export class AddDepartamentoComponent implements OnInit {

  array_depart: any;
  departamento = [
    'Direcção',
    'M&A',
    'Back Off',
    'Front Off',
    'Salvaguarde',
    'Apoio Técnico',
    'Contabilidade',
    'CV & Mercado'
  ]
  name: any;
  description: any;

  constructor(
    public modalRef: MdbModalRef<AddDepartamentoComponent>,
    private ds: DataService
  ) { }


  ngOnInit(): void {
  }

  getDepartaments() {
    this.ds.get_Departaments().subscribe(data => {
      this.array_depart = data;
    })
  }

  SaveDepartamento() {
    let depart = {
      "name": this.name,
      "description": this.description
    }
    this.ds.salvaDepartaments(depart).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.getDepartaments();
    this.modalRef.close();
  }

  alert_error() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alguma coisa correu mal, tente mais tarde.",
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
