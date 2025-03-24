import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlicemiaService {
  private readonly apiUrl = 'https://parseapi.back4app.com/classes/ControleGlicemia';
  private readonly headers = new HttpHeaders({
    'X-Parse-Application-Id': 'Dfqlp4XQck73v3eB4lcKSKE2BCZXMedjxxG2JJQG',
    'X-Parse-REST-API-Key': 'fRXay8Lalazv7nJaLsz1ZIZT2DCmL9RIpleNLAyy',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getGlicemias(userId: string): Observable<any> {
    const where = encodeURIComponent(JSON.stringify({ iduser: userPointer(userId) }));
    const params = new HttpParams().set('where', where).set('order', '-data');

    return this.http.get<any>(this.apiUrl, { headers: this.headers, params });
  }

  addGlicemia(valor: number, userId: string): Observable<any> {
    const body = {
      data: new Date().toISOString(),
      glicemia: valor,
      iduser: userPointer(userId),
    };

    return this.http.post<any>(this.apiUrl, body, { headers: this.headers });
  }
}

// Helper para o Pointer de usuário (como no seu serviço AngularJS)
function userPointer(userId: string) {
  return {
    __type: 'Pointer',
    className: '_User',
    objectId: userId,
  };
}
