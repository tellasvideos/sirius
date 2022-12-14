import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ManInteress } from 'src/app/interfaces/manInteress';
import { Cidade } from 'src/app/models/cidade';
import { Condicao } from 'src/app/models/condicao.model';
import { Pais } from 'src/app/models/pais';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-interesses',
  templateUrl: './add-interesses.component.html',
  styleUrls: ['./add-interesses.component.scss'],
  preserveWhitespaces: true,
})
export class AddInteressesComponent implements OnInit {

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

  PDAC:any;

  constructor(
    public modalRef: MdbModalRef<AddInteressesComponent>,
    private dataService: DataService,
  ) {
    //console.log(this.condicao)
    //this.paises = this.dataService.getPaises();
    //this.condicao = this.dataService.getCondicao();
    this.atualizardados()
  }

  ngOnInit(): void {
    this.dataService.proponentPDAC().subscribe(data =>{
      this.PDAC = data;
      console.log('proponentes pdac: ', data)
    })
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
   this.dataService.getInterestExpress().subscribe(data =>{
    this.interest = data;
    console.log(data)
   })
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }
  alert_success() {
    Swal.fire({
      icon: 'success',
      title: 'Salvo',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
