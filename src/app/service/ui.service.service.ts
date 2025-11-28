import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiServiceService {
  constructor() {}
  mostrarNav: boolean = false;

  ocultarNav() {
    this.mostrarNav = true;
  }

  mostrarNavegacion() {
    this.mostrarNav = false;
  }
}
