import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { GuiaComponent } from './guia/guia.component';
import { PrincipalComponent } from './principal/principal.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { DestinatarioComponent } from './destinatario/destinatario.component';
import { ListaguiasComponent } from './listaguias/listaguias.component';
import { ManifiestoComponent } from './manifiesto/manifiesto.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'guia',
    component: GuiaComponent,
  },
  {
    path: 'principal',
    component: PrincipalComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  { path: 'clientes', component: ClientesListComponent },
  {
    path: 'destinatario',
    component: DestinatarioComponent,
  },
  {
    path: 'lista-guias',
    component: ListaguiasComponent,
  },
  {
    path: 'manifiesto',
    component: ManifiestoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
