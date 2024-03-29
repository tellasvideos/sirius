import { Component, OnInit } from "@angular/core";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { Subscription } from "rxjs";
import { CadeiaVal } from "src/app/interfaces/cadeiaVal";
import { ManInteress } from "src/app/interfaces/manInteress";
import { Cidade } from "src/app/models/cidade";
import { Condicao } from "src/app/models/condicao.model";
import { Pais } from "src/app/models/pais";
import { DataService } from "src/app/services/data.service";
import Swal from "sweetalert2"

@Component({
  selector: "app-add-interesses",
  templateUrl: "./add-interesses.component.html",
  styleUrls: ["./add-interesses.component.scss"],
  preserveWhitespaces: true,
})
export class AddInteressesComponent implements OnInit {

  provinces: any;

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

  pdacOB?: Subscription;

  prop_nome: any;
  prop_empresa: any;
  prop_nif: any;
  prop_categ: any;
  rep_nome: any;
  rep_telemovel: any;
  rep_provincia: any;
  rep_municipio: any;
  rep_bairro: any;

  constructor(
    public modalRef: MdbModalRef<AddInteressesComponent>,
    private dataService: DataService,
  ) {

    this.atualizardados();
  }

  ngOnInit(): void {
    this.proponestesPDAC();
    this.getCadeiaDeValor();
    this.get_provinces();
  }

  salvarInterestExpress() {
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
    this.dataService.salvaInterestExpress(interesse).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.atualizardados()
    this.modalRef.close();
  }

  atualizardados() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.interest = data;
      //console.log(data)
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

  getCadeiaDeValor() {
    this.dataService.getValueChains().subscribe(data => {
      this.cadeiaDeValor = data;
      //console.log('cadeia de valor', data)
    })
  }

  get_provinces() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provinces = data;
      //console.log('prov', data)
    })
  }

  filterDsc() {
    this.PDAC = this.PDAC.sort(function (a: any, b: any) {
      return b._id - a._id
    })
  }
}
