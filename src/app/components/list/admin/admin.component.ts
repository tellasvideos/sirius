import { Component, OnInit } from '@angular/core';
import { delay, timer } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  sideBarOpen = true;

  metas?: number;
  realizado?: number;
  ano?: number;

  metas_pgas?: number;
  realizado_pgas?: number;
  ano_pgas?: number;


  constructor(
    private ds: DataService
  ) { }

  ngOnInit(): void {

    this.Get_metas_de_producao_de_PGAS_do_projecto();
    this.Get_metas_de_producaode_pn_do_projecto();
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  post_progresso_pn() {

    // Verificar se os campos estão preenchidos corretamente
    if (!this.metas || !this.realizado || !this.ano) {
      Swal.fire({
        icon: "error",
        title: "Os campos devem ser preenchidos corretamente.",
        showConfirmButton: true,
      })      
      return;
    }

    let progress = {
      "metas": this.metas,
      "realizado": this.realizado,
      "ano_numerico": this.ano
    };

    this.ds.Save_Progress_PN(progress).subscribe(
      success => {
        console.log(success);
        // Após o sucesso da requisição, atualize a lista manualmente adicionando o novo progresso
        this.metas_de_producaode_pn_do_projecto.push(progress);


        // Espera uns segundos antes de recarregar a página
        timer(500).pipe(delay(500)).subscribe(() => {
          location.reload();
        });


        this.calcularTotal('metas')
        this.calcularTotal('realizado')

        // Limpe os campos após o sucesso da operação
        this.metas = 0;
        this.realizado = 0;
        this.ano = 0;
      },
      error => {
        console.error(error);
      }
    );
  }

  post_progresso_PGAS() {

    // Verificar se os campos estão preenchidos corretamente
    if (!this.metas_pgas || !this.realizado_pgas || !this.ano_pgas) {
      Swal.fire({
        icon: "error",
        title: "Os campos devem ser preenchidos corretamente.",
        showConfirmButton: true,
      })
      return;
    }

    let progress = {
      "metas": this.metas_pgas,
      "realizado": this.realizado_pgas,
      "ano_numerico": this.ano_pgas
    };

    this.ds.Save_Progress_PGAS(progress).subscribe(
      success => {
        console.log(success);
        // Após o sucesso da requisição, atualize a lista manualmente adicionando o novo progresso
        this.metas_de_producaode_PGAS_do_projecto.push(progress);

        // Espera uns segundos antes de recarregar a página
        timer(500).pipe(delay(500)).subscribe(() => {
          location.reload();
        });

        this.calcularTotal('metas')
        this.calcularTotal('realizado')
        // Limpe os campos após o sucesso da operação
        this.metas_pgas = 0;
        this.realizado_pgas = 0;
        this.ano_pgas = 0;
      },
      error => {
        console.error(error);
      }
    );
  }

  totalMetas: number = 0;
  totalRealizado: number = 0;

  // Função para calcular o total das colunas "Metas" e "Realizado" de PN
  calcularTotal(coluna: string): number {

    let total = 0;

    for (let item of this.metas_de_producaode_pn_do_projecto) {
      total += item[coluna];
    }

    if (coluna === 'metas') {
      this.totalMetas = total;
    } else if (coluna === 'realizado') {
      this.totalRealizado = total;
    }

    return total;

  }

  // Função para calcular o total das colunas "Metas" e "Realizado" de PGAS
  calcularTotal_PGAS(coluna: string): number {
    let total = 0;

    for (let item of this.metas_de_producaode_pn_do_projecto) {
      total += item[coluna];
    }

    if (coluna === 'metas') {
      this.totalMetas = total;
    } else if (coluna === 'realizado') {
      this.totalRealizado = total;
    }

    return total;
  }

  // get  metas_de_producaode_pn_do_projecto
  metas_de_producaode_pn_do_projecto: any;
  Get_metas_de_producaode_pn_do_projecto() {
    this.ds.Get_metas_de_producaode_pn_do_projecto().subscribe(data => {
      this.metas_de_producaode_pn_do_projecto = data;
      console.log(data)
    })
  }

  // get  metas_de_producaode_PGAS_do_projecto
  metas_de_producaode_PGAS_do_projecto: any;
  Get_metas_de_producao_de_PGAS_do_projecto() {
    this.ds.Get_metas_de_producao_de_PGAS_do_projecto().subscribe(data => {
      this.metas_de_producaode_PGAS_do_projecto = data;
      console.log(data)
    })
  }

  Delete_Progress_PN(id: any) {
    this.ds.Delete_Progress_PN(id).subscribe(
      success => {
        Swal.fire({
          icon: "success",
          title: "Removido",
          showConfirmButton: false,
          timer: 1400
        })
        this.metas_de_producaode_pn_do_projecto.push(id);
      },
      error => { }
    )
    this.Get_metas_de_producaode_pn_do_projecto();
  }

  Delete_Progress_PGAS(id: any) {
    this.ds.Delete_Progress_PGAS(id).subscribe(
      success => {
        Swal.fire({
          icon: "success",
          title: "Removido",
          showConfirmButton: false,
          timer: 1400
        })
        this.metas_de_producaode_PGAS_do_projecto.push(id);
      },
      error => { }
    )
    this.Get_metas_de_producao_de_PGAS_do_projecto();
  }


}
