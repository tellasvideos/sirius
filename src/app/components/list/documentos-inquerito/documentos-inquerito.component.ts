import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentos-inquerito',
  templateUrl: './documentos-inquerito.component.html',
  styleUrls: ['./documentos-inquerito.component.scss']
})
export class DocumentosInqueritoComponent implements OnInit {

  keyWord!: string;
  documentos_inquerito:any;
  user_logged:any;
  sideBarOpen = true;


  documento_do_proponente!:File;
  documento_1!:File;
  documento_2!:File;
  documento_3!:File;
  documento_4!:File;
  documento_5!:File;
  documento_6!:File;
  documento_7!:File;
  documento_8!:File;
  documento_9!:File;
  documento_10!:File;
  documento_11!:File;
  documento_12!:File;
  documento_13!:File;
  documento_14!:File;
  documento_15!:File;
  documento_16!:File;
  documento_17!:File;
  documento_18!:File;
  documento_19!:File;
  documento_20!:File;
  inquerito_preenchido!:File;


  constructor() { }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  save_documentos(){
    
  }

  ngOnInit(): void {
  }

}
