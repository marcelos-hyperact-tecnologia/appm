import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-perguntasfrequentes',
  templateUrl: './perguntasfrequentes.page.html',
  styleUrls: ['./perguntasfrequentes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PerguntasfrequentesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
