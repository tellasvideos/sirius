import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ManInteress } from '../interfaces/manInteress';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-single-interest',
  templateUrl: './single-interest.component.html',
  styleUrls: ['./single-interest.component.scss']
})
export class SingleInterestComponent implements OnInit {

 public interest: any

  constructor(
    public modalRef: MdbModalRef<SingleInterestComponent>,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(res => {
      this.interest = res;
      console.log(res)
    })

    this.dataService.getInterestExpress().subscribe(data =>{
      this.interest = data;
      console.log(data)
    })
  }

}
