import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  nomeUsuario = '';
  papelUsuario = '';
  exibirAdmin = false;
  exibirReceptor = false;

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit(): void {
    const papel = this.authService.getUserRole();
    this.papelUsuario = papel;
    this.nomeUsuario = localStorage.getItem('nome') || '';

    this.exibirAdmin = papel === 'admin';
    this.exibirReceptor = papel === 'receptor';
  }

  toggleMenu() {
    this.menuCtrl.toggle('start');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
