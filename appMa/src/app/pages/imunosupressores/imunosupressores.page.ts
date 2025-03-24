import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-imunosupressores',
  templateUrl: './imunosupressores.page.html',
  styleUrls: ['./imunosupressores.page.scss'],
  standalone: true,
  imports: [
    IonicModule,      // ✅ já inclui IonButton, IonInput, IonToolbar, etc
    CommonModule,
    FormsModule,
    RouterModule      // ✅ necessário por causa do [routerLink]
  ]
})
export class ImunosupressoresPage {


}
