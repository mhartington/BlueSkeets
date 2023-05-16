import { JsonPipe, NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PostCardComponent } from 'src/app/components/post-card/post-card.component';
import { BskService } from 'src/app/services/bsk/bsk.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule,JsonPipe, NgOptimizedImage, NgIf, PostCardComponent, RouterLink, NgForOf, NgStyle],
})
export class Tab3Page {
  constructor() {}

  private bsk = inject(BskService)
  public route = inject(ActivatedRoute)


  public timeline = signal<any>(null);
  public actor = signal<any>(null);

  async ngOnInit(){
    const {did: handle } = this.route.snapshot.params;
    const did = await this.bsk.agent?.resolveHandle({handle}).then(res => res.data.did)!
    const actor = await this.bsk.agent?.getProfile({actor: did})
    const timeline = await this.bsk.agent?.getAuthorFeed({actor: did});

    this.actor.set(actor?.data);
    this.timeline.set(timeline?.data.feed);
  }

}
