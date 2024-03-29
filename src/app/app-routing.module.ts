import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { CadeiadevalorComponent } from './components/list/cadeiadevalor/cadeiadevalor.component';
import { DashboardComponent } from './components/list/dashboard/dashboard.component';
import { DepartamentoComponent } from './components/list/departamento/departamento.component';
import { HomeComponent } from './home/home.component';
import { InqueritoComponent } from './components/list/inquerito/inquerito.component';
import { InquiridorComponent } from './components/list/inquiridor/inquiridor.component';
import { InteressesComponent } from './components/list/interesses/interesses.component';
import { RecpassComponent } from './components/list/recpass/recpass.component';
import { UsuarioComponent } from './components/list/usuario/usuario.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CreateUserComponent } from './components/inserts/create-user/create-user.component';
import { AddInteressesComponent } from './components/inserts/add-interesses/add-interesses.component';
import { AddInquiridorComponent } from './components/inserts/add-inquiridor/add-inquiridor.component';
import { AddDepartamentoComponent } from './components/inserts/add-departamento/add-departamento.component';
import { AddCadeiaValorComponent } from './components/inserts/add-cadeia-valor/add-cadeia-valor.component';
import { AddInstituicaoComponent } from './components/inserts/add-instituicao/add-instituicao.component';
import { StatusPnComponent } from './components/list/status-pn/status-pn.component';
import { EstatutoPnComponent } from './components/list/estatuto-pn/estatuto-pn.component';
import { ProponentesComponent } from './components/list/proponentes/proponentes.component';
import { SinglePropComponent } from './components/single-view/single-prop/single-prop.component';
import { SingleInterestComponent } from './components/single-view/single-interest/single-interest.component';
import { EditInterestComponent } from './components/edit/edit-interest/edit-interest.component';
import { AddAndManifestComponent } from './components/inserts/add-and-manifest/add-and-manifest.component';
import { CadeiasComponent } from './components/list/cadeias/cadeias.component';
import { AcordosComponent } from './components/list/acordos/acordos.component';
import { EditCadeiaComponent } from './components/edit/edit-cadeia/edit-cadeia.component';
import { EditDepartComponent } from './components/edit/edit-depart/edit-depart.component';
import { EditInqueritoComponent } from './components/edit/edit-inquerito/edit-inquerito.component';
import { EditInquiridorComponent } from './components/edit/edit-inquiridor/edit-inquiridor.component';
import { EditUserComponent } from './components/edit/edit-user/edit-user.component';
import { EditAcordoComponent } from './components/edit/edit-acordo/edit-acordo.component';
import { EditCadeiasManInComponent } from './components/edit/edit-cadeias-man-in/edit-cadeias-man-in.component';
import { EditEstatutoComponent } from './components/edit/edit-estatuto/edit-estatuto.component';
import { EditStatusComponent } from './components/edit/edit-status/edit-status.component';
import { AuthGuard } from './services/auth.guard';
import { PgasComponent } from './components/list/pgas/pgas.component';
import { PnElaboradosComponent } from './components/list/pn-elaborados/pn-elaborados.component';
import { VisitasComponent } from './components/list/visitas/visitas.component';
import { VerInqueritoComponent } from './components/single-view/ver-inquerito/ver-inquerito.component';
import { DocumentosInqueritoComponent } from './components/list/documentos-inquerito/documentos-inquerito.component';
import { VerInqueritoFromBackofficeComponent } from './components/single-view/ver-inquerito-from-backoffice/ver-inquerito-from-backoffice.component';
import { PnImplementadosComponent } from './components/list/pn-implementados/pn-implementados.component';
import { AdminComponent } from './components/list/admin/admin.component';


// configuração de rotas
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: 'cadeiadevalor', component: CadeiadevalorComponent, canActivate: [AuthGuard] },
  { path: 'departamento', component: DepartamentoComponent, canActivate: [AuthGuard] },
  { path: 'inquerito', component: InqueritoComponent, canActivate: [AuthGuard] },
  { path: 'inquiridor', component: InquiridorComponent, canActivate: [AuthGuard] },
  { path: 'interesses', component: InteressesComponent, canActivate: [AuthGuard] },
  { path: 'recpass', component: RecpassComponent, },
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
  { path: 'pgas', component: PgasComponent, canActivate: [AuthGuard] },
  { path: 'pn-elaborados', component: PnElaboradosComponent, canActivate: [AuthGuard] },
  { path: 'pn-implementados', component: PnImplementadosComponent, canActivate: [AuthGuard] },
  { path: 'visitas', component: VisitasComponent, canActivate: [AuthGuard] },
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
  { path: 'ver-inquerito/:id', component: VerInqueritoComponent, canActivate: [AuthGuard] },
  { path: 'ver-inquerito-from-backoffice/:id', component: VerInqueritoFromBackofficeComponent, canActivate: [AuthGuard] },
  { path: 'documentos-inquerito/:id', component: DocumentosInqueritoComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }

];


export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


