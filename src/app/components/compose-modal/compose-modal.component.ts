import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';

@Component({
  selector: 'compose-modal',
  templateUrl: './compose-modal.component.html',
  styleUrls: ['./compose-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ComposeModalComponent {
  private modalCtrl = inject(ModalController)
  private bsk = inject(BskService);

  pending = signal(false);
  postContent = '';


  format(i: number, m: number) {
    return m - i;
  }
  async close(){
    await this.modalCtrl.dismiss()
  }

  async post(){
    this.pending.set(true);
    await this.bsk.post({text: this.postContent})
    await this.modalCtrl.dismiss();
  }
}
