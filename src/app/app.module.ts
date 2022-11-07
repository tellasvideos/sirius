import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
