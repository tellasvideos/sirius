import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-edit-depart',
  templateUrl: './edit-depart.component.html',
  styleUrls: ['./edit-depart.component.scss']
})
export class EditDepartComponent implements OnInit {

  sideBarOpen = true;
  id: any;
  inquiridor: any;
  angForm: FormGroup;
  depart: any;

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

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.get_depart();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id');
      this.dataService.getDepartById(this.id).subscribe(data => {
        this.angForm.patchValue(data)
      });
    });
  }

  editDepart(data: any) {
    this.dataService.EditDepartamento(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.get_depart();
    this.route.navigate(['departamento/']);
  }

  get_depart() {
    this.dataService.get_Departaments().subscribe(data => {
      this.depart = data;
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
