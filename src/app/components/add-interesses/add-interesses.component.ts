import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
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

  fazenda: any;
  proponente: any;
  provincia: any;
  municipio: any;
  vila: any;
  condicao: Condicao[];
  validado?: boolean;
  observation: any;
  areaTotalFaz?: number;
  areaCultPn?: number;
  custTotalProj?: number;
  financiaPdac: any = [{ id: 1, name:'Sim' }, { id: 2, name: 'Não' }];
  emprestBanc: any = [{ id: 1, name: 'Sim' }, { id: 1, name: 'Não' }];
  recursosProp: any = [{ id: 1, name: 'Sim' }, { id: 1, name: 'Não' }];
  estatuto: any;
  latitude?: number;
  logitude?: number;
  proponent: any;
  cadeiaVal: any;

  constructor(
    public modalRef: MdbModalRef<AddInteressesComponent>,
    private dataService: DataService,
  ) { 
    //console.log(this.condicao)
    //this.paises = this.dataService.getPaises();
    this.condicao = this.dataService.getCondicao();
  
    }

  ngOnInit(): void {
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
      success => { this.atualizardados() },
      error => { this.alert_error() }
    )

    this.modalRef.close();
  }

  atualizardados() {
    console.log('atualizar')
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }


    // Carrega dados da condicao 
    extractCodicaoFromJson(obj: any) {
      return obj.valores.condicao;
    }
    
    extractCreateAtCompFromJson(obj: any) {
      return obj.valores.created_at;
    }

}
