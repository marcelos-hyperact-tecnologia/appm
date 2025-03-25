import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    const elemento = document.getElementById('carteirinha');

    if (elemento) {
      html2canvas(elemento).then((canvas) => {
        const imagem = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const largura = pdf.internal.pageSize.getWidth();
        const altura = (canvas.height * largura) / canvas.width;

        pdf.addImage(imagem, 'PNG', 0, 10, largura, altura);
        pdf.save('carteirinha.pdf');
      });
    } else {
      console.error('Elemento carteirinha não encontrado!');
    }
  }
}
