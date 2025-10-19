import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/localstorage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';


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
    cuenta: ''
  };
  responseCiudades: any;

  ciudades: any[] = [];
  ciudadesFiltradas: any[] = [];
  searchTerm = new Subject<string>();

  destinatarios: any[] = [];
  destinatariosFiltrados: any[] = [];
  
  mostrarDropdown = false;
  loading = false;
  ciudadSearchText: string = ''; // Texto que se muestra en el input
  ciudadSeleccionada: any = null; // Ciudad seleccionada

  mostrarDrpdownDestintario = false;
  loadingDestinatarios = false;
  destintarioSearchText: string = '';
  destinatarioSeleccionado: any = null;


  qrCodeUrl: string = '';
  mostrarQR: boolean = false;

    constructor(
      private mensaje: MensajesSwalComponent,
      private apiService: ApiService,
      private localStorage: LocalStorageService
    )  {}

  ngOnInit(): void {
    this.guia.ciudad = '';
    this.guia.tipo_pago = '0';
    this.cargarCiudades();
    this.cargarDestinatarios();
  }

  cargarCiudades(): void {
    const token = this.localStorage.getItem('token');
    this.loading = true;
    this.apiService.getCiudades(token).subscribe({
      next: (ciudades) => {
        console.log('Ciudades cargadas:', ciudades);
        this.ciudades = ciudades;
        this.ciudadesFiltradas = ciudades;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando ciudades:', error);
        this.loading = false;
        this.mensaje.MostrarMensaje('error', 'Error', 'No se pudieron cargar las ciudades');
      }
    });
  }

  cargarDestinatarios(): void {
    const token = this.localStorage.getItem('token');
    this.loadingDestinatarios = true;
    this.apiService.getDestinatarios(token).subscribe({
    next:(destinatarios) => {
      this.destinatarios = destinatarios;
      this.destinatariosFiltrados = destinatarios;
      this.loadingDestinatarios = false;
    } ,  error: (error) => {
        console.error('Error cargando destinatarios:', error);
        this.loadingDestinatarios = false;
        this.mensaje.MostrarMensaje('error', 'Error', 'No se pudieron cargar los destinatarios');
      }
    });
  }


 //------------------------------------------------------------------------------

  onSearchChange(event: any): void {
    const value = event.target.value;
    this.ciudadSearchText = value;
    this.filtrarCiudadesEnTiempoReal(value);
  }

  onSearchChangeDestintario(event: any): void {
    const value = event.target.value;
    this.destintarioSearchText = value;
    this.filtrarDestinatarioEnTiempoReal(value);
  }


  filtrarCiudadesEnTiempoReal(term: string): void {
    if (!term || term.trim() === '') {
      this.ciudadesFiltradas = this.ciudades;
    } else {
      this.ciudadesFiltradas = this.ciudades.filter(ciudad => 
        ciudad.ciudad.toLowerCase().includes(term.toLowerCase())
      );
    }    
    this.mostrarDropdown = this.ciudadesFiltradas.length > 0;
  }

  filtrarDestinatarioEnTiempoReal(term: string): void {
    if (!term || term.trim() === '') {
      this.destinatariosFiltrados = this.destinatarios;
    } else {
      this.destinatariosFiltrados = this.destinatarios.filter(nodo => 
        nodo.nombre.toLowerCase().includes(term.toLowerCase())
        ||  nodo.documento.toLowerCase().includes(term.toLowerCase())
      );
    }    
    this.mostrarDrpdownDestintario = this.ciudadesFiltradas.length > 0;
  }


  seleccionarCiudad(ciudad: any): void {
      this.ciudadSeleccionada = ciudad;
      this.guia.ciudad = ciudad.id;
      this.ciudadSearchText = ciudad.ciudad;
      this.mostrarDropdown = false;
  }


  seleccionarDestintario(destinatario: any): void {
      this.destinatarioSeleccionado = destinatario;
      this.guia.destinatario = destinatario.nombre;
      this.destintarioSearchText = destinatario.nombre;
      this.mostrarDrpdownDestintario = false;

      this.guia.direccion_destinatario =  destinatario.direccion;
      this.guia.ciudad =  destinatario.ciudad;
      this.guia.documento =  destinatario.documento;
      this.guia.celular  =  destinatario.celular;
      this.guia.telefono  =  destinatario.telefono;
      this.guia.email  =  destinatario.email;

      
  }



  onFocus(): void {
    if (this.ciudadesFiltradas.length > 0) {
      this.mostrarDropdown = true;
    } else {
      this.ciudadesFiltradas = this.ciudades;
      this.mostrarDropdown = true;
    }
  }

  onFocusDestinatario(): void {
    if (this.destinatariosFiltrados.length > 0) {
      this.mostrarDrpdownDestintario = true;
    } else {
      this.destinatariosFiltrados = this.ciudades;
      this.mostrarDrpdownDestintario= true;
    }
  }



  onBlur(): void {
    setTimeout(() => {
      this.mostrarDropdown = false;
    }, 200);
  }


  onBlurDestinatarios(): void {
    setTimeout(() => {
      this.mostrarDrpdownDestintario = false;
    }, 200);
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
        let cuenta = this.localStorage.getItem('cuenta');
        this.guia.cuenta = cuenta ?? '';  
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
        'Guia',
        'La guía ha sido procesada correctamente.'
      );
    }


calcularPresupuesto(){
  this.visualizarRespuestaPresupuesto("");
}

  visualizarRespuestaPresupuesto(data: any  ) {
      this.mensaje.MostrarMensaje(
        'success',
        'Presupuesto',
        'El presupuesto de la guia es 19.0000 pesos.'
      );
    }



 ocultarQR(): void {
    this.mostrarQR = false;
  }
  


}

