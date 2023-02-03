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
import { AuthGuard } from './services/auth.guard';


// configuração de rotas
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: '', component: HomeComponent },
  {path: 'andamentomanifes', component: AndamentomanifesComponent, canActivate: [AuthGuard]},
  {path: 'cadeiadevalor', component: CadeiadevalorComponent, canActivate: [AuthGuard]},
  {path: 'cvintesses', component: CvintessesComponent, canActivate: [AuthGuard]},
  { path: 'departamento', component: DepartamentoComponent, canActivate: [AuthGuard] },
  { path: 'gestaoambiental', component: GestaoambientalComponent, canActivate: [AuthGuard] },
  { path: 'inquerito', component: InqueritoComponent, canActivate: [AuthGuard] },
  { path: 'inquiridor', component: InquiridorComponent, canActivate: [AuthGuard] },
  { path: 'instituicoes', component: InstituicoesComponent, canActivate: [AuthGuard] },
  { path: 'interesses', component: InteressesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'recpass', component: RecpassComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'footer', component: FooterComponent, canActivate: [AuthGuard] },
  { path: 'sidenav', component: SidenavComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'add-interesses', component: AddInteressesComponent, canActivate: [AuthGuard] },
  { path: 'add-manifest', component: AddAndManifestComponent, canActivate: [AuthGuard] },
  { path: 'add-inquiridor', component: AddInquiridorComponent, canActivate: [AuthGuard] },
  { path: 'add-departamento', component: AddDepartamentoComponent, canActivate: [AuthGuard] },
  { path: 'add-cadeia-valor', component: AddCadeiaValorComponent, canActivate: [AuthGuard] },
  { path: 'add-instituicao', component: AddInstituicaoComponent, canActivate: [AuthGuard] },
  { path: 'status-pn/:id', component: StatusPnComponent, canActivate: [AuthGuard] },
  { path: 'estatuto-pn/:id', component: EstatutoPnComponent, canActivate: [AuthGuard] },
  { path: 'proponentes', component: ProponentesComponent, canActivate: [AuthGuard] },
  { path: 'single-prop', component: SinglePropComponent, canActivate: [AuthGuard] },
  { path: 'single-interest/:id', component: SingleInterestComponent, canActivate: [AuthGuard] },
  { path: 'edit-interest/:id', component: EditInterestComponent, canActivate: [AuthGuard] },
  { path: 'edit-cadeia/:id', component: EditCadeiaComponent, canActivate: [AuthGuard] },
  { path: 'edit-depart/:id', component: EditDepartComponent, canActivate: [AuthGuard] },
  { path: 'edit-inquerito/:id', component: EditInqueritoComponent, canActivate: [AuthGuard] },
  { path: 'edit-inquiridor/:id', component: EditInquiridorComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'cadeias/:id', component: CadeiasComponent, canActivate: [AuthGuard] },
  { path: 'acordos/:id', component: AcordosComponent, canActivate: [AuthGuard] },
  { path: 'edit-acordo/:id', component: EditAcordoComponent, canActivate: [AuthGuard] },
  { path: 'edit-cadeias-man-in/:id', component: EditCadeiasManInComponent, canActivate: [AuthGuard] },
  { path: 'edit-estatuto/:id', component: EditEstatutoComponent, canActivate: [AuthGuard] },
  { path: 'edit-status/:id', component: EditStatusComponent, canActivate: [AuthGuard] },
];


export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


