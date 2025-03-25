import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class LoginPage {
  user = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    this.errorMessage = '';

    try {
      const response = await this.authService.login(this.user.email, this.user.password);

      // Salva dados no localStorage
      localStorage.setItem('objectId', response.objectId);
      localStorage.setItem('nome', response.nomecompleto);
      localStorage.setItem('email', response.email);
      localStorage.setItem('papel', response.papel);

      // Redireciona para a home
      this.router.navigateByUrl('/home');
    } catch (err) {
      this.errorMessage = 'Usuário ou senha incorretos.';
    }
  }
}
