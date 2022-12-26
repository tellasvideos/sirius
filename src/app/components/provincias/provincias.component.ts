import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.scss']
})
export class ProvinciasComponent implements OnInit {

  provincias: any;
  id: any;
  constructor(
    private ds: DataService
  ) { }

  ngOnInit(): void {
    //this.get_provinces();
  }

  get_provinces() {
    this.ds.get_Provinces().subscribe(data => {
      this.provincias = data;
      //console.log(data)
    })
  }


  // delete 
  deleteprov(id: any) {
    this.ds.deleteProvinces(id).subscribe()
  }

}
