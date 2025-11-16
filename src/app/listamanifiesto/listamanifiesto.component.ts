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
  dataGuia = {
    id_Guia: 0,
    destinatario: '',
    ciudadDestino: '',
    fechaInclusion: '',
  };
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
      (mani: any) =>
        mani.nombreCliente.toLowerCase().includes(filtro) ||
        mani.cuenta.toLowerCase().includes(filtro)
    );
  }

  verDetalleGuia(guia: any) {
    console.log(guia);
    this.dataGuia.id_Guia = guia[0].id_Guia;
    this.dataGuia.destinatario = guia[0].destinatario;
    this.dataGuia.ciudadDestino = guia[0].ciudadDestino;
    this.dataGuia.fechaInclusion = guia[0].fechaInclusion;
    this.validarDatos(this.dataGuia);
    let modalElement = document.getElementById('detalleModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
    //alert(JSON.stringify(guia));
  }
  validarDatos(guia: any) {
    if (guia.destinatario == '' || guia.destinatario == null) {
      this.dataGuia.destinatario = 'Sin destinatario';
    }
    if (guia.ciudadDestino == '' || guia.ciudadDestino == null) {
      this.dataGuia.ciudadDestino = 'Sin ciudad de destino';
    }
    if (guia.fechaInclusion == '' || guia.fechaInclusion == null) {
      this.dataGuia.fechaInclusion = 'Sin fecha de inclusión';
    }
  }
}
