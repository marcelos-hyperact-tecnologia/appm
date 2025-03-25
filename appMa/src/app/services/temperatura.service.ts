import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {
  private readonly apiUrl = 'https://parseapi.back4app.com/classes/ControleTemperatura';

  private readonly headers = new HttpHeaders({
    'X-Parse-Application-Id': 'Dfqlp4XQck73v3eB4lcKSKE2BCZXMedjxxG2JJQG',
    'X-Parse-REST-API-Key': 'fRXay8Lalazv7nJaLsz1ZIZT2DCmL9RIpleNLAyy',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getTemperaturas(userId: string): Observable<any> {
    const where = JSON.stringify({ iduser: this.userPointer(userId) });
    const params = new HttpParams().set('where', where).set('order', '-data');

    return this.http.get<any>(this.apiUrl, { headers: this.headers, params });
  }

  addTemperatura(valor: number, userId: string, data: string): Observable<any> {
    const body = {
      temperatura: valor,
      data,
      iduser: this.userPointer(userId),
    };
    return this.http.post<any>(this.apiUrl, body, { headers: this.headers });
  }

  updateTemperatura(id: string, novoValor: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { temperatura: novoValor }, { headers: this.headers });
  }

  deleteTemperatura(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  private userPointer(userId: string) {
    return {
      __type: 'Pointer',
      className: '_User',
      objectId: userId
    };
  }
}
