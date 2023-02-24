import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

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
  prov:any;
  provincias:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.route.queryParams.subscribe(data => {
      this.proponente = data;
      //console.log(data)
    })
    this.getProvincias()
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  devolve_nome_provincia(id: any) {
    this.prov = this.provincias.filter((p: any) => p.province_id === id)[0].name
    //    console.log(this.prov)
    return this.prov
  }

  getProvincias() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provincias = data;
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.proponente = data;
      this.id = data['id'];
      this.prop_nome === data['prop_nome'];
      // console.log('queryparams', data['prop_nome'])
      /* this.dataService.proponentPDAC().subscribe(data => {
         this.proponente = data;
       })*/
    })
  }

}
