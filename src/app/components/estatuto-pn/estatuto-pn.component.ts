import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-estatuto-pn',
  templateUrl: './estatuto-pn.component.html',
  styleUrls: ['./estatuto-pn.component.scss']
})
export class EstatutoPnComponent implements OnInit {

  sb: any;
  id: any;

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
