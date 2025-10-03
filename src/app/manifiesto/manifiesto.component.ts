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
  nuevaGuia = {
    destinatario: '',
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
  };
  token: any = '';

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private mensajesSwal: MensajesSwalComponent
  ) {}
  ngOnInit(): void {
    this.token = this.localStorage.getItem('token');
    this.CargarGuias(this.token);
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
    this.mensajesSwal.MostrarMensaje(
      'success',
      'Manifiesto Creado',
      'El manifiesto' + ' ha sido credado con exitó'
    );

    // this.apiService
    //   .addManifiesto(this.token, this.nuevaGuia)
    //   .subscribe((res: any) => {
    //     this.mensajesSwal.MostrarMensaje(
    //       'success',
    //       'Destinatario Creado',
    //       'El destinatario ' +
    //         this.nuevaGuia.destinatario +
    //         ' ha sido credado con exitó'
    //     );
    //     this.nuevaGuia = {
    //       destinatario: '',
    //       direccion_destinatario: '',
    //       ciudad: '',
    //       tipo_documento: '',
    //       documento: '',
    //       celular: '',
    //       telefono: '',
    //       email: '',
    //       tipo_pago: '',
    //       carta_porte: '',
    //       valor_total_declarado: '',
    //       unidades: '',
    //       kilos_reales: '',
    //       uso_medidas: '',
    //       kilogramos_reales: '',
    //       descripcion_contenido: '',
    //       observaciones: '',
    //       documento_remitente: '',
    //       cuenta: '',
    //     };
    //   });
    this.CargarGuias(this.token);
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

  filtrarGuias() {
    const filtro = this.filtroGuia.toLowerCase();
    this.listaguias = this.guiassOriginales.filter((dest: any) =>
      dest.destinatario.toLowerCase().includes(filtro)
    );
  }
}
