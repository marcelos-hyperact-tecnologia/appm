import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-pressao-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './add-pressao-modal.component.html',
  styleUrls: ['./add-pressao-modal.component.scss'],
})
export class AddPressaoModalComponent {
  sistolica: number | null = null;
  diastolica: number | null = null;
  data: string = new Date().toISOString();

  constructor(private modalCtrl: ModalController) {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    if (this.sistolica && this.diastolica) {
      this.modalCtrl.dismiss({
        sistolica: this.sistolica,
        diastolica: this.diastolica,
        data: this.data,
      });
    }
  }
}
