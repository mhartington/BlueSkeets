import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import {
  PostView,
  ReasonRepost,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PostCardComponent implements OnInit {
  @Input() post!: PostView;
  record: any = null;

  private bsk = inject(BskService);
  private rtr = inject(Router)
  private route = inject(ActivatedRoute)
  embeds: any;
  ngOnInit() {
    this.record = this.post.record as any;
    this.embeds = this.post.embed as any;
  }

  async like() {
    // console.log(this.bsk.agent?.app.bsky.feed.like.create)
    const res = await this.bsk.agent?.like(this.post.uri, this.post.cid);
    console.log(res);
  }
  reply() {}
  repost() {}

  goToProfile(e: any) {
    e.stopPropagation();
    console.log(this.post.author.handle)
    // this.
    this.rtr.navigate([this.post.author.handle], {relativeTo: this.route})
    // throw new Error('Method not implemented.');
  }
}
