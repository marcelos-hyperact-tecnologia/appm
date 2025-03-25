import { Component } from '@angular/core';
import { ModalController, ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PressaoService } from 'src/app/services/pressao.service';

@Component({
  selector: 'app-add-pressao-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './add-pressao-modal.component.html',
  styleUrls: ['./add-pressao-modal.component.scss'],
})
export class AddPressaoModalComponent {
  sistolica: number | null = null;
  diastolica: number | null = null;
  data: string = new Date().toISOString();

  constructor(
    private modalCtrl: ModalController,
    private pressaoService: PressaoService,
    private toastCtrl: ToastController
  ) {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  limpar() {
    this.sistolica = null;
    this.diastolica = null;
    this.data = new Date().toISOString();
  }

  salvar() {
    const userId = localStorage.getItem('objectId');
    if (!userId || this.sistolica === null || this.diastolica === null) return;

    this.pressaoService.addPressao(this.sistolica, this.diastolica, userId, this.data).subscribe({
      next: () => {
        this.toastCtrl.create({
          message: 'Pressão registrada com sucesso!',
          duration: 2000,
          color: 'success',
        }).then(t => t.present());

        this.modalCtrl.dismiss({ sucesso: true });
      },
      error: () => {
        this.toastCtrl.create({
          message: 'Erro ao registrar pressão.',
          duration: 2000,
          color: 'danger',
        }).then(t => t.present());
      }
    });
  }
}
