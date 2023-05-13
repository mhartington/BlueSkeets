import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
@Component({
  selector: 'user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class UserInfoCardComponent implements OnInit {
  private bsk = inject(BskService);
  @Input() handle: string = '';

  public actor = signal<ProfileViewDetailed | null>(null);
  async ngOnInit() {
    try {
      const res = await this.bsk.agent?.getProfile({ actor: this.handle });
      if (res?.success) {
        this.actor.set(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
