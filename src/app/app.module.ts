import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Angular Materials
import { MatSliderModule } from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';


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
    AddInteressesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatGridListModule
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
