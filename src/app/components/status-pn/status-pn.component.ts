import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-status-pn',
  templateUrl: './status-pn.component.html',
  styleUrls: ['./status-pn.component.scss']
})
export class StatusPnComponent implements OnInit {

  sb:any;
  id:any;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getInterestExpress(),

    this.activatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id'),
        console.log('id clicado', this.id)

     /* this.dataService.getInterestExpressByid(this.id).subscribe(data => {
        this.angForm.patchValue(data)
        console.log('dados do id clicado', data)
        console.log(this.angForm.value)
      });*/

    });
  }

  getInterestExpress() {
    this.dataService.getInterestExpress().subscribe(data => {
      this.sb = data,
        console.log('getting int ', data)
    })
  }

}
