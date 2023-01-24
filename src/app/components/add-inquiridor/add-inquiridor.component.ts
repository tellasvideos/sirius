import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-add-inquiridor',
  templateUrl: './add-inquiridor.component.html',
  styleUrls: ['./add-inquiridor.component.scss']
})
export class AddInquiridorComponent implements OnInit {

  inquiridores:any;
  provincias:any;

  responsible:any;
  performance_in_village:any;
  performance_in_community:any;
  performance_in_county:any;
  province:any;

  constructor(
    public modalRef: MdbModalRef<AddInquiridorComponent>,
    private dataService: DataService
  ) { }


  ngOnInit(): void {
    this.get_inquiridor();
    this.get_provincias();
  }

  save_iquirier(){
    let Inquirier = {
      "responsible": this.responsible,
      "performance_in_village": this.performance_in_village,
      "performance_in_community": this.performance_in_community,
      "performance_in_county": this.performance_in_county,
      "province": this.province
    }
    this.dataService.salvaInquiriers(Inquirier).subscribe(
      success => {this.alert_success()},
      error => {this.alert_error()}
    )
    this.get_inquiridor()
    this.modalRef.close();
  }

  get_inquiridor() {
    this.dataService.get_Inquiriers().subscribe(data =>{
      this.inquiridores = data;
      console.log(data)
    })
  }

  get_provincias(){
    this.dataService.get_Provinces().subscribe(data =>{
      this.provincias = data;
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

}
