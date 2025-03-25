import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlicemiaService } from '../../../services/glicemia.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-glicemia-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule // ✅ necessário se quiser usar [routerLink] no futuro
  ],
  templateUrl: './add-glicemia-modal.component.html',
  styleUrls: ['./add-glicemia-modal.component.scss'],
})
export class AddGlicemiaModalComponent {
  valor: number | null = null;
  data: string = new Date().toISOString();

  constructor(
    private modalCtrl: ModalController,
    private glicemiaService: GlicemiaService
  ) {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  salvar() {
    const userId = localStorage.getItem('objectId');

    if (!userId) {
      console.error('Usuário não autenticado.');
      return;
    }

    if (this.valor !== null) {
      this.glicemiaService.addGlicemia(this.valor, userId).subscribe({
        next: () => {
          this.modalCtrl.dismiss({ sucesso: true });
        },
        error: (err) => {
          console.error('Erro ao salvar glicemia:', err);
        },
      });
    }
  }

  limpar() {
    this.valor = null;
    this.data = new Date().toISOString();
  }
}
