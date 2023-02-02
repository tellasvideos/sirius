import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Location } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./edit-status.component.scss']
})
export class EditStatusComponent implements OnInit {
  
  sideBarOpen = true;
  id: any;
  angForm: FormGroup;
  status: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.angForm = this.fb.group({
      interest_expression: ['', Validators.required],
      status: ['', Validators.required],
      observations: ['', Validators.required],
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.getStatus();

    this.activatedRoute.paramMap.subscribe(paramId =>{
      this.id = paramId.get('id');
      this.dataService.getStatusById(this.id).subscribe(data =>{
        this.angForm.patchValue(data)
      });
    });

  }

  editStatus(data:any){
    this.dataService.Edit_BP_Status(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.getStatus();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  getStatus() {
    this.dataService.get_BusinessPlan_status().subscribe(data => {
      this.status = data;
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
