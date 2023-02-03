import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  angForm: FormGroup;
  user:any;
  departamento:any;

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
    console.log(this.angForm.value);
    this.getDepartaments();
  }

  getDepartaments() {
    this.dataService.get_Departaments().subscribe(data => {
      this.departamento = data;
      console.log(data)
    })
  }

  postdata(data:any){
    this.dataService.AddUser(this.angForm.value).subscribe(data =>{
      this.user = data;
      console.log('salvo', data)
    })
    this.modalRef.close();
  }

}