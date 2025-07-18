import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guia',
  standalone: false,
  templateUrl: './guia.component.html',
  styleUrl: './guia.component.css',
})
export class GuiaComponent implements OnInit {
  guia = {
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
  };
  responseCiudades: any;

  ngOnInit(): void {
    this.guia.ciudad = '0';
    this.guia.tipo_pago = '0';
  }
}
