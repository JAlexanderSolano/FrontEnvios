import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../service/api.service';
import { LocalStorageService } from '../service/localstorage.service';
import { CheckboxRequiredValidator, EmailValidator } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  clientes: any[] = [];
  clienteSeleccionado: any = null;

  constructor(private apiService: ApiService,
              private localStorage: LocalStorageService
   ) {}

  ngOnInit(): void {
    let token = this.localStorage.getItem('token');
    this.apiService.getClientes(token).subscribe(data => {
    this.clientesOriginales = data;
    this.clientes = [...data];
    });
  }

   seleccionarCliente(cliente: any): void {

      this.clienteSeleccionado = cliente;
      const modalElement = document.getElementById('confirmModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
  }

 confirmarEliminacion(): void {
    if (this.clienteSeleccionado) {
      let token = this.localStorage.getItem('token');
      this.apiService.deleteCliente(token,this.clienteSeleccionado.id).subscribe(() => {
        this.clientes = this.clientes.filter(c => c.id !== this.clienteSeleccionado.id);
        this.clienteSeleccionado = null;
      });

    }
 }

 nuevoCliente = {
  id:0,
  nombres: '',
  apellidos: '',
  documento: '',
  tipoDocumento: '',
  ciudad : '',
  celular : '',
  telefono : '',
  email : '',
};


agregarCliente(): void {
  const cliente = {
    ...this.nuevoCliente,
    createdAt: new Date().toISOString()
  };
  let token = this.localStorage.getItem('token');
  this.apiService.addCliente(token,cliente).subscribe((clienteCreado) => {
    this.clientes.push(cliente);
    this.nuevoCliente = { id:1,  nombres: '', apellidos: '', documento:'', tipoDocumento:'', ciudad:'', celular:'', telefono:'', email:'' }; // Limpiar formulario
  });
}

filtroNombre: string = '';
clientesOriginales: any[] = [];

filtrarClientes(): void {
  const filtro = this.filtroNombre.toLowerCase();
  this.clientes = this.clientesOriginales.filter(cliente =>   cliente.nombres.toLowerCase().includes(filtro)
  );
}



}