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

  // 📥 Buscar registros por usuário
  getGlicemias(userId: string): Observable<{ results: any[] }> {
    const where = JSON.stringify({ iduser: this.userPointer(userId) });

    const params = new HttpParams()
      .set('where', where)
      .set('order', '-data');

    return this.http.get<{ results: any[] }>(this.apiUrl, {
      headers: this.headers,
      params,
    });
  }

  // ➕ Criar novo registro
  addGlicemia(valor: number, userId: string): Observable<any> {
    const body = {
      data: new Date().toISOString(),
      glicemia: valor,
      iduser: this.userPointer(userId),
    };

    return this.http.post(this.apiUrl, body, {
      headers: this.headers,
    });
  }

  // ✏️ Atualizar registro
  updateGlicemia(id: string, novoValor: number): Observable<any> {
    const body = { glicemia: novoValor };

    return this.http.put(`${this.apiUrl}/${id}`, body, {
      headers: this.headers,
    });
  }

  // ❌ Deletar registro
  deleteGlicemia(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.headers,
    });
  }

  // 🔁 Helper privado para criar o Pointer do usuário
  private userPointer(userId: string) {
    return {
      __type: 'Pointer',
      className: '_User',
      objectId: userId,
    };
  }
}
