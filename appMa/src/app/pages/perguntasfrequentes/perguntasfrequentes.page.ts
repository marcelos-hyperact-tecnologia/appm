import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-perguntasfrequentes',
  templateUrl: './perguntasfrequentes.page.html',
  styleUrls: ['./perguntasfrequentes.page.scss'],
  standalone: true,
  imports: [
    IonicModule,      // ✅ já inclui IonButton, IonInput, IonToolbar, etc
    CommonModule,
    FormsModule,
    RouterModule,
    PageHeaderComponent     // ✅ necessário por causa do [routerLink]
  ]
})
export class PerguntasfrequentesPage{


}
