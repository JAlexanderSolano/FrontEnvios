import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/localstorage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';


@Component({
  selector: 'app-guia',
  standalone: false,
  templateUrl: './guia.component.html',
  styleUrl: './guia.component.css',
})
export class GuiaComponent implements OnInit  {
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
  qrCodeUrl: string = '';
  mostrarQR: boolean = false;
    constructor(
      private mensaje: MensajesSwalComponent,
      private apiService: ApiService,
      private localStorage: LocalStorageService
    )  {}

  ngOnInit(): void {
    this.guia.ciudad = '0';
    this.guia.tipo_pago = '0';
  }


  generateQRCode(): void {
    const url = 'https://www.google.com';
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
     this.mostrarQR = true;
  }


handleImageError(event: any): void {
  console.error('Error loading QR code image');
  // Puedes setear una imagen de fallback si quieres
  event.target.src = 'assets/images/fallback-qr.png';
}


    ProcesarGuia() {
        let token = this.localStorage.getItem('token');
        console.log(this.guia)
        this.apiService.GuardarGuia( token, this.guia).subscribe((res: any) => {
        this.visualizarRespuesta(res);      
        this.generateQRCode();    
        }
    );
    }

    visualizarRespuesta(data: any  ) {
      this.mensaje.MostrarMensaje(
        'success',
        'Guía procesada',
        'La guía ha sido procesada correctamente.'
      );
    }


 ocultarQR(): void {
    this.mostrarQR = false;
  }
  


}

