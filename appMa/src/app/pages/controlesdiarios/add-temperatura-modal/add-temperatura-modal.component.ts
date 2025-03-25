import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-temperatura-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './add-temperatura-modal.component.html',
  styleUrls: ['./add-temperatura-modal.component.scss'],
})
export class AddTemperaturaModalComponent {
  temperatura: number | null = null;
  data: string = new Date().toISOString();

  constructor(private modalCtrl: ModalController) {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    if (this.temperatura !== null) {
      this.modalCtrl.dismiss({
        temperatura: this.temperatura,
        data: this.data,
      });
    }
  }

  limpar() {
    this.temperatura = null;
    this.data = new Date().toISOString();
  }
}
