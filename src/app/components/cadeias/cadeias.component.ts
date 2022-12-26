import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadeiaVal } from 'src/app/interfaces/cadeiaVal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cadeias',
  templateUrl: './cadeias.component.html',
  styleUrls: ['./cadeias.component.scss']
})
export class CadeiasComponent implements OnInit {

  sideBarOpen = false;
  cadeiaDeValor?: CadeiaVal[];

  sb: any;
  id: any;
  _chains: any;
  chains_name:any;

  chainsId = 1;
  observations: any;
  interest_expression: any;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.getCadeia();
    this.getCadeiaInterest();
    this.getInterestExpress();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        console.log('id clicado', this.id)

    });
  }

  salvarCadeia() {

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id')
      console.log('id man int', this.id)

      //this.passarId()

      let Cadeias = {"name_value_chain": this.chains_name, "observations": this.observations, "interest_expression": this.id, "value_chain": this.chainsId}
      this.dataService.salva_ValueChainsIE(Cadeias).subscribe(
        success => { this.getCadeiaInterest() },
        error => { this.alert_error() }
      )
      this.getCadeia();
      Swal.fire({
        icon: 'success',
        title: 'Salvo',
        showConfirmButton: false,
        timer: 1500
      })

    })

  }

  // delete uma cadeia
  delete_ValueChainsIExpress(id: any) {
    this.dataService.delete_ValueChainsIExpress(id).subscribe(
      success => { this.getCadeiaInterest(); },
      error => { this.alert_error(); }
    )
  }

  getInterestExpress() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.sb = data,
        console.log('getting int ', data)
    })
  }

  getCadeiaInterest() {
    this.dataService.get_ValueChainsIE().subscribe(data => {
      this._chains = data;
      console.log('get cadeias ManInterest', data)
    })
  }

  getCadeia() {
    this.dataService.getValueChains().subscribe(data => {
      this.cadeiaDeValor = data;
      console.log('get cadeias', data)
    })
  }

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }


}
