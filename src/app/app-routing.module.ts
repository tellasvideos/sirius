import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AndamentomanifesComponent } from './andamentomanifes/andamentomanifes.component';
import { CadeiadevalorComponent } from './cadeiadevalor/cadeiadevalor.component';
import { CvintessesComponent } from './cvintesses/cvintesses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { GestaoambientalComponent } from './gestaoambiental/gestaoambiental.component';

import { HomeComponent } from './home/home.component';
import { InqueritoComponent } from './inquerito/inquerito.component';
import { InquiridorComponent } from './inquiridor/inquiridor.component';
import { InstituicoesComponent } from './instituicoes/instituicoes.component';
import { InteressesComponent } from './interesses/interesses.component';
import { LoginComponent } from './login/login.component';
import { RecpassComponent } from './recpass/recpass.component';
import { UsuarioComponent } from './usuario/usuario.component';


// configuração de rotas

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'andamentomanifes', component: AndamentomanifesComponent },
  { path: 'cadeiadevalor', component: CadeiadevalorComponent },
  { path: 'cvintesses', component: CvintessesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'departamento', component: DepartamentoComponent },
  { path: 'gestaoambiental', component: GestaoambientalComponent },
  { path: 'inquerito', component: InqueritoComponent },
  { path: 'inquiridor', component: InquiridorComponent },
  { path: 'instituicoes', component: InstituicoesComponent },
  { path: 'interesses', component: InteressesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recpass', component: RecpassComponent },
  { path: 'usuaio', component: UsuarioComponent }
];


export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


