import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../service/api.service';

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  clientes: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }
}