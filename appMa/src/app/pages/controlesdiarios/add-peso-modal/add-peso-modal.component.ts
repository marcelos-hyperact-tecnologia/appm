import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-peso-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './add-peso-modal.component.html',
  styleUrls: ['./add-peso-modal.component.scss'],
})
export class AddPesoModalComponent {
  peso: number | null = null;
  data: string = new Date().toISOString();

  constructor(private modalCtrl: ModalController) {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    if (this.peso !== null) {
      // Aqui você pode emitir os dados para salvar de verdade
      console.log('Salvar peso:', this.peso, 'Data:', this.data);
      this.modalCtrl.dismiss({ peso: this.peso, data: this.data });
    }
  }
}
