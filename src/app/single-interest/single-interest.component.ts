import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CadeiaVal } from '../interfaces/cadeiaVal';
import { ManInteress } from '../interfaces/manInteress';
import { DataService } from '../services/data.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-single-interest',
  templateUrl: './single-interest.component.html',
  styleUrls: ['./single-interest.component.scss']
})
export class SingleInterestComponent implements OnInit {

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
      farm_name: ['',  Validators.required],
      proponent_name: ['', Validators.required],
      province: ['', Validators.required],
      county: ['', Validators.required],
      village: ['', Validators.required],
      condition: ['', Validators.required],
      was_evaluated: ['', Validators.required],
      observations: ['', Validators.required],
      total_farm_area: ['', Validators.required],
      pn_cultivation_area: ['', Validators.required],
      total_project_cost: ['', Validators.required],
      pdac_financing: ['', Validators.required],
      bank_load: ['', Validators.required],
      own_resources: ['', Validators.required],
      statute: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      proposer: ['', Validators.required],
      value_chain: ['', Validators.required]
    })
  }

  ngOnInit(): void {
   this.proponestesPDAC(),
      this.getCadeiaDeValor(),
      this.getInterestExpress(),

      this.activatedRoute.paramMap.subscribe(paramId => {
        this.id = paramId.get('id'),
          console.log('id clicado', this.id)

        this.dataService.getInterestExpressByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
          console.log('dados do id clicado', data)
          console.log(this.angForm.value)
        });

      });
  }

  EditInterestExpress() {

    this.dataService.editInterestExpression(this.id, this.angForm.value).subscribe(
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
