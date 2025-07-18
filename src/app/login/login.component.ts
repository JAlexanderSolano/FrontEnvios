import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  login = {
    usuario: '',
    contrasena: '',
  };
  constructor(private router: Router) {}
  ngOnInit(): void {}

  Login() {
    if (this.login.usuario != '' && this.login.contrasena != '') {
      this.router.navigate(['principal']);
    }
  }
}
