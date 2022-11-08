import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//COMPONENTS
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RecpassComponent } from './recpass/recpass.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { InteressesComponent } from './interesses/interesses.component';
import { CadeiadevalorComponent } from './cadeiadevalor/cadeiadevalor.component';
import { CvintessesComponent } from './cvintesses/cvintesses.component';
import { InstituicoesComponent } from './instituicoes/instituicoes.component';
import { AndamentomanifesComponent } from './andamentomanifes/andamentomanifes.component';
import { InquiridorComponent } from './inquiridor/inquiridor.component';
import { InqueritoComponent } from './inquerito/inquerito.component';
import { GestaoambientalComponent } from './gestaoambiental/gestaoambiental.component';

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
    GestaoambientalComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
