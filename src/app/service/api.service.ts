import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URLAPI = 'https://localhost:7172/api';

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

}
