import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/localstorage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
declare var bootstrap: any;
@Component({
  selector: 'app-manifiesto',
  standalone: false,
  templateUrl: './manifiesto.component.html',
  styleUrl: './manifiesto.component.css',
})
export class ManifiestoComponent implements OnInit {
  filtroGuia: any;
  listaguias: any[] = [];
  guiassOriginales: any[] = [];
  guiasSeleccionado: any = null;
  seleccionGuia: any[] = [];
  nuevaGuia = {
    cliente: '',
    direccion_destinatario: '',
    ciudad: '',
    tipo_documento: '',
    documento: '',
    celular: '',
    telefono: '',
    email: '',
    tipo_pago: '',
    carta_porte: '',
    valor_total_declarado: '',
    unidades: '',
    kilos_reales: '',
    uso_medidas: '',
    kilogramos_reales: '',
    descripcion_contenido: '',
    observaciones: '',
    documento_remitente: '',
    cuenta: '',
    arrayGuia: this.seleccionGuia,
  };
  token: any = '';
  response: object = {};
  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private mensajesSwal: MensajesSwalComponent
  ) {}
  ngOnInit(): void {
    this.token = this.localStorage.getItem('token');
    this.CargarGuias(this.token);
    this.ObtenerDatosIniciales(this.nuevaGuia);
    this.response = {};
  }

  ObtenerDatosIniciales(jsonData: any) {
    jsonData.cliente = this.localStorage.getItem('nombres');
    jsonData.documento = this.localStorage.getItem('documento');
    jsonData.tipo_documento = this.localStorage.getItem('tipoDocumento');
    jsonData.ciudad = this.localStorage.getItem('ciudad');
    jsonData.celular = this.localStorage.getItem('celular');
    jsonData.telefono = this.localStorage.getItem('telefono');
    jsonData.email = this.localStorage.getItem('email');
    jsonData.cuenta = this.localStorage.getItem('cuenta');
  }
  CargarGuias(token: any) {
    this.listaguias = [];
    this.guiassOriginales = [];
    this.apiService.getGuias(token).subscribe((data) => {
      this.guiassOriginales = data;
      this.listaguias = [...data];
    });
  }

  seleccionarGuias(destinatario: any) {
    this.guiasSeleccionado = destinatario;
    let modalElement = document.getElementById('confirmModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  agregarManifiesto() {
    console.log(JSON.stringify(this.nuevaGuia));
    this.apiService
      .addManifiesto(this.token, this.nuevaGuia)
      .subscribe((data: any) => {
        this.response = data;
        this.MostrarMensaje(this.response);
        this.seleccionGuia = [];
      });

    this.CargarGuias(this.token);
  }
  MostrarMensaje(response: any) {
    this.mensajesSwal.MostrarMensaje(
      'success',
      'Manifiesto creado',
      response.resultado.resultado
    );
  }

  confirmarEliminacion() {
    if (this.guiasSeleccionado) {
      console.log(this.guiasSeleccionado);
      this.apiService
        .deleteDestinatario(this.token, this.guiasSeleccionado.id)
        .subscribe((res) => {
          this.listaguias = this.listaguias.filter(
            (c: any) => c.id !== this.guiasSeleccionado.id
          );
          this.guiasSeleccionado = null;
        });
    }
  }
  SeleccionarGuia(guia: any) {
    let datosjson;
    console.log(guia);

    if (guia.seleccionado) {
      const existe = this.seleccionGuia.some((g) => g.id === guia.id);
      if (!existe) {
        this.seleccionGuia.push(guia);
      }
    } else {
      this.seleccionGuia = this.seleccionGuia.filter((g) => g.id !== guia.id);
    }

    datosjson = JSON.stringify(this.seleccionGuia);
    console.log(datosjson);
  }
  SeleccionarTodas(event: any) {
    const seleccionado = event.target.checked;

    // Marcar o desmarcar todos los checkboxes
    this.listaguias.forEach((guia: any) => (guia.seleccionado = seleccionado));

    // Si está marcado, copiamos todos los objetos directamente
    this.seleccionGuia = seleccionado ? [...this.listaguias] : [];

    this.nuevaGuia.arrayGuia = [...this.seleccionGuia];
    console.log('Guías seleccionadas:', this.seleccionGuia);
  }
  filtrarGuias() {
    const filtro = this.filtroGuia.toLowerCase();
    this.listaguias = this.guiassOriginales.filter((dest: any) =>
      dest.destinatario.toLowerCase().includes(filtro)
    );
  }
}
