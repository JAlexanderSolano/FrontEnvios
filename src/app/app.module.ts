
import { NgModule } from '@angular/core';

import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MensajesSwalComponent } from './mensajes-swal/mensajes-swal.component';
import { PrincipalComponent } from './principal/principal.component';
import { GuiaComponent } from './guia/guia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ListaguiasComponent } from './listaguias/listaguias.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';

import { HttpClientModule } from '@angular/common/http';
import { DestinatarioComponent } from './destinatario/destinatario.component';
import { ManifiestoComponent } from './manifiesto/manifiesto.component';
import { ListamanifiestoComponent } from './listamanifiesto/listamanifiesto.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    MensajesSwalComponent,
    PrincipalComponent,
    GuiaComponent,
    ListaguiasComponent,
    ContactoComponent,
    ClientesListComponent,
    DestinatarioComponent,
    ManifiestoComponent,
    ListamanifiestoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    MensajesSwalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
