import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-estatuto-pn',
  templateUrl: './estatuto-pn.component.html',
  styleUrls: ['./estatuto-pn.component.scss']
})
export class EstatutoPnComponent implements OnInit {

  sb: any;
  id: any;
  _statutes: any;

  statutes: any;
  observations: any;
  interest_expression: any;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getStatutes();
    this.getInterestExpress();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        console.log('id clicado', this.id)

    });
  }

  salvarStatutes() {

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id')
      console.log('id man int', this.id)

      //this.passarId()

      let statutes_pn = { "status": this.statutes, "observations": this.observations, "interest_expression": this.id }
      this.dataService.salvaBusinessPlanStatutos(statutes_pn).subscribe(
        success => { this.getStatutes() },
        error => { this.alert_error() }
      )
      this.getStatutes();
      Swal.fire({
        icon: 'success',
        title: 'Salvo',
        showConfirmButton: false,
        timer: 1500
      })

    })

  }

  // delete um statutos
  deleteStatute(id: any) {
    this.dataService.deleteStatutes(id).subscribe(
      success => { this.getStatutes(); },
      error => { this.alert_error(); }
    )
  }

  getInterestExpress() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.sb = data,
        console.log('getting int ', data)
    })
  }

  getStatutes() {
    this.dataService.get_BusinessPlan_statutos().subscribe(data => {
      this._statutes = data;
      console.log('get status', data)
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
