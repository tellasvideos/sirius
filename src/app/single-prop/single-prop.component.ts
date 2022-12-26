import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-single-prop',
  templateUrl: './single-prop.component.html',
  styleUrls: ['./single-prop.component.scss']
})
export class SinglePropComponent implements OnInit {

  proponente: any;

  sideBarOpen = true;

  id: any;
  prop_nome: any;

  //modalRef: MdbModalRef<AddInqueritoComponent> | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
    ) 
    {
    this.route.queryParams.subscribe(data => {
      this.proponente = data;
      //console.log(data)
    })

    this.dataService.proponentPDAC().subscribe(data => {
      this.proponente = data;
    })
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.proponente = data;
      this.id = data['id'];
      this.prop_nome = data['prop_nome'];
      console.log('queryparams', data)
      this.dataService.proponentPDAC().subscribe(data => {
        this.proponente = data;
      })
    })


  }




}
