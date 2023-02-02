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
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AddInteressesComponent } from './components/add-interesses/add-interesses.component';
import { AddInquiridorComponent } from './components/add-inquiridor/add-inquiridor.component';
import { AddDepartamentoComponent } from './components/add-departamento/add-departamento.component';
import { AddCadeiaValorComponent } from './components/add-cadeia-valor/add-cadeia-valor.component';
import { AddInstituicaoComponent } from './components/add-instituicao/add-instituicao.component';
import { AuthGuardService as AuthGuard } from '../app/services/auth-guard.service';
import { StatusPnComponent } from './components/status-pn/status-pn.component';
import { EstatutoPnComponent } from './components/estatuto-pn/estatuto-pn.component';
import { ProponentesComponent } from './components/proponentes/proponentes.component';
import { SinglePropComponent } from './single-prop/single-prop.component';
import { SingleInterestComponent } from './single-interest/single-interest.component';
import { EditInterestComponent } from './components/edit-interest/edit-interest.component';
import { AddAndManifestComponent } from './components/add-and-manifest/add-and-manifest.component';
import { CadeiasComponent } from './components/cadeias/cadeias.component';
import { AcordosComponent } from './components/acordos/acordos.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { EditCadeiaComponent } from './components/edit-cadeia/edit-cadeia.component';
import { EditDepartComponent } from './components/edit-depart/edit-depart.component';
import { EditInqueritoComponent } from './components/edit-inquerito/edit-inquerito.component';
import { EditInquiridorComponent } from './components/edit-inquiridor/edit-inquiridor.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditAcordoComponent } from './components/edit-acordo/edit-acordo.component';
import { EditCadeiasManInComponent } from './components/edit-cadeias-man-in/edit-cadeias-man-in.component';
import { EditEstatutoComponent } from './components/edit-estatuto/edit-estatuto.component';
import { EditStatusComponent } from './components/edit-status/edit-status.component';

// configuração de rotas
const routes: Routes = [
  // { path: '', redirectTo:'dashboard', pathMatch:'full' },
  {
    path: 'dashboard', component: DashboardComponent
    //canActivate: [AuthGuard]
  },
  { path: '', component: HomeComponent },
  { path: 'andamentomanifes', component: AndamentomanifesComponent },
  { path: 'cadeiadevalor', component: CadeiadevalorComponent },
  { path: 'cvintesses', component: CvintessesComponent },
  { path: 'departamento', component: DepartamentoComponent },
  { path: 'gestaoambiental', component: GestaoambientalComponent },
  { path: 'inquerito', component: InqueritoComponent },
  { path: 'inquiridor', component: InquiridorComponent },
  { path: 'instituicoes', component: InstituicoesComponent },
  { path: 'interesses', component: InteressesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recpass', component: RecpassComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'add-interesses', component: AddInteressesComponent },
  { path: 'add-manifest', component: AddAndManifestComponent },
  { path: 'add-inquiridor', component: AddInquiridorComponent },
  { path: 'add-departamento', component: AddDepartamentoComponent },
  { path: 'add-cadeia-valor', component: AddCadeiaValorComponent },
  { path: 'add-instituicao', component: AddInstituicaoComponent },
  { path: 'status-pn/:id', component: StatusPnComponent },
  { path: 'estatuto-pn/:id', component: EstatutoPnComponent },
  { path: 'proponentes', component: ProponentesComponent },
  { path: 'single-prop', component: SinglePropComponent },
  { path: 'single-interest/:id', component: SingleInterestComponent },
  { path: 'edit-interest/:id', component: EditInterestComponent },
  { path: 'edit-cadeia/:id', component: EditCadeiaComponent },
  { path: 'edit-depart/:id', component: EditDepartComponent },
  { path: 'edit-inquerito/:id', component: EditInqueritoComponent },
  { path: 'edit-inquiridor/:id', component: EditInquiridorComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'cadeias/:id', component: CadeiasComponent },
  { path: 'acordos/:id', component: AcordosComponent },
  { path: 'edit-acordo/:id', component: EditAcordoComponent },
  { path: 'edit-cadeias-man-in/:id', component: EditCadeiasManInComponent },
  { path: 'edit-estatuto/:id', component: EditEstatutoComponent },
  { path: 'edit-status/:id', component: EditStatusComponent },

  //{ path: 'provincias', component: ProvinciasComponent }

];


export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


