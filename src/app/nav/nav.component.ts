import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  NgbNavModule = NgbNavModule;
  NgbDropdownModule = NgbDropdownModule;
  urlFrame: any = '';

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {}

  IFrameLogin() {
    this.urlFrame = this.sanitizer.bypassSecurityTrustResourceUrl('/login');
  }
}
