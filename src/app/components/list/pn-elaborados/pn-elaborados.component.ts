import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AddDepartamentoComponent } from '../../inserts/add-departamento/add-departamento.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pn-elaborados',
  templateUrl: './pn-elaborados.component.html',
  styleUrls: ['./pn-elaborados.component.scss']
})
export class PnElaboradosComponent implements OnInit {

  keyWord: string = '';
  departamento: any;
  depart: any;
  sideBarOpen = true;

  user_logged: any;

  modalRef: MdbModalRef<AddDepartamentoComponent> | null = null;
  id: any;

  constructor(
    private modalService: MdbModalService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Pegar dados do user logado
    this.dataService.getUserData().subscribe((data: any) => {
      this.user_logged = data.find((user: any) => user.email === localStorage.getItem('user'));
      console.log('User logado', this.user_logged)
    });

    this.getInqueritos();

    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.dataService.Get_Backoffice_data_and_Inquerito_by_id(this.id).subscribe(data => {
        // Converta data para um array se ainda não for
        const dataArray = Array.isArray(data) ? data : [data];
        this.backoffice_data = dataArray.reverse();
        console.log('aquiiiiiiii', this.backoffice_data);
      });
    });

    this.get_form_backoffice()

    this.get_form_backoffice____();
  }

  // to get all data from form backoffice   
  formBackoffice: any;
  get_form_backoffice() {
    this.dataService.Get_Backoffice_Form().subscribe(data => {
      this.formBackoffice = data;
      console.log(this.formBackoffice)
    })
  }

  backoffice_data: any;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openModal() {
    this.modalRef = this.modalService.open(AddDepartamentoComponent)
  }

  inqueritos: any[] = [];
  // lista os inqueritos por ordem do ultimo inquerito gravado e só os inqueritos com estado aprovado
  getInqueritos() {
    this.dataService.get_InquireForm().subscribe(data => {
      this.inqueritos = data.filter(item => item.status === 'Aprovado');
      console.log('inqueritos', this.inqueritos);
      this.inqueritos.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  

  alert_error() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguma coisa correu mal, tente mais tarde.',
    })
  }

  mappedFormBackoffice:any;
  get_form_backoffice____() {
    this.dataService.Get_Backoffice_Form().subscribe(data => {
      this.formBackoffice = data;
  
      // Filtrar os dados com base no ID do inquérito
      const filteredFormBackoffice = this.formBackoffice.filter((item:any) => {
        return this.inqueritos.some(inquerito => inquerito.id === item.inquerito);
      });
  
      // Mapear os dados filtrados para conter apenas "status_pn" e "data_pn_entregue_ao_pdac"
       this.mappedFormBackoffice = filteredFormBackoffice.map((item:any) => {
        return {
          status_pn: item.status_pn,
          data_pn_entregue_ao_pdac: item.data_pn_entregue_ao_pdac
        };
      });
  
      console.log('dados mapeados: ', this.mappedFormBackoffice);
    });
  }

  getFormBackofficeData(inqueritoId: string): any {
    return this.formBackoffice.find((item:any) => item.inquerito === inqueritoId);
  }
  
  

}
