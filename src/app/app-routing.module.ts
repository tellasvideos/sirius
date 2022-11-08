import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AndamentomanifesComponent } from './components/andamentomanifes/andamentomanifes.component';
import { CadeiadevalorComponent } from './components/cadeiadevalor/cadeiadevalor.component';
import { CvintessesComponent } from './components/cvintesses/cvintesses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { GestaoambientalComponent } from './components/gestaoambiental/gestaoambiental.component';
import { HomeComponent } from './home/home.component';
import { InqueritoComponent } from './components/inquerito/inquerito.component';
import { InquiridorComponent } from './components/inquiridor/inquiridor.component';
import { InstituicoesComponent } from './components/instituicoes/instituicoes.component';
import { InteressesComponent } from './components/interesses/interesses.component';
import { LoginComponent } from './components/login/login.component';
import { RecpassComponent } from './components/recpass/recpass.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';


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
  { path: 'usuaio', component: UsuarioComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent }
];


export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


