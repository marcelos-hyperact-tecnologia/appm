import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-glicemia-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,   // ✅ necessário para ngModel
    IonicModule    // ✅ inclui todos os Web Components do Ionic
  ],
  templateUrl: './add-glicemia-modal.component.html',
  styleUrls: ['./add-glicemia-modal.component.scss'],
})
export class AddGlicemiaModalComponent {
  valor: number | null = null;
  data: string = new Date().toISOString(); // ✅ necessário para [(ngModel)]

  constructor(private modalCtrl: ModalController) {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    if (this.valor !== null) {
      this.modalCtrl.dismiss({ valor: this.valor, data: this.data });
    }
  }
}
