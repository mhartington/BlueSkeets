import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { Notification } from 'src/app/types/notification';

@Component({
  selector: 'replied-notification',
  templateUrl: './replied-notification.component.html',
  styleUrls: ['./replied-notification.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class RepliedNotificationComponent implements OnInit {
  @Input() data!: Notification;
  @Input() textPrefix: string = '';
  private bsk = inject(BskService);

  public embeds = signal<any>(null);
  public post = signal<any>(null);
  async ngOnInit() {
    const res = await this.bsk.agent?.getPostThread({
      uri: this.data.datas[0].uri,
      depth: 0,
    });
    this.post.set(this.data.datas[0]);
    this.embeds.set((res?.data.thread.post as any).embed)
  }
}
