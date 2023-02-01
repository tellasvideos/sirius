import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  sideBarOpen = true;
  PDAC: any;

  id: any;
  sb: any;
  angForm: FormGroup;

  constructor(
    //public modalRef: MdbModalRef<AddInteressesComponent>,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router
  ) {
    //this.atualizardados()

    this.angForm = this.fb.group({
      farm_name: ['', Validators.required],
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

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
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
    this.route.navigate(['interesses/'])
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
