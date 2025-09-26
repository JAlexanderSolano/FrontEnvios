import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/localstorage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
declare var bootstrap: any;
@Component({
  selector: 'app-listaguias',
  standalone: false,
  templateUrl: './listaguias.component.html',
  styleUrl: './listaguias.component.css',
})
export class ListaguiasComponent implements OnInit {
  filtroDestinatario: any;
  destinatarios: any[] = [];
  destinatariosOriginales: any[] = [];
  destinatarioSeleccionado: any = null;
  nuevoDestinatario = {
    nombre: '',
    tipodocumento: '',
    documento: '',
    celular: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: '',
    departamento: '',
  };
  token: any = '';

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private mensajesSwal: MensajesSwalComponent
  ) {}
  ngOnInit(): void {
    this.token = this.localStorage.getItem('token');
    this.CargarDestinatarios(this.token);
  }
  CargarDestinatarios(token: any) {
    this.destinatarios = [];
    this.destinatariosOriginales = [];
    this.apiService.getDestinatarios(token).subscribe((data) => {
      this.destinatariosOriginales = data;
      this.destinatarios = [...data];
    });
  }

  seleccionarDestinatario(destinatario: any) {
    this.destinatarioSeleccionado = destinatario;
    let modalElement = document.getElementById('confirmModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  agregarDestinatario() {
    this.apiService
      .addDestinatario(this.token, this.nuevoDestinatario)
      .subscribe((res: any) => {
        this.mensajesSwal.MostrarMensaje(
          'success',
          'Destinatario Creado',
          'El destinatario ' +
            this.nuevoDestinatario.nombre +
            ' ha sido credado con exitó'
        );
        this.nuevoDestinatario = {
          nombre: '',
          tipodocumento: '',
          documento: '',
          celular: '',
          telefono: '',
          email: '',
          direccion: '',
          ciudad: '',
          departamento: '',
        };
      });
    this.CargarDestinatarios(this.token);
  }

  confirmarEliminacion() {
    if (this.destinatarioSeleccionado) {
      console.log(this.destinatarioSeleccionado);
      this.apiService
        .deleteDestinatario(this.token, this.destinatarioSeleccionado.id)
        .subscribe((res) => {
          this.destinatarios = this.destinatarios.filter(
            (c: any) => c.id !== this.destinatarioSeleccionado.id
          );
          this.destinatarioSeleccionado = null;
        });
    }
  }

  filtrarDestinatarios() {
    const filtro = this.filtroDestinatario.toLowerCase();
    this.destinatarios = this.destinatariosOriginales.filter((dest: any) =>
      dest.nombre.toLowerCase().includes(filtro)
    );
  }
}
