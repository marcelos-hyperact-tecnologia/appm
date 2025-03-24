import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

import { AddPesoModalComponent } from '../controlesdiarios/add-peso-modal/add-peso-modal.component';
import { AddGlicemiaModalComponent } from '../controlesdiarios/add-glicemia-modal/add-glicemia-modal.component';
import { AddPressaoModalComponent } from '../controlesdiarios/add-pressao-modal/add-pressao-modal.component';
import { AddTemperaturaModalComponent } from '../controlesdiarios/add-temperatura-modal/add-temperatura-modal.component';

import { GlicemiaService } from '../../services/glicemia.service';

@Component({
  selector: 'app-controlesdiarios',
  standalone: true,
  templateUrl: './controlesdiarios.page.html',
  styleUrls: ['./controlesdiarios.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    PageHeaderComponent
  ]
})
export class ControlesdiariosPage implements OnInit {
  activeTab = 'peso';
  glicemiaAgrupada: { titulo: string, registros: any[] }[] = [];

  constructor(
    private modalCtrl: ModalController,
    private glicemiaService: GlicemiaService
  ) {}

  ngOnInit(): void {
    this.recarregarAba();
  }

  async openModal() {
    let component: any;

    switch (this.activeTab) {
      case 'peso':
        component = AddPesoModalComponent;
        break;
      case 'glicemia':
        component = AddGlicemiaModalComponent;
        break;
      case 'pressao':
        component = AddPressaoModalComponent;
        break;
      case 'temperatura':
        component = AddTemperaturaModalComponent;
        break;
    }

    if (component) {
      const modal = await this.modalCtrl.create({ component });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data?.sucesso) {
        this.recarregarAba();
      }
    }
  }

  recarregarAba() {
    switch (this.activeTab) {
      case 'peso':
        this.carregarPesos();
        break;
      case 'glicemia':
        this.carregarGlicemias();
        break;
      case 'pressao':
        this.carregarPressoes();
        break;
      case 'temperatura':
        this.carregarTemperaturas();
        break;
    }
  }

  carregarGlicemias() {
    const userId = localStorage.getItem('objectId');
    if (!userId) return;

    this.glicemiaService.getGlicemias(userId).subscribe({
      next: (res) => {
        const agrupado: { [key: string]: any[] } = {};

        res.results.forEach((item: any) => {
          const data = new Date(item.data);
          const mesAno = data.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + data.getFullYear();
          const dia = `Dia ${data.getDate().toString().padStart(2, '0')}`;
          const hora = data.toTimeString().slice(0, 5);

          const registro = {
            dia,
            hora,
            valor: item.glicemia,
            alerta: item.glicemia > 180
          };

          if (!agrupado[mesAno]) {
            agrupado[mesAno] = [];
          }

          agrupado[mesAno].push(registro);
        });

        this.glicemiaAgrupada = Object.entries(agrupado).map(([titulo, registros]) => ({
          titulo,
          registros
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar glicemias:', err);
      }
    });
  }

  // Placeholder para outras abas
  carregarPesos() {}
  carregarPressoes() {}
  carregarTemperaturas() {}
}
