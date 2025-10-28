import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/localstorage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-guia',
  standalone: false,
  templateUrl: './guia.component.html',
  styleUrl: './guia.component.css',
})
export class GuiaComponent implements OnInit  {
   @ViewChild('ciudadDestino') ciudadDestino!: ElementRef;
   @ViewChild('peso') peso!: ElementRef;
   @ViewChild('volumen') volumen!: ElementRef;
   @ViewChild('unidades') unidades!: ElementRef;
   @ViewChild('valorDeclarado') ValorDeclarado!: ElementRef;
   @ViewChild('destinatario') destinatario!: ElementRef;
   @ViewChild('direccionDestinatario') direccionDestinatario!: ElementRef;
   @ViewChild('tipo_pago') tipo_pago!: ElementRef;
   @ViewChild('tipo_documento') tipo_documento!: ElementRef;
   @ViewChild('documento') documento!: ElementRef;
   @ViewChild('celular') celular!: ElementRef;
   @ViewChild('email') email!: ElementRef;


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
    uso_medidas: '',
    peso: '',
    volumen: '',
    descripcion_contenido: '',
    observaciones: '',
    documento_remitente: '',
    cuenta: ''
  };

  costoGuia = 
 {
      Ciudad : '',
      Peso: '',
      Volumen: '',
      Unidades: '',
      ValorDeclarado: '',
      CuentaCliente: ''
 };


  erroresCampos: { [key: string]: boolean } = {};

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
    const cuentaCliente = this.localStorage.getItem('cuenta');
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
    this.guia.ciudad='';
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
       
      if (!this.validacionCampos("todo", "")) {
        return;
      }
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

  let cuentaCliente = this.localStorage.getItem('cuenta');
  let token = this.localStorage.getItem('token');

  if (!this.validacionCampos("", "Presu")) {
  return;
  }


  this.costoGuia.Ciudad = this.guia.ciudad ? this.guia.ciudad : '';
  this.costoGuia.Peso = this.guia.peso ? this.guia.peso : '';
  this.costoGuia.Volumen = this.guia.volumen ? this.guia.volumen : '';
  this.costoGuia.Unidades = this.guia.unidades ? this.guia.unidades : '';
  this.costoGuia.ValorDeclarado = this.guia.valor_total_declarado ? this.guia.valor_total_declarado : ''; 
  this.costoGuia.CuentaCliente = cuentaCliente ? cuentaCliente : '';


   this.apiService.getCostoGuia( token, this.costoGuia).subscribe(  
      (res: any) => {
  

        this.mensaje.MostrarMensaje(
        'success',
        'Presupuesto',
        'El presupuesto de la guia es ' + res
      );


      },
       (error) => {
        console.error('Error calculando costo guia:', error);
        this.mensaje.MostrarMensaje('error', 'Error', 'No se pudo calcular el costo de la guía');
      }
    );  
 }


validacionCampos(clasifi: string, tipo:  string): boolean {
    this.erroresCampos = {}; // Reinicia errores

    const campos = [

    
    {  clasificacion:"todo", tipo:"", valor: this.guia.destinatario, ref: this.destinatario, mensaje: 'Por favor ingresar el destinatario' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.direccion_destinatario, ref: this.direccionDestinatario, mensaje: 'Por favor ingresar la dirección del destinatario' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.tipo_pago, ref: this.tipo_pago, mensaje: 'Por favor seleccionar el tipo de pago' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.tipo_documento, ref: this.tipo_documento, mensaje: 'Por favor seleccionar el tipo de documento' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.documento, ref: this.documento, mensaje: 'Por favor ingresar el  documento' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.celular, ref: this.celular, mensaje: 'Por favor ingresar el celular' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.email, ref: this.email, mensaje: 'Por favor ingresar el email' },


    {  clasificacion:"todo",  tipo:"Presu", valor: this.guia.ciudad, ref: this.ciudadDestino, mensaje: 'Por favor ingresar la ciudad destino valida' },
    {  clasificacion:"todo",  tipo:"Presu", valor: this.ciudadSearchText, ref: this.ciudadDestino, mensaje: 'Por favor ingresar la ciudad destino valida' },

    {  clasificacion:"todo",  tipo:"Presu", valor: this.guia.valor_total_declarado, ref: this.ValorDeclarado, mensaje: 'Por favor ingresar el valor total declarado' },
    {  clasificacion:"todo",  tipo:"Presu", valor: this.guia.unidades, ref: this.unidades, mensaje: 'Por favor ingresar la cantidad de unidades' },
    {  clasificacion:"todo",  tipo:"Presu", valor: this.guia.peso, ref: this.peso, mensaje: 'Por favor ingresar el peso total de las unidades de la guía' },
    {  clasificacion:"todo",  tipo:"Presu", valor: this.guia.volumen, ref: this.volumen, mensaje: 'Por favor ingresar el volumen' },
  ];

    for (const campo of campos) {
    if ((!campo.valor || campo.valor.trim() === '') 
         && (campo.clasificacion ===clasifi ||  campo.tipo===tipo )) 
    {
      campo.ref.nativeElement.focus();
      this.mensaje.MostrarMensaje('warn', 'Campo requerido', campo.mensaje);
      return false;
    }
  }
  return true;
  } 


  validacionGuiaEliminar(): boolean {
    this.erroresCampos = {}; // Reinicia errores
  
    const campos = [

    {  clasificacion:"todo", tipo:"", valor: this.guia.destinatario, ref: this.destinatario, mensaje: 'Por favor ingresar el destinatario' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.direccion_destinatario, ref: this.direccionDestinatario, mensaje: 'Por favor ingresar la dirección del destinatario' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.tipo_pago, ref: this.tipo_pago, mensaje: 'Por favor seleccionar el tipo de pago' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.tipo_documento, ref: this.tipo_documento, mensaje: 'Por favor seleccionar el tipo de documento' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.documento, ref: this.documento, mensaje: 'Por favor ingresar el  documento' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.celular, ref: this.celular, mensaje: 'Por favor ingresar el celular' },
    {  clasificacion:"todo", tipo:"", valor: this.guia.email, ref: this.email, mensaje: 'Por favor ingresar el emial' },

  ];

    for (const campo of campos) {
    if (!campo.valor || campo.valor.trim() === '  ' || campo.valor === '0'  || campo.valor === '') {
      campo.ref.nativeElement.focus();
      this.mensaje.MostrarMensaje('warn', 'Campo requerido', campo.mensaje);
      return false;
    }
  }
  return true;
  } 


 ocultarQR(): void {
    this.mostrarQR = false;
  }
  

}

