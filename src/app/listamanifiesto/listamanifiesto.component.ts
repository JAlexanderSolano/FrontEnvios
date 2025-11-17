import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/localstorage.service';
declare var bootstrap: any;
@Component({
  selector: 'app-listamanifiesto',
  standalone: false,
  templateUrl: './listamanifiesto.component.html',
  styleUrl: './listamanifiesto.component.css',
})
export class ListamanifiestoComponent implements OnInit {
  filtroManifiesto: any;
  listaManifiesto: any[] = [];
  manifiestoOriginales: any[] = [];
  listaDetalleManifiesto: any[] = [];
  token: any = '';

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.token = this.localStorage.getItem('token');
    this.cargarManifiesto(this.token);
  }

  cargarManifiesto(token: any) {
    this.listaManifiesto = [];
    this.manifiestoOriginales = [];
    this.apiService.getGuiasConManifiesto(token).subscribe((data) => {
      this.manifiestoOriginales = data;
      this.listaManifiesto = [...data];
    });
  }
  filtrarManifiesto() {
    const filtro = this.filtroManifiesto.toLowerCase();
    this.listaManifiesto = this.manifiestoOriginales.filter(
      (m: any) =>
        m.nombreCliente.toLowerCase().includes(filtro) ||
        m.id_Manifiesto.toString().toLocaleLowerCase().includes(filtro)
    );
  }

  verDetalleGuia(guia: any) {
    this.listaDetalleManifiesto = [];
    this.listaDetalleManifiesto = guia;
    this.validarDatos(this.listaDetalleManifiesto);
    let modalElement = document.getElementById('detalleModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  validarDatos(guia: any) {
    for (let index = 0; index < guia.length; index++) {
      const element = guia[index];
      if (element.destinatario == '' || element.destinatario == null) {
        element.destinatario = 'Sin destinatario';
      }
      if (element.ciudadDestino == '' || element.ciudadDestino == null) {
        element.ciudadDestino = 'Sin ciudad de destino';
      }
      if (element.fechaInclusion == '' || element.fechaInclusion == null) {
        element.fechaInclusion = 'Sin fecha de inclusión';
      }
    }
  }
}
