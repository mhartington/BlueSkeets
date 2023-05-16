import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Notification } from 'src/app/types/notification';

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  standalone: true,
  imports: [IonicModule, JsonPipe, NgIf, NgForOf ]
})
export class NotificationItemComponent  implements OnInit {
  @Input() set notification(val: Notification){
    this._notification.set(val)
  }
  readonly _notification = signal<Notification | null>(null)
  readonly displayName = computed(() => {

    if (this._notification()!.datas.length && this._notification()!.datas.length - 1 > 0) {
      // @ts-ignore
      return `${
        this._notification()?.datas[0]?.author.displayName ||
        this._notification()?.datas[0]?.author.handle
      }${
        ', ' +
        this._notification()?.datas
          .slice(1, Math.min(3, this._notification()!.datas.length))
          .map((notif) => notif.author.displayName || '@' + notif.author.handle)
          .join(',')
      } and ${
        this._notification()!.datas.length > 3
          ? this._notification()!.datas.length - 3
          : this._notification()!.datas.length - 1
      } others`;
    } else {
      return (
        this._notification()!.datas[0]?.author.displayName ||
        this._notification()!.datas[0]?.author.handle
      );
    }
  })
  ngOnInit() {}

}
