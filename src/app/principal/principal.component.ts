import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
import { UiServiceService } from '../service/ui.service.service';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  active = 'top';
  urlFrame: any;
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private mensajes: MensajesSwalComponent,
    private ui: UiServiceService
  ) {}
  ngOnInit(): void {
    this.ui.ocultarNav();
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  }

  solicitarGuia() {
    this.urlFrame = this.sanitizer.bypassSecurityTrustResourceUrl('/guia');
  }

  consultarClientes() {
    this.urlFrame = this.sanitizer.bypassSecurityTrustResourceUrl('/clientes');
  }

  gestionarDestinatario() {
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/destinatario');
  }

  listaGuias() {
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/lista-guias');
  }

  generarManifiesto() {
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/manifiesto');
  }
  listaManifiesto() {
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/lista-manifiesto');
  }

  cerrarSesion() {
    this.mensajes.MensajeSalida();
  }
}
