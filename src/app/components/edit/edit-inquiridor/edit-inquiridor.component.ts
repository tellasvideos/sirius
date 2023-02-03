import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-inquiridor',
  templateUrl: './edit-inquiridor.component.html',
  styleUrls: ['./edit-inquiridor.component.scss']
})
export class EditInquiridorComponent implements OnInit {

  sideBarOpen = true;
  id: any;
  inquiridor: any;
  angForm: FormGroup;
  provincias: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.angForm = this.fb.group({
      responsible: ['', Validators.required],
      performance_in_village: ['', Validators.required],
      performance_in_community: ['', Validators.required],
      performance_in_county: ['', Validators.required],
      province: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getInquiridor();
    this.get_provincias();
    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        this.dataService.getInquiridorByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });
    });
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  editInquiridor(data: any) {
    this.dataService.EditInquiridor(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.getInquiridor();
    this.route.navigate(['inquiridor/']);
  }

  getInquiridor() {
    this.dataService.get_Inquiriers().subscribe(data => {
      this.inquiridor = data;
    })
  }

  get_provincias() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provincias = data;
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
