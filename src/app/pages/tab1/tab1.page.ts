import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { RouterLink } from '@angular/router';
import { ComposeModalComponent } from "../../components/compose-modal/compose-modal.component";
import { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    imports: [IonicModule, JsonPipe, NgFor, NgIf, PostCardComponent, RouterLink, ComposeModalComponent]
})
export class Tab1Page {
  public feed = signal<any[]>([]);
  private bsk = inject(BskService)
  public actor = signal<ProfileViewDetailed | undefined>(undefined)
  constructor() {}
  async ngOnInit(){
    const res = await this.bsk.getTimeLine();
    if(res){
      this.feed.set(res);
    }

    const did = await this.bsk.agent?.resolveHandle({handle: this.bsk.handle!}).then(res => res.data.did)!
    const actorData = await this.bsk.agent?.getProfile({actor: did})
    this.actor.set(actorData?.data)
  }
}
