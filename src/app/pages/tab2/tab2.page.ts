import { JsonPipe, NgForOf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Notification as BskyNotification } from '@atproto/api/dist/client/types/app/bsky/notification/listNotifications';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { Notification} from '../../types/notification';
import { NotificationItemComponent } from "../../components/notification-item/notification-item.component";
@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonicModule, JsonPipe, NgForOf, NotificationItemComponent]
})
export class Tab2Page {
  private bsk = inject(BskService);
  public notifications = signal<BskyNotification[]>([]);

  public notificationGroup = computed<Notification[]>(() => {
    let groups = this.notifications().reduce((p1: any, p2: BskyNotification) => {
      if ((p2.record as any)?.subject?.uri) {
        // @ts-ignore
        const exists = p1.findIndex( (i) => i.reason == p2.reason && i.subjectUri == p2.record.subject.uri);
        if (exists > -1) {
          // @ts-ignore
          p1[exists].datas.push(p2);
          return p1;
        } else {
          const newData = {
            // @ts-ignore
            subjectUri: p2.record.subject.uri,
            reason: p2.reason,
            post: p2['post'] || p2.record,
            datas: [p2],
          };
          return [...p1, newData];
        }
      } else {
        if (p2.reason == 'follow') {
          // @ts-ignore
          const exists = p1.findIndex((i) => i.reason == 'follow');
          if (exists > -1) {
            // @ts-ignore
            p1[exists].datas.push(p2);
            return p1;
          }
        }
        return [
          ...p1,
          {
            subjectUri: p2.uri,
            reason: p2.reason,
            post: p2['post'] || p2.record,
            datas: [p2],
          },
        ];
      }
    }, []);

    if (!groups || groups.length) return groups;

    groups = groups?.filter(
      (i: { subjectUri: any }, index: any) =>
        i.subjectUri &&
        groups.findIndex(
          (p: { subjectUri: any }) =>
            p.subjectUri && p.subjectUri == i.subjectUri
        ) == index
    );
    return groups;
  });

  constructor() {}
  async ngOnInit() {
    const res = await this.bsk.agent?.listNotifications();
    console.log(res?.data.notifications);
    this.fileterNotif(res?.data.notifications!);

    // this.notifications.set(res?.data.notifications);
  }
  async fileterNotif(notifications: BskyNotification[]) {
    const uniqueUris = [
      ...new Set(
        notifications
          .filter(
            (i) =>
              i.reason == 'mention' ||
              i.reason == 'like' ||
              i.reason == 'reply' ||
              i.reason == 'repost'
          )
          .map((i) => (i?.record as any)?.subject?.uri)
          ?.filter((i) => i && typeof i != 'undefined')
      ),
    ];

    if (uniqueUris.length) {
      const chunkSize = 25;
      for (let i = 0; i < uniqueUris.length; i += chunkSize) {
        const chunk = uniqueUris.slice(i, i + chunkSize);

        const result = await this.bsk.agent?.api.app.bsky.feed.getPosts({
          uris: chunk,
        });

        let newNotifs = [...notifications];
        for (let i = 0; i < newNotifs.length; i++) {
          const post = newNotifs[i];
          let notifIndex = result!.data.posts.findIndex(
            (i) => post.reasonSubject == i.uri
          );
          if (notifIndex > -1) {
            // if(post.reason == 'quote')
            // if(post.reason == 'quote')
            newNotifs[i]['post'] = result?.data.posts[notifIndex];
          }
        }
        this.notifications.set(newNotifs);
      }
    } else {
      this.notifications.set(notifications);
    }
  }
}
