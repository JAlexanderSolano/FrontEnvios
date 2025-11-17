import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../service/localstorage.service';
@Component({
  selector: 'app-mensajes-swal',
  standalone: false,
  templateUrl: './mensajes-swal.component.html',
  styleUrl: './mensajes-swal.component.css',
})
export class MensajesSwalComponent {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}
  MostrarMensaje(icon: any, titulo: any, mensaje: any) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: icon,
      showConfirmButton: false,
      timer: 2000,
    });
  }
  MensajeSalida() {
    Swal.fire({
      title: '¿Deseas salir?',
      text: 'Estas seguro de que quieres salir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.CerrarSesion();
      }
    });
  }

  Cargando() {
    Swal.fire({
      title: 'Cargando...',
      text: 'Cargando la información por favor espere...',
      icon: 'info',
      timerProgressBar: false,
      showConfirmButton: false,
      timer: 3000,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  CerrarSesion() {
    Swal.fire({
      title: 'Cerrando sesión...',
      text: 'Cerrando la sesión por favor espere...',
      icon: 'info',
      timerProgressBar: false,
      showConfirmButton: false,
      timer: 5000,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        this.localStorage.removeItem('usuarioIngreso');
        this.localStorage.removeItem('cuenta');
        this.localStorage.removeItem('nombres');
        this.localStorage.removeItem('documento');
        this.localStorage.removeItem('tipoDocumento');
        this.localStorage.removeItem('ciudad');
        this.localStorage.removeItem('celular');
        this.localStorage.removeItem('telefono');
        this.localStorage.removeItem('email');
        this.localStorage.removeItem('token');
        this.router.navigate(['login']);
      },
    });
  }
}
