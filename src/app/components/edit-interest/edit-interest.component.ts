import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadeiaVal } from 'src/app/interfaces/cadeiaVal';
import { ManInteress } from 'src/app/interfaces/manInteress';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2"


@Component({
  selector: 'app-edit-interest',
  templateUrl: './edit-interest.component.html',
  styleUrls: ['./edit-interest.component.scss']
})
export class EditInterestComponent implements OnInit {
  cadeiaDeValor?: CadeiaVal[];
  interest?: ManInteress[];

  fazenda: any;
  proponente: any;
  provincia: any;
  municipio: any;
  vila: any;
  condicao: any;
  validado?: boolean;
  observation: any;
  areaTotalFaz?: number;
  areaCultPn?: number;
  custTotalProj?: number;
  financiaPdac: any;
  emprestBanc: any;
  recursosProp: any;
  estatuto: any;
  latitude?: number;
  logitude?: number;
  proponent: any;
  cadeiaVal: any;

  PDAC: any;

  prop_nome: any;
  prop_empresa: any;
  prop_nif: any;
  prop_categ: any;
  rep_nome: any;
  rep_telemovel: any;
  rep_provincia: any;
  rep_municipio: any;
  rep_bairro: any;

  id:any;
  constructor(
    //public modalRef: MdbModalRef<AddInteressesComponent>,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
  
    this.atualizardados()
  }

  ngOnInit(): void {
    this.proponestesPDAC();
    this.getCadeiaDeValor();

    this.activatedRoute.paramMap.subscribe(paramId =>{
      this.id = paramId.get('id');
      console.log(this.id)
    })
  }

  EditInterestExpress() {
    let interesse = {
      "farm_name": this.fazenda,
      "proponent_name": this.proponente,
      "province": this.provincia,
      "county": this.municipio,
      "village": this.vila,
      "condition": this.condicao,
      "was_evaluated": this.validado,
      "observations": this.observation,
      "total_farm_area": this.areaTotalFaz,
      "pn_cultivation_area": this.areaCultPn,
      "total_project_cost": this.custTotalProj,
      "pdac_financing": this.financiaPdac,
      "bank_load": this.emprestBanc,
      "own_resources": this.recursosProp,
      "statute": this.estatuto,
      "latitude": this.latitude,
      "longitude": this.logitude,
      "proposer": this.proponent,
      "value_chain": this.cadeiaVal,
    }
    this.dataService.editInterestExpression(interesse).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.atualizardados()
  }

  atualizardados() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.interest = data;
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
      this.PDAC = data;
      this.filterDsc()
    })
  }

  getCadeiaDeValor(){
    this.dataService.getValueChains().subscribe(data =>{
      this.cadeiaDeValor = data;
      console.log('cadeia de valor', data)
    })
  }

  filterDsc(){
    this.PDAC = this.PDAC.sort(function(a: any, b: any){
      return b._id - a._id
    })
  }
}
