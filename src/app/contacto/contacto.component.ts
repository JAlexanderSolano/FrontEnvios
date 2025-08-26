import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: false,
  templateUrl: './contacto.component.html',
   styleUrls: ['./contacto.component.css']


})
export class ContactoComponent {
  formData = {
    nombre: '',
    correo: '',
    asunto: ''
  };

  enviarFormulario() {
    console.log('Formulario enviado:', this.formData);
    // Aquí podrías agregar lógica para enviar los datos al backend
  }
}

