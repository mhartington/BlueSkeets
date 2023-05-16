import { Component, inject } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  private swUpdate = inject(SwUpdate);
  private toastCtrl = inject(ToastController);
  private metaService = inject(Meta);

  constructor(){
    const prefersDark = matchMedia('(prefers-color-scheme: dark)');
    this.setMetaTheme();
    // this.setupListener();
    prefersDark.addEventListener('change', () => this.setMetaTheme());
  }
  setMetaTheme() {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--ion-background-color')
      .replace(/\s+/g, '');

    this.metaService.updateTag({ content: color, name: 'theme-color' });
  }
  async ngOnInit() {
    const hasUpdate = await this.swUpdate.checkForUpdate();
    if (hasUpdate) {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            text: 'Reload',
            role: 'cancel',
          },
        ],
      });
      await toast.present();
      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => globalThis.location.reload());
    }
  }
}
