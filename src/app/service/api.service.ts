import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

                    
  private URLAPI = 'https://localhost:7172/api';
 // private URLAPI = 'http://wsudr.emasoluciones.com.co:6031/api';

  constructor(private http: HttpClient) {}

  public Login(data: any): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any[]>(`${this.URLAPI}/Login`, data, { headers });
  }

  public GuardarGuia(token: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });                                       
    return this.http.post<any>(`${this.URLAPI}/Guia/GuardarGuia`, data, {
      headers,
    });
  }

  public getClientes(token: any): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    // const url = 'https://68aaf844909a5835049d7391.mockapi.io/clientes';
    //   const url = 'https://localhost:7172/GetClientes';
    return this.http.get<any[]>(`${this.URLAPI}/Clientes/GetClientes`, {
      headers,
    });
  }

  public addCliente(token: any, cliente: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    //  const url = 'https://localhost:7172/AddCliente';
    // return this.http.post<any>('https://68aaf844909a5835049d7391.mockapi.io/clientes', cliente);
    //  return this.http.post<any[]>(url,cliente, { headers });

    return this.http.post<any[]>(
      `${this.URLAPI}/Clientes/AddCliente`,
      cliente,
      { headers }
    );
  }

  public deleteCliente(token: any, id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    //  const url = `https://68aaf844909a5835049d7391.mockapi.io/clientes/${id}`;
    return this.http.delete(`${this.URLAPI}/Clientes/DeleteCliente/${id}`, {
      headers,
    });
  }

  // ------------------ Rafael Araujo   -------------------------------

  public addDestinatario(token: any, destinatario: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any[]>(
      `${this.URLAPI}/Destinatarios/AddDestinatario`,
      destinatario,
      { headers }
    );
  }

  public getDestinatarios(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(
      `${this.URLAPI}/Destinatarios/GetDestinatarios`,
      {
        headers,
      }
    );
  }

  public deleteDestinatario(token: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete(
      `${this.URLAPI}/Destinatarios/DeleteDestinatario/${id}`,
      {
        headers,
      }
    );
  }


  public getCiudades(token: any): Observable<any[]> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
  return this.http.get<any[]>(`${this.URLAPI}/Destinatarios/GetCiudades`, {
    headers,
  });
}




}
