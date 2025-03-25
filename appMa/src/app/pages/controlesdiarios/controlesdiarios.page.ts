import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

import { AddPesoModalComponent } from './add-peso-modal/add-peso-modal.component';
import { AddGlicemiaModalComponent } from './add-glicemia-modal/add-glicemia-modal.component';
import { AddPressaoModalComponent } from './add-pressao-modal/add-pressao-modal.component';
import { AddTemperaturaModalComponent } from './add-temperatura-modal/add-temperatura-modal.component';

import { GlicemiaService } from '../../services/glicemia.service';
import { PesoService } from '../../services/peso.service';
import { PressaoService } from '../../services/pressao.service';
import { TemperaturaService } from '../../services/temperatura.service';

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
  pesoAgrupado: { titulo: string, registros: any[] }[] = [];
  pressaoAgrupada: { titulo: string, registros: any[] }[] = []
  temperaturaAgrupada: { titulo: string, registros: any[] }[] = [];


  constructor(
    private modalCtrl: ModalController,
    private glicemiaService: GlicemiaService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private pesoService: PesoService,
    private pressaoService: PressaoService,
    private temperaturaService: TemperaturaService
  ) {}

  ngOnInit(): void {
    this.recarregarAba();
  }

  async abrirMenuPeso(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Ações',
      buttons: [
        {
          text: 'Editar',
          handler: () => this.editarPeso(item),
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => this.excluirPeso(item),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
  
    await alert.present();
  }
  
  async editarPeso(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Peso',
      inputs: [
        {
          name: 'valor',
          type: 'number',
          value: item.valor,
          placeholder: 'Novo valor (Kg)',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            const novoValor = +data.valor;
            if (!novoValor) return false;
  
            this.pesoService.updatePeso(item.objectId, novoValor).subscribe({
              next: () => {
                this.recarregarAba();
                this.toastCtrl.create({
                  message: 'Peso atualizado!',
                  duration: 2000,
                  color: 'success',
                }).then(t => t.present());
              },
              error: () => {
                this.toastCtrl.create({
                  message: 'Erro ao atualizar peso.',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              }
            });
  
            return true;
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  async excluirPeso(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar exclusão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.pesoService.deletePeso(item.objectId).subscribe({
              next: () => {
                this.recarregarAba();
                this.toastCtrl.create({
                  message: 'Peso removido!',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              },
              error: () => {
                this.toastCtrl.create({
                  message: 'Erro ao excluir peso.',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              }
            });
          },
        },
      ],
    });
  
    await alert.present();
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
      next: (res: { results: any[]; }) => {
        const agrupado: { [key: string]: any[] } = {};

        res.results.forEach((item: any) => {
          const data = new Date(item.data);
          const mesAno = data.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + data.getFullYear();
          const dia = `Dia ${data.getDate().toString().padStart(2, '0')}`;
          const hora = data.toTimeString().slice(0, 5);

          const registro = {
            objectId: item.objectId,
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
      error: (err: any) => {
        console.error('Erro ao carregar glicemias:', err);
        this.toastCtrl.create({
          message: 'Erro ao carregar dados.',
          duration: 3000,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }

  carregarPesos() {
    const userId = localStorage.getItem('objectId');
    if (!userId) return;
  
    this.pesoService.getPesos(userId).subscribe({
      next: (res: { results: any[]; }) => {
        const agrupado: { [key: string]: any[] } = {};
  
        res.results.forEach((item: any) => {
          const data = new Date(item.data);
          const mesAno = data.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + data.getFullYear();
          const dia = `Dia ${data.getDate().toString().padStart(2, '0')}`;
          const hora = data.toTimeString().slice(0, 5);
  
          const registro = {
            objectId: item.objectId,
            dia,
            hora,
            valor: item.peso
          };
  
          if (!agrupado[mesAno]) agrupado[mesAno] = [];
          agrupado[mesAno].push(registro);
        });
  
        this.pesoAgrupado = Object.entries(agrupado).map(([titulo, registros]) => ({ titulo, registros }));
      },
      error: (err: any) => {
        console.error('Erro ao carregar pesos:', err);
        this.toastCtrl.create({
          message: 'Erro ao carregar pesos.',
          duration: 3000,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }
  
  carregarPressoes() {
    const userId = localStorage.getItem('objectId');
    if (!userId) return;
  
    this.pressaoService.getPressoes(userId).subscribe({
      next: (res: { results: any[] }) => {
        const agrupado: { [key: string]: any[] } = {};
  
        res.results.forEach((item: any) => {
          const data = new Date(item.data);
          const mesAno = data.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + data.getFullYear();
          const dia = `Dia ${data.getDate().toString().padStart(2, '0')}`;
          const hora = data.toTimeString().slice(0, 5);
  
          const registro = {
            objectId: item.objectId,
            dia,
            hora,
            sistolica: item.sistolica,
            diastolica: item.diastolica,
            alerta: item.sistolica > 140 || item.diastolica > 90
          };
  
          if (!agrupado[mesAno]) agrupado[mesAno] = [];
          agrupado[mesAno].push(registro);
        });
  
        this.pressaoAgrupada = Object.entries(agrupado).map(([titulo, registros]) => ({
          titulo,
          registros
        }));
      },
      error: (err: any) => {
        console.error('Erro ao carregar pressões:', err);
        this.toastCtrl.create({
          message: 'Erro ao carregar dados de pressão.',
          duration: 3000,
          color: 'danger',
        }).then(t => t.present());
      }
    });
  }

  carregarTemperaturas() {
    const userId = localStorage.getItem('objectId');
    if (!userId) return;
  
    this.temperaturaService.getTemperaturas(userId).subscribe({
      next: (res) => {
        const agrupado: { [key: string]: any[] } = {};
  
        res.results.forEach((item: any) => {
          const data = new Date(item.data);
          const mesAno = data.toLocaleString('default', { month: 'long' }).toUpperCase() + ' - ' + data.getFullYear();
          const dia = `Dia ${data.getDate().toString().padStart(2, '0')}`;
          const hora = data.toTimeString().slice(0, 5);
  
          const registro = {
            objectId: item.objectId,
            dia,
            hora,
            valor: item.temperatura,
            alerta: item.temperatura > 38.5
          };
  
          if (!agrupado[mesAno]) agrupado[mesAno] = [];
          agrupado[mesAno].push(registro);
        });
  
        this.temperaturaAgrupada = Object.entries(agrupado).map(([titulo, registros]) => ({ titulo, registros }));
      },
      error: () => {
        this.toastCtrl.create({
          message: 'Erro ao carregar temperaturas',
          duration: 3000,
          color: 'danger'
        }).then(t => t.present());
      }
    });
  }
  
  async abrirMenuTemperatura(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Ações',
      buttons: [
        {
          text: 'Editar',
          handler: () => this.editarTemperatura(item),
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => this.excluirTemperatura(item),
        },
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
    await alert.present();
  }
  
  async editarTemperatura(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Temperatura',
      inputs: [{ name: 'valor', type: 'number', value: item.valor }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const novoValor = +data.valor;
            if (!novoValor) return false;
  
            this.temperaturaService.updateTemperatura(item.objectId, novoValor).subscribe({
              next: () => {
                this.recarregarAba();
                this.toastCtrl.create({
                  message: 'Temperatura atualizada!',
                  duration: 2000,
                  color: 'success',
                }).then(t => t.present());
              },
              error: () => {
                this.toastCtrl.create({
                  message: 'Erro ao atualizar temperatura',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              }
            });
  
            return true;
          }
        }
      ]
    });
    await alert.present();
  }
  
  async excluirTemperatura(item: any) {
    const confirm = await this.alertCtrl.create({
      header: 'Confirmar exclusão?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.temperaturaService.deleteTemperatura(item.objectId).subscribe({
              next: () => {
                this.recarregarAba();
                this.toastCtrl.create({
                  message: 'Temperatura removida!',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              },
              error: () => {
                this.toastCtrl.create({
                  message: 'Erro ao excluir temperatura',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              }
            });
          }
        }
      ]
    });
  
    await confirm.present();
  }
  
  
  async abrirMenuGlicemia(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Ações',
      buttons: [
        {
          text: 'Editar',
          handler: () => this.editarGlicemia(item),
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => this.excluirGlicemia(item),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  async editarGlicemia(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Glicemia',
      inputs: [
        {
          name: 'valor',
          type: 'number',
          value: item.valor,
          placeholder: 'Novo valor',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            const novoValor = +data.valor;
            if (!novoValor) return false;
          
            this.glicemiaService.updateGlicemia(item.objectId, novoValor).subscribe({
              next: () => {
                this.recarregarAba();
                this.toastCtrl.create({
                  message: 'Glicemia atualizada!',
                  duration: 2000,
                  color: 'success',
                }).then(t => t.present());
              },
              error: () => {
                this.toastCtrl.create({
                  message: 'Erro ao atualizar.',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              }
            });
          
            return true; // ✅ Adicionado para encerrar corretamente o handler
          }
          ,
        },
      ],
    });

    await alert.present();
  }

  async excluirGlicemia(item: any) {
    const confirm = await this.alertCtrl.create({
      header: 'Confirmar exclusão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.glicemiaService.deleteGlicemia(item.objectId).subscribe({
              next: () => {
                this.recarregarAba();
                this.toastCtrl.create({
                  message: 'Glicemia removida!',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              },
              error: () => {
                this.toastCtrl.create({
                  message: 'Erro ao excluir.',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              }
            });
          },
        },
      ],
    });

    await confirm.present();
  }

  async abrirMenuPressao(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Ações',
      buttons: [
        {
          text: 'Editar',
          handler: () => this.editarPressao(item),
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => this.excluirPressao(item),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
  
    await alert.present();
  }

  async editarPressao(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Pressão',
      inputs: [
        {
          name: 'sistolica',
          type: 'number',
          value: item.sistolica,
          placeholder: 'Sistólica',
        },
        {
          name: 'diastolica',
          type: 'number',
          value: item.diastolica,
          placeholder: 'Diastólica',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            const sistolica = +data.sistolica;
            const diastolica = +data.diastolica;
  
            if (!sistolica || !diastolica) return false;
  
            this.pressaoService.updatePressao(item.objectId, sistolica, diastolica).subscribe({
              next: () => {
                this.recarregarAba();
                this.toastCtrl.create({
                  message: 'Pressão atualizada!',
                  duration: 2000,
                  color: 'success',
                }).then(t => t.present());
              },
              error: () => {
                this.toastCtrl.create({
                  message: 'Erro ao atualizar pressão.',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              }
            });
  
            return true;
          }
        },
      ],
    });
  
    await alert.present();
  }
  async excluirPressao(item: any) {
    const confirm = await this.alertCtrl.create({
      header: 'Confirmar exclusão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.pressaoService.deletePressao(item.objectId).subscribe({
              next: () => {
                this.recarregarAba();
                this.toastCtrl.create({
                  message: 'Pressão removida!',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              },
              error: () => {
                this.toastCtrl.create({
                  message: 'Erro ao excluir pressão.',
                  duration: 2000,
                  color: 'danger',
                }).then(t => t.present());
              }
            });
          }
        }
      ]
    });
  
    await confirm.present();
  }
  


  onTabChange(novaAba: string) {
    this.activeTab = novaAba;
    this.recarregarAba();
  }
  
}
