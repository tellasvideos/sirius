import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proponentes',
  templateUrl: './proponentes.component.html',
  styleUrls: ['./proponentes.component.scss']
})
export class ProponentesComponent implements OnInit {
  sideBarOpen = true;
  keyWord: string = '';
  proponente: any;
  //modalRef: MdbModalRef<AddInqueritoComponent> | null = null;
  provinces: any;
  propName: any;


  constructor(private modalService: MdbModalService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getProvincias()
    this.dataService.proponentPDAC().subscribe(data => {
      this.proponente = data;
      this.filterDsc()

      console.log('provincias do pdac: ', data[0]['s2gp/s2g3/rep_provincia'])

      console.log('provincias da biplan: ', this.provinces[14].id)
    })

  /*  const array1 = ['a', 'b', 'c'];
    const array2 = ['d', 'e', 'f'];
    const array3 = this.proponente.concat(this.provinces);

    console.log(array3);*/

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {

  }

  filterDsc() {
    this.proponente = this.proponente.sort(function (a: any, b: any) {
      return b._id - a._id
    })
  }

  getProvincias() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provinces = data;
      console.log(data)
    })
  }

}
