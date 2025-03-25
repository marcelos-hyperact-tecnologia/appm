import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PesoService {
  private readonly apiUrl = 'https://parseapi.back4app.com/classes/ControlePeso';
  private readonly headers = new HttpHeaders({
    'X-Parse-Application-Id': 'Dfqlp4XQck73v3eB4lcKSKE2BCZXMedjxxG2JJQG',
    'X-Parse-REST-API-Key': 'fRXay8Lalazv7nJaLsz1ZIZT2DCmL9RIpleNLAyy',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getPesos(userId: string): Observable<any> {
    const where = JSON.stringify({ iduser: userPointer(userId) });
    const params = new HttpParams().set('where', where).set('order', '-data');

    return this.http.get<any>(this.apiUrl, { headers: this.headers, params });
  }

  addPeso(peso: number, userId: string, data: string): Observable<any> {
    const body = {
      data,
      peso,
      iduser: userPointer(userId),
    };
  
    return this.http.post(this.apiUrl, body, { headers: this.headers });
  }
  

  updatePeso(id: string, novoPeso: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { peso: novoPeso }, { headers: this.headers });
  }

  deletePeso(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}

function userPointer(userId: string) {
  return {
    __type: 'Pointer',
    className: '_User',
    objectId: userId,
  };
}
