import { Component } from '@angular/core';
import {
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonMenuButton, // ✅ Importante para o botão do menu funcionar
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton
  ],
})
export class HomePage {
  constructor() {}
}
