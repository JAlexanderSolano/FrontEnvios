import { Component } from '@angular/core';

@Component({
  selector: 'app-destinatario',
  standalone: false,
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.css',
})
export class DestinatarioComponent {
  filtroDestinatario: any;

  filtrarDestinatarios() {}
}
