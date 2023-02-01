import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-cadeia',
  templateUrl: './edit-cadeia.component.html',
  styleUrls: ['./edit-cadeia.component.scss']
})
export class EditCadeiaComponent implements OnInit {

  sideBarOpen = true;
  id: any;
  cadeia: any;
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCadeia();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),

        this.dataService.getCadeiaByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });

    });
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  getCadeia() {
    this.dataService.getValueChains().subscribe(data => {
      this.cadeia = data;
    })
  }

  editCadeia(data: any){
    this.dataService.EditCadeia(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.getCadeia()
    this.route.navigate(['cadeiadevalor/'])
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
