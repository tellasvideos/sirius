import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  sideBarOpen = true;
  angForm: FormGroup;
  departamento: any;
  usuario: any;
  id: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      department: ['', Validators.required],
      work_function: ['', Validators.required],
      is_admin: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getDepartaments();
    this.getUser();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        console.log('id clicado', this.id)

      this.dataService.getUserByid(this.id).subscribe(data => {
        this.angForm.patchValue(data)
        console.log('dados do id clicado', data)
        console.log(this.angForm.value)
      });

    });

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  editUser(data: any) {
    this.dataService.EditeUsers(this.id, this.angForm.value).subscribe(
      success => { this.alert_success() },
      error => { this.alert_error() }
    )
    this.getUser()
    this.route.navigate(['usuario/'])
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

  getUser() {
    this.dataService.getUser().subscribe(data => {
      this.usuario = data;
      console.log('all  users: ', data)
    })
  }

  getDepartaments() {
    this.dataService.get_Departaments().subscribe(data => {
      this.departamento = data;
      console.log(data)
    })
  }

}
