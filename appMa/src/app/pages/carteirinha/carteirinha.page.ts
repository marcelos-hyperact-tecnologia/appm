import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';


import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';


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

  async compartilhar() {
    const elemento = document.getElementById('carteirinha');
  
    if (!elemento) {
      console.error('Elemento não encontrado!');
      return;
    }
  
    const canvas = await html2canvas(elemento);
    const imgData = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 10, width, height);
  
    const pdfBlob = pdf.output('blob');
    const reader = new FileReader();
  
    reader.onloadend = async () => {
      const base64data = (reader.result as string).split(',')[1];
  
      const fileName = 'carteirinha.pdf';
  
      await Filesystem.writeFile({
        path: fileName,
        data: base64data,
        directory: Directory.Documents,
        recursive: true
      });
  
      await Share.share({
        title: 'Minha carteirinha',
        text: 'Veja minha carteirinha de transplantado.',
        url: `data:application/pdf;base64,${base64data}`,
        dialogTitle: 'Compartilhar carteirinha'
      });
    };
  
    reader.readAsDataURL(pdfBlob);
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
