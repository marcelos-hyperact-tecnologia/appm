import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

import { AddPesoModalComponent } from '../controlesdiarios/add-peso-modal/add-peso-modal.component';
import { AddGlicemiaModalComponent } from '../controlesdiarios/add-glicemia-modal/add-glicemia-modal.component';
import { AddPressaoModalComponent } from '../controlesdiarios/add-pressao-modal/add-pressao-modal.component';
import { AddTemperaturaModalComponent } from '../controlesdiarios/add-temperatura-modal/add-temperatura-modal.component';

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
export class ControlesdiariosPage {
  activeTab = 'peso';

  constructor(private modalCtrl: ModalController) {}

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
    }
  }
}
