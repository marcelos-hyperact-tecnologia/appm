import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,      // ✅ já inclui IonButton, IonInput, IonToolbar, etc
    CommonModule,
    FormsModule,
    RouterModule      // ✅ necessário por causa do [routerLink]
  ]
})
export class LoginPage {}
