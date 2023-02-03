import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Location } from "@angular/common";
import Swal from "sweetalert2";


@Component({
  selector: 'app-edit-acordo',
  templateUrl: './edit-acordo.component.html',
  styleUrls: ['./edit-acordo.component.scss']
})
export class EditAcordoComponent implements OnInit {

  sideBarOpen = true;
  id: any;
  angForm: FormGroup;
  acordo: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.angForm = this.fb.group({
      agreement_name: ['', Validators.required],
      observations: ['', Validators.required],
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.getAcordos();

    this.activatedRoute.paramMap.subscribe(paramId =>{
      this.id = paramId.get('id');
      this.dataService.getAcordoById(this.id).subscribe(data =>{
        this.angForm.patchValue(data)
      });
    });

  }

  editAcordo(data:any){
    this.dataService.EditAcordo(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.getAcordos();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  getAcordos() {
    this.dataService.get_Proposal_Agreement().subscribe(data => {
      this.acordo = data;
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
