import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { ApiService } from '../service/api.service';

import { LocalStorageService } from '../service/localstorage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  login = {
    usuario: '',
    contrasena: '',
    cuenta: '',
    nombres : '',
    documento : '',	
    tipoDocumento : '', 
    ciudad : '',		
    celular : '',		
    telefono : '',	
    email : '',
  };

  response: any;
  constructor(private router: Router, private apiService: ApiService,private localStorage: LocalStorageService,
    private mensaje: MensajesSwalComponent,)  {}
  ngOnInit(): void {
    this.response = {};
  }

  Login() {
    if (this.login.usuario != '' && this.login.contrasena != '') {
      this.apiService.Login(this.login).subscribe((res: any) => {
        this.response = res;
        this.redirigir(this.response);
      },
         (error: any) => {
          
             this.mensaje.MostrarMensaje( 'error', 'Error al conectar con la API'  ,error.message);
      }
    
    );
      
    }
    else {
      this.mensaje.MostrarMensaje(
        'error',
        'Campos vacios',
        'Por favor complete los campos'
      );
    }
  }

  redirigir(response: any) {
   if (response.resultado.state == 200 && response.resultado.token != '') {
      this.localStorage.setItem('token', response.resultado.token);
      this.localStorage.setItem('usuarioIngreso', this.login.usuario);
      this.localStorage.setItem('cuenta', response.resultado.cuenta);

      this.localStorage.setItem('nombres', response.resultado.nombres);
      this.localStorage.setItem('documento', response.resultado.documento);
      this.localStorage.setItem('tipoDocumento', response.resultado.tipoDocumento);
      this.localStorage.setItem('ciudad', response.resultado.ciudad);      
      this.localStorage.setItem('celular', response.resultado.celular);
      this.localStorage.setItem('telefono', response.resultado.telefono);
      this.localStorage.setItem('email', response.resultado.email);

      this.mensaje.MostrarMensaje(
        'success',
        'Usuario correcto',
        'Bienvenido:' + this.login.usuario  + " " + this.localStorage.getItem('cuenta') +   " " + this.localStorage.getItem('nombres') + " "+ this.localStorage.getItem('ciudad')

      );
      this.router.navigate(['principal']);
    }else if(response.resultado.state == 200 && response.resultado.token == '' ){
      this.mensaje.MostrarMensaje(
        'error',
        'Usuario incorrecto',
        'Por favor verifique sus credenciales'
      );
    }
  }
}
