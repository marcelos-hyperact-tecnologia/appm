import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { PesoService } from 'src/app/services/peso.service'; // ajuste se necessário

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

  constructor(
    private modalCtrl: ModalController,
    private pesoService: PesoService,
    private toastCtrl: ToastController
  ) {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    const userId = localStorage.getItem('objectId');
    if (!userId || this.peso === null) return;

    this.pesoService.addPeso(this.peso, userId, this.data).subscribe({
      next: () => {
        this.toastCtrl.create({
          message: 'Peso cadastrado com sucesso!',
          duration: 2000,
          color: 'success',
        }).then(t => t.present());

        this.modalCtrl.dismiss({ sucesso: true });
      },
      error: () => {
        this.toastCtrl.create({
          message: 'Erro ao cadastrar peso.',
          duration: 2000,
          color: 'danger',
        }).then(t => t.present());
      }
    });
  }

  limpar() {
    this.peso = null;
    this.data = new Date().toISOString();
  }
  
}
