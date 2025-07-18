import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  active = 'top';
  urlFrame: any = '';
  constructor(private sanitizer: DomSanitizer, private router: Router) {}
  ngOnInit(): void {}

  solicitarGuia() {
    this.urlFrame = this.sanitizer.bypassSecurityTrustResourceUrl('/guia');
  }
  cerrarSesion() {
    this.router.navigate(['login']);
  }
}
