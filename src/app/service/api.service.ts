import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  //private URLAPI = 'https://localhost:7172/api';
  private URLAPI = 'http://192.168.2.112:6031/api';

  constructor(private http: HttpClient) { }
  
  public Login(data: any):Observable<any[]> {
     const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any[]>(`${this.URLAPI}/Login`, data, { headers });
  }

  public GuardarGuia( token:any,  data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.URLAPI}/Guia/GuardarGuia`, data, { headers });
  }

    public getClientes(): Observable<any[]> {
      const url = 'https://68aaf844909a5835049d7391.mockapi.io/clientes';
      return this.http.get<any[]>(url);

    }



}
