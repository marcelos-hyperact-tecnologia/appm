import { Component } from '@angular/core';
import { IonicModule, IonMenuButton, IonButtons, IonToolbar, IonHeader, IonTitle } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    PageHeaderComponent
  ],
  templateUrl: './equipe.page.html',
  styleUrls: ['./equipe.page.scss'],
})
export class EquipePage {}
