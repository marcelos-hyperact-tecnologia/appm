import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, MenuController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    IonicModule,
    PageHeaderComponent
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  constructor(
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit(): void {
    this.menuCtrl.enable(true); // Garante que o menu esteja ativado ao entrar na home
  }

  homeItems = [
    { icon: 'assets/icons/equipe.svg', label: 'Equipe', route: '/equipe' },
    { icon: 'assets/icons/paciente.svg', label: 'Paciente', route: '/paciente' },
    { icon: 'assets/icons/imunossupressores.svg', label: 'Imunossupressores', route: '/imunosupressores' },
    { icon: 'assets/icons/carteirinha.svg', label: 'Carteirinha', route: '/carteirinha' },
    { icon: 'assets/icons/agenda.svg', label: 'Agenda', route: '/agenda' },
    { icon: 'assets/icons/controles.svg', label: 'Controles diários', route: '/controlesdiarios' },
    { icon: 'assets/icons/orientacoes.svg', label: 'Orientações', route: '/orientacoes' },
    { icon: 'assets/icons/perguntas.svg', label: 'Perguntas frequentes', route: '/perguntasfrequentes' }
  ];

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  openMenu(): void {
    this.menuCtrl.open();
  }
}
