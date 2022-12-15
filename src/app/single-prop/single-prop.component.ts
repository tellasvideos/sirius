import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-single-prop',
  templateUrl: './single-prop.component.html',
  styleUrls: ['./single-prop.component.scss']
})
export class SinglePropComponent implements OnInit {

  public proponente: any;

  sideBarOpen = true;

  //modalRef: MdbModalRef<AddInqueritoComponent> | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.dataService.proponentPDAC().subscribe(data => {
      this.proponente = data;
      console.log(data)
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      this.proponente = res;
      console.log(res)
    })

    this.dataService.proponentPDAC().subscribe(data => {
      this.proponente = data;
    })
  }




}
