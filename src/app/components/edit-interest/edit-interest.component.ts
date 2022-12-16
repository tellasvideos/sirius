import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CadeiaVal } from 'src/app/interfaces/cadeiaVal';
import { ManInteress } from 'src/app/interfaces/manInteress';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-edit-interest',
  templateUrl: './edit-interest.component.html',
  styleUrls: ['./edit-interest.component.scss']
})
export class EditInterestComponent implements OnInit {
  cadeiaDeValor?: CadeiaVal[];
  interest?: ManInteress[];

  PDAC: any;

  id: any;
  sb: any;
  angForm: FormGroup;

  constructor(
    //public modalRef: MdbModalRef<AddInteressesComponent>,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    //this.atualizardados()

    this.angForm = this.fb.group({
      fazenda: ['', Validators.required],
      proponente: ['', Validators.required],
      provincia: ['', Validators.required],
      municipio: ['', Validators.required],
      vila: ['', Validators.required],
      condicao: ['', Validators.required],
      validado: ['', Validators.required],
      observation: ['', Validators.required],
      areaTotalFaz: ['', Validators.required],
      areaCultPn: ['', Validators.required],
      custTotalProj: ['', Validators.required],
      financiaPdac: ['', Validators.required],
      emprestBanc: ['', Validators.required],
      recursosProp: ['', Validators.required],
      estatuto: ['', Validators.required],
      latitude: ['', Validators.required],
      logitude: ['', Validators.required],
      proponent: ['', Validators.required],
      cadeiaVal: ['', Validators.required]
    })
  }

  ngOnInit(): void {
   //this.proponestesPDAC(),
      //this.getCadeiaDeValor(),
      //this.getInterestExpress(),

      this.activatedRoute.paramMap.subscribe(paramId => {
        this.id = paramId.get('id'),
          console.log('id clicado', this.id)

        this.dataService.getInterestExpressByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
          console.log('dados do id clicado', data)
        });

      });
  }

  EditInterestExpress() {

    this.dataService.editInterestExpression(this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )

    this.atualizardados()
  }

  atualizardados() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.interest = data,
        console.log(data)
    })
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

  proponestesPDAC() {
    this.dataService.proponentPDAC().subscribe(data => {
      this.PDAC = data,
        this.filterDsc()
    })
  }

  getCadeiaDeValor() {
    this.dataService.getValueChains().subscribe(data => {
      this.cadeiaDeValor = data,
        console.log('cadeia de valor', data)
    })
  }

  getInterestExpress() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.sb = data,
        console.log('getting int ', data)
    })
  }

  filterDsc() {
    this.PDAC = this.PDAC.sort(function (a: any, b: any) {
      return b._id - a._id
    })
  }
}
