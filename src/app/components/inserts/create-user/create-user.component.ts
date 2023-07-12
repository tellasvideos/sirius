import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";
import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  angForm: FormGroup;
  user: any;
  departamento: any;

  constructor(
    public modalRef: MdbModalRef<CreateUserComponent>,
    private fb: FormBuilder,
    private dataService: DataService,
    private route: Router
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
    //  console.log(this.angForm.value);
    this.getDepartaments();
    this.getAllUsers();
  }

  getDepartaments() {
    this.dataService.get_Departaments().subscribe(data => {
      this.departamento = data;
      // console.log(data)
    })
  }

  user_: any;
  getAllUsers() {
    this.dataService.getUser().subscribe(data => {
      this.user_ = data;
    })
  }

  postdata(data: any) {
    this.dataService.AddUser(this.angForm.value).subscribe(

      success => {
        this.user = success;
        this.alert_success();
        // console.log('salvo', data)
         // Espera 3 segundos antes de recarregar a página
         timer(1800).pipe(delay(1800)).subscribe(() => {
          location.reload();
        });
      },

      error => {
        this.alert_error();
      }

    );
    this.getAllUsers();
    this.modalRef.close();
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
