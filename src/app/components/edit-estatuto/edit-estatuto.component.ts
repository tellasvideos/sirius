import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Location } from "@angular/common";
import Swal from "sweetalert2";
@Component({
  selector: 'app-edit-estatuto',
  templateUrl: './edit-estatuto.component.html',
  styleUrls: ['./edit-estatuto.component.scss']
})
export class EditEstatutoComponent implements OnInit {

 
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
    this.getEstatute();

    this.activatedRoute.paramMap.subscribe(paramId =>{
      this.id = paramId.get('id');
      this.dataService.getEstatuteById(this.id).subscribe(data =>{
        this.angForm.patchValue(data)
      });
    });

  }

  editEstatuto(data:any){
    this.dataService.Edit_BP_Statutes(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.getEstatute();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  getEstatute() {
    this.dataService.get_BusinessPlan_statutos().subscribe(data => {
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
