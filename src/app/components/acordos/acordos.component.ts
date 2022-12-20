import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-acordos',
  templateUrl: './acordos.component.html',
  styleUrls: ['./acordos.component.scss']
})
export class AcordosComponent implements OnInit {

  sb: any;
  id: any;
  acordos: any;

  agreement_name: any;
  observations: any;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAcordos();
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

      let Acordos = { "agreement_name": this.agreement_name, "observations": this.observations }
      this.dataService.salvaAcordos(Acordos).subscribe(
        success => { this.getAcordos() },
        error => { this.alert_error() }
      )
      this.getAcordos();
      Swal.fire({
        icon: 'success',
        title: 'Salvo',
        showConfirmButton: false,
        timer: 1500
      })

    })

  }

  // delete um status
  deleteAcordos(id: any) {
    this.dataService.deleteAcordos(id).subscribe(
      success => { this.getAcordos(); },
      error => { this.alert_error(); }
    )
  }

  getInterestExpress() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.sb = data,
        console.log('getting int ', data)
    })
  }

  getAcordos() {
    this.dataService.get_Proposal_Agreement().subscribe(data => {
      this.acordos = data;
      console.log('get acordos', data)
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
