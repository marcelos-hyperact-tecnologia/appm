import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'equipe',
        loadComponent: () =>
          import('./pages/equipe/equipe.page').then(m => m.EquipePage),
      },
      {
        path: 'paciente',
        loadComponent: () =>
          import('./pages/paciente/paciente.page').then(m => m.PacientePage),
      },
      {
        path: 'imunosupressores',
        loadComponent: () =>
          import('./pages/imunosupressores/imunosupressores.page').then(m => m.ImunosupressoresPage),
      },
      {
        path: 'carteirinha',
        loadComponent: () =>
          import('./pages/carteirinha/carteirinha.page').then(m => m.CarteirinhaPage),
      },
      {
        path: 'agenda',
        loadComponent: () =>
          import('./pages/agenda/agenda.page').then(m => m.AgendaPage),
      },
      {
        path: 'controlesdiarios',
        loadComponent: () =>
          import('./pages/controlesdiarios/controlesdiarios.page').then(m => m.ControlesdiariosPage),
      },
      {
        path: 'orientacoes',
        loadComponent: () =>
          import('./pages/orientacoes/orientacoes.page').then(m => m.OrientacoesPage),
      },
      {
        path: 'perguntasfrequentes',
        loadComponent: () =>
          import('./pages/perguntasfrequentes/perguntasfrequentes.page').then(m => m.PerguntasfrequentesPage),
      }
    ]
  }
];
