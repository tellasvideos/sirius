import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-edit-inquerito',
  templateUrl: './edit-inquerito.component.html',
  styleUrls: ['./edit-inquerito.component.scss']
})
export class EditInqueritoComponent implements OnInit {


  sideBarOpen = true;
  id: any;
  inquiridor: any;
  angForm: FormGroup;
  manifestacao: any;
  inquerito: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.angForm = this.fb.group({
      responsible: ['', Validators.required],
      interest_expression: ['', Validators.required],
      document_to_proves_date: ['', Validators.required],
      observations: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.get_inquiridor();
    this.get_interest_express();
    this.get_inquerito();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        this.dataService.getInqueritoByid(this.id).subscribe(data => {
          this.angForm.patchValue(data)
        });
    });

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  editInquerito(data: any) {
    this.dataService.EditInquerito(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.get_inquerito();
    this.route.navigate(['inquerito/']);
  }

  get_interest_express() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.manifestacao = data
    })
  }

  get_inquiridor() {
    this.dataService.get_Inquiriers().subscribe(data => {
      this.inquiridor = data;
    })
  }

  get_inquerito() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inquerito = data;
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
