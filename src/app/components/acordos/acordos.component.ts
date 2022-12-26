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
  
  sideBarOpen = false;

  sb: any;
  id: any;
  acordos: any;

  agreement_name: any;
  observations: any;
  proposer_id: any;	


  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAcordos();
    this.getInterestExpress();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.proposer_id = paramId.get('id'),
        console.log('id clicado', this.proposer_id)

    });
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  salvarStatus() {

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.proposer_id = paramId.get('id')
      console.log('id proponente', this.proposer_id)

      //this.passarId()

      let Acordos = { "agreement_name": this.agreement_name, "observations": this.observations, "proposer_id": this.proposer_id }
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
