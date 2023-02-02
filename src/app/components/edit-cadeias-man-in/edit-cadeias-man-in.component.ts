import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Location } from "@angular/common";
import Swal from "sweetalert2";
@Component({
  selector: 'app-edit-cadeias-man-in',
  templateUrl: './edit-cadeias-man-in.component.html',
  styleUrls: ['./edit-cadeias-man-in.component.scss']
})
export class EditCadeiasManInComponent implements OnInit {

  sideBarOpen = true;
  id: any;
  angForm: FormGroup;
  cadeiaManIn: any;
  cadeiaDeValor:any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.angForm = this.fb.group({
      value_chain: ['', Validators.required],
      interest_expression: ['', Validators.required],
      name_value_chain: ['', Validators.required],
      observations: ['', Validators.required],
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.getCadeiasManIn();
    this.getCadeiaValor();

    this.activatedRoute.paramMap.subscribe(paramId =>{
      this.id = paramId.get('id');
      this.dataService.getCadeiaManInById(this.id).subscribe(data =>{
        this.angForm.patchValue(data)
      });
    });
  }

  editCadeiaManInt(data:any){
    this.dataService.Edit_CadeiaManIn(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.getCadeiasManIn();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  getCadeiasManIn() {
    this.dataService.get_BusinessPlan_statutos().subscribe(data => {
      this.cadeiaManIn = data;
    })
  }

  getCadeiaValor(){
    this.dataService.getValueChains().subscribe(data =>{
      this.cadeiaDeValor = data;
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
