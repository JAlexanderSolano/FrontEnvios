import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: any = 'Entregas';
  showheader = true;
  correooficial: any = '';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const rutasSinHeaer = ['/login', '/principal', '/guia'];
        this.showheader = !rutasSinHeaer.includes(event.url);
      });
  }
  ngOnInit(): void {
    this.correooficial = 'info@entregas-am.com';
  }
}
