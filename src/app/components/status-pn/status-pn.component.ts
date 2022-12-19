import { ParseSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-status-pn',
  templateUrl: './status-pn.component.html',
  styleUrls: ['./status-pn.component.scss']
})
export class StatusPnComponent implements OnInit {

  sb: any;
  id: any;
  _status: any;

  status: any;
  observations: any;
  interest_expression: any;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getStatus();
    this.getInterestExpress();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        console.log('id clicado', this.id)

    });
  }

  salvarStatus() {

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id')
      console.log('id man int', this.id)

      //this.passarId()

      let status_pn = { "status": this.status, "observations": this.observations, "interest_expression": this.id }
      this.dataService.salvaBusinessPlanStatus(status_pn).subscribe(
        success => { this.getStatus() },
        error => { this.alert_error() }
      )
      this.getStatus();
      Swal.fire({
        icon: 'success',
        title: 'Salvo',
        showConfirmButton: false,
        timer: 1500
      })

    })

  }

  passarId() {
    this.dataService.getInterestExpressByid(this.id).subscribe(data => {
      this.id.patchValue(data)
      console.log('dados do id clicado', data)
      console.log(this.id.value)
    });
  }

  getInterestExpress() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.sb = data,
        console.log('getting int ', data)
    })
  }

  getStatus() {
    this.dataService.get_BusinessPlan_status().subscribe(data => {
      this._status = data;
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
