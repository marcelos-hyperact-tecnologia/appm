import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-carteirinha',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './carteirinha.page.html',
  styleUrls: ['./carteirinha.page.scss'],
})
export class CarteirinhaPage {
  dados = {
    nome: 'Maria da Silva',
    nascimento: '10/10/1990',
    cpf: '999.999.999-99',
    cns: '999999999999999',
    hospital: 'HU UFSC',
    orgao: 'Fígado',
    dataTransplante: '10/10/2010',
    dataRetransplante: '10/10/2010'
  };

  compartilhar() {
    console.log('Compartilhar');
  }

  exportar() {
    console.log('Exportar');
  }
}
