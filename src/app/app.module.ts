import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


// Angular Materials
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';


// MDB UI KITS
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONENTS
import { HomeComponent } from './home/home.component';
import { RecpassComponent } from './components/list/recpass/recpass.component';
import { DashboardComponent } from './components/list/dashboard/dashboard.component';
import { UsuarioComponent } from './components/list/usuario/usuario.component';
import { DepartamentoComponent } from './components/list/departamento/departamento.component';
import { InteressesComponent } from './components/list/interesses/interesses.component';
import { CadeiadevalorComponent } from './components/list/cadeiadevalor/cadeiadevalor.component';
import { InquiridorComponent } from './components/list/inquiridor/inquiridor.component';
import { InqueritoComponent } from './components/list/inquerito/inquerito.component';
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
import { AddAndManifestComponent } from './components/inserts/add-and-manifest/add-and-manifest.component';
import { AddInqueritoComponent } from './components/inserts/add-inquerito/add-inquerito.component';
import { StatusPnComponent } from './components/list/status-pn/status-pn.component';
import { EstatutoPnComponent } from './components/list/estatuto-pn/estatuto-pn.component';
import { ProponentesComponent } from './components/list/proponentes/proponentes.component';
import { SinglePropComponent } from './components/single-view/single-prop/single-prop.component';
import { SingleInterestComponent } from './components/single-view/single-interest/single-interest.component';
import { EditInterestComponent } from './components/edit/edit-interest/edit-interest.component';
import { CadeiasComponent } from './components/list/cadeias/cadeias.component';
import { AcordosComponent } from './components/list/acordos/acordos.component';
import { EditUserComponent } from './components/edit/edit-user/edit-user.component';
import { EditCadeiaComponent } from './components/edit/edit-cadeia/edit-cadeia.component';
import { EditInquiridorComponent } from './components/edit/edit-inquiridor/edit-inquiridor.component';
import { EditInqueritoComponent } from './components/edit/edit-inquerito/edit-inquerito.component';
import { EditDepartComponent } from './components/edit/edit-depart/edit-depart.component';
import { EditAcordoComponent } from './components/edit/edit-acordo/edit-acordo.component';
import { EditStatusComponent } from './components/edit/edit-status/edit-status.component';
import { EditEstatutoComponent } from './components/edit/edit-estatuto/edit-estatuto.component';
import { EditCadeiasManInComponent } from './components/edit/edit-cadeias-man-in/edit-cadeias-man-in.component';




// Providers
import { AuthService } from './services/auth.service';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { DataService } from './services/data.service';
import { MyfilterPipe } from './myfilter.pipe';
import { SearchPipe } from './search.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchByProvincesPipe } from './search-by-provinces.pipe';
import { NgxPrintModule } from 'ngx-print';
import { PnElaboradosComponent } from './components/list/pn-elaborados/pn-elaborados.component';
import { PgasComponent } from './components/list/pgas/pgas.component';
import { VisitasComponent } from './components/list/visitas/visitas.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VerInqueritoComponent } from './components/single-view/ver-inquerito/ver-inquerito.component';
import { DocumentosInqueritoComponent } from './components/list/documentos-inquerito/documentos-inquerito.component';
import { LoadingComponent } from './loading/loading.component';
import { VerInqueritoFromBackofficeComponent } from './components/single-view/ver-inquerito-from-backoffice/ver-inquerito-from-backoffice.component';
import { PnImplementadosComponent } from './components/list/pn-implementados/pn-implementados.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecpassComponent,
    DashboardComponent,
    UsuarioComponent,
    DepartamentoComponent,
    InteressesComponent,
    CadeiadevalorComponent,
    InquiridorComponent,
    InqueritoComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SidebarComponent,
    CreateUserComponent,
    AddInteressesComponent,
    AddInquiridorComponent,
    AddDepartamentoComponent,
    AddCadeiaValorComponent,
    AddInstituicaoComponent,
    AddAndManifestComponent,
    AddInqueritoComponent,
    StatusPnComponent,
    EstatutoPnComponent,
    ProponentesComponent,
    SinglePropComponent,
    SingleInterestComponent,
    EditInterestComponent,
    CadeiasComponent,
    MyfilterPipe,
    AcordosComponent,
    SearchPipe,
    SearchByProvincesPipe,
    EditUserComponent,
    EditCadeiaComponent,
    EditInquiridorComponent,
    EditInqueritoComponent,
    EditDepartComponent,
    EditAcordoComponent,
    EditStatusComponent,
    EditEstatutoComponent,
    EditCadeiasManInComponent,
    PnElaboradosComponent,
    PgasComponent,
    VisitasComponent,
    VerInqueritoComponent,
    DocumentosInqueritoComponent,
    LoadingComponent,
    VerInqueritoFromBackofficeComponent,
    PnImplementadosComponent,
  ],
  imports: [
    NgxPrintModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule  
    //NgSelectModule
    
  ],
  providers: [HeaderComponent, AuthService, DataService, HttpParams],
  bootstrap: [AppComponent]
})
export class AppModule { }
