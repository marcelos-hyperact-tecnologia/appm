import { Component, Input } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() titulo = '';

  constructor(private menuCtrl: MenuController) {}

openMenu() {
  this.menuCtrl.enable(true, 'main'); // habilita o menu com ID 'main'
  this.menuCtrl.open('main');         // força a abertura do menu com ID 'main'
}
}
