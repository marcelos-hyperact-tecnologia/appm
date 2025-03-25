import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly baseUrl = 'https://parseapi.back4app.com';
  private readonly appId = 'Dfqlp4XQck73v3eB4lcKSKE2BCZXMedjxxG2JJQG';
  private readonly apiKey = 'fRXay8Lalazv7nJaLsz1ZIZT2DCmL9RIpleNLAyy';

  // ✅ Login no Back4App usando username/email e password
  login(email: string, password: string): Promise<any> {
    const url = `${this.baseUrl}/login?username=${email}&password=${password}`;
    const headers = {
      'X-Parse-Application-Id': this.appId,
      'X-Parse-REST-API-Key': this.apiKey,
      'X-Parse-Revocable-Session': '1'
    };

    return fetch(url, {
      method: 'GET',
      headers
    }).then(res => {
      if (!res.ok) {
        throw new Error('Usuário ou senha incorretos.');
      }
      return res.json();
    });
  }

  // ✅ Recupera papel do usuário salvo no localStorage
  getUserRole(): string {
    return (localStorage.getItem('papel') || '').trim().toLowerCase();
  }

  // ✅ Recupera nome do usuário
  getUserName(): string {
    return localStorage.getItem('nome') || '';
  }

  // ✅ Remove dados da sessão
  logout(): void {
    localStorage.removeItem('objectId');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('papel');
  }

  // ✅ Verificações de tipo de papel
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isReceptor(): boolean {
    return this.getUserRole() === 'receptor';
  }

  // ✅ Verifica se usuário está logado
  isLogado(): boolean {
    return !!localStorage.getItem('objectId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('objectId');
  }
}
