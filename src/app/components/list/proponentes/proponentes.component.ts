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
  provinces: any;
  propName: any;
  provincias: any;
  prop_por_provincia: any;

  my_stringify: any;
  my_stringify2: any;

  prov: any;
  empresa:any;
  categoria:any;
  municipio:any;
  empre:any;

  constructor(private modalService: MdbModalService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getMunicipio()
    this.getEmpresas()
    this.getCategorias()
    this.getProvincias()
    this.dataService.proponentPDAC().subscribe(data => {
      this.proponente = data;
      this.filterDsc()
      // console.log('provincias do pdac: ', data[0]['s2gp/s2g3/rep_provincia'])
      //console.log('provincias da biplan: ', this.provincias[0].province_id)
    })

    /*  const array1 = ['a', 'b', 'c'];
      const array2 = ['d', 'e', 'f'];
      const array3 = this.proponente.concat(this.provinces);
  
      console.log(array3);*/

  }

  devolve_nome_provincia(id: any) {
    this.prov = this.provincias.filter((p: any) => p.province_id === id)[0].name
    //    console.log(this.prov)
    return this.prov
  }

  devolver_nome_empresa(id:any){
    this.empre = this.empresa.filter((emp: any) => emp.name === id)[0].name
    console.log(this.empre)
    return this.empre
  }

  devolver_nome_municipio(id:any){
    this.empre = this.municipio.filter((emp: any) => emp.name === id)[0].name
    console.log(this.empre)
    return this.empre
  }

  devolver_nome_categoria(id:any){
    this.empre = this.categoria.filter((emp: any) => emp.name === id)[0].name
    console.log(this.empre)
    return this.empre
  }


  devolve_nome_provincia2(id: any) {
    this.prov = this.provincias.filter((p: any) => p.province_id === id)[0].province_id
    // console.log(this.prov)
    return this.prov
  }

  buscarPorProvincia(id: any) {
    this.dataService.ProponentsByProvince(id).subscribe(data => {
      this.prov = data;
      this.devolve_nome_provincia2(id)
      console.log('prop by province', data)
    })
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

  getEmpresas(){
    this.dataService.getCompanyName().subscribe(data =>{
      this.empresa = data;
      console.log(data)
    })
  }

  getCategorias(){
    this.dataService.getCategory().subscribe(data =>{
      this.categoria = data;
      console.log(data)
    })
  }

  getMunicipio(){
    this.dataService.getMunicipio().subscribe(data =>{
      this.municipio = data;
      console.log(data)
    })
  }


  getProvincias() {
    this.dataService.get_Provinces().subscribe(data => {
      this.provincias = data;

      // this.my_stringify = JSON.stringify(this.provincias[0].province_id)
      // console.log('stringify provincias_id:', this.provincias[0].province_id.toString())

      // this.my_stringify2 = JSON.stringify(data)
      //console.log('provincias:', data)
    })
  }

}
