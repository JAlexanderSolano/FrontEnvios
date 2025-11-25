import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from '../service/localstorage.service';
import { UiServiceService } from '../service/ui.service.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  NgbNavModule = NgbNavModule;
  NgbDropdownModule = NgbDropdownModule;
  urlFrame: any = '';

  constructor(private sanitizer: DomSanitizer, public ui: UiServiceService) {}

  IFrameContacto() {
    this.urlFrame = this.sanitizer.bypassSecurityTrustResourceUrl('/contacto');
  }

  IFrameLogin() {
    this.urlFrame = this.sanitizer.bypassSecurityTrustResourceUrl('/login');
  }
}
