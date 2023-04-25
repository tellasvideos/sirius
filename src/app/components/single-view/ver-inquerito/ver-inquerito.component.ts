import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-ver-inquerito',
  templateUrl: './ver-inquerito.component.html',
  styleUrls: ['./ver-inquerito.component.scss']
})
export class VerInqueritoComponent implements OnInit {

 
  sideBarOpen = true;
  id: any;
  inquiridor: any;
  angForm: FormGroup;
  inqueritosData:any;

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
    this.getInqueritosData();

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id');
      this.dataService.getDepartById(this.id).subscribe(data => {
        this.angForm.patchValue(data)
      });
    });
  }

  getInqueritosData(){
    this.dataService.get_InquireForm().subscribe(data =>{
      this.inqueritosData = data;
    })
  }


  

 
}
