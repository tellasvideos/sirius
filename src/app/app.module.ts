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
import { LoginComponent } from './components/login/login.component';
import { RecpassComponent } from './components/recpass/recpass.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { InteressesComponent } from './components/interesses/interesses.component';
import { CadeiadevalorComponent } from './components/cadeiadevalor/cadeiadevalor.component';
import { CvintessesComponent } from './components/cvintesses/cvintesses.component';
import { InstituicoesComponent } from './components/instituicoes/instituicoes.component';
import { AndamentomanifesComponent } from './components/andamentomanifes/andamentomanifes.component';
import { InquiridorComponent } from './components/inquiridor/inquiridor.component';
import { InqueritoComponent } from './components/inquerito/inquerito.component';
import { GestaoambientalComponent } from './components/gestaoambiental/gestaoambiental.component';
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
import { AddAndManifestComponent } from './components/add-and-manifest/add-and-manifest.component';
import { AddInqueritoComponent } from './components/add-inquerito/add-inquerito.component';
import { StatusPnComponent } from './components/status-pn/status-pn.component';
import { EstatutoPnComponent } from './components/estatuto-pn/estatuto-pn.component';
import { ProponentesComponent } from './components/proponentes/proponentes.component';
import { SinglePropComponent } from './single-prop/single-prop.component';
import { SingleInterestComponent } from './single-interest/single-interest.component';
import { EditInterestComponent } from './components/edit-interest/edit-interest.component';
import { CadeiasComponent } from './components/cadeias/cadeias.component';
import { AcordosComponent } from './components/acordos/acordos.component';
import { ProvinciasComponent } from './provincias/provincias.component';



// Providers
import { AuthService } from './services/auth.service';
import { HttpClientModule, HttpParams, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './services/data.service';
import { MyfilterPipe } from './myfilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RecpassComponent,
    DashboardComponent,
    UsuarioComponent,
    DepartamentoComponent,
    InteressesComponent,
    CadeiadevalorComponent,
    CvintessesComponent,
    InstituicoesComponent,
    AndamentomanifesComponent,
    InquiridorComponent,
    InqueritoComponent,
    GestaoambientalComponent,
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
    ProvinciasComponent
  ],
  imports: [
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
    HttpClientModule
  ],
  providers: [HeaderComponent, AuthService, DataService, HttpParams],
  bootstrap: [AppComponent]
})
export class AppModule { }
