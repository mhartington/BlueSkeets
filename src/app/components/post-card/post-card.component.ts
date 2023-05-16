import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
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
  @Input() set post(_post:PostView){
    console.log('in set post')
    console.log(_post)
      this._post.set(_post);
  };

  private bsk = inject(BskService);
  private rtr = inject(Router);
  private route = inject(ActivatedRoute);

  readonly _post = signal<PostView | null>(null);
  readonly record = computed<any>(() => this._post()?.record)
  readonly embeds = computed<any>(() => this._post()?.embed)


  ngOnInit() {}

  async toggleLike(e:MouseEvent) {
    e.stopPropagation();
    if(!this._post()?.viewer?.like) {
      await this.bsk.agent?.like(this._post()?.uri!, this._post()?.cid!);
    } else {
      await this.bsk.agent?.deleteLike(this._post()?.viewer?.like!)
    }
    await this.updatePost();
  }
  reply() {}
  repost() {}
  async updatePost() {
    const res = await this.bsk.agent?.getPostThread({uri: this._post()?.uri!});
    this.post = res!.data.thread.post as any;
  }

  goToProfile(e: any) {
    e.stopPropagation();
    const root = this.route.snapshot.url[0].path;
    this.rtr.navigate(['app', root, this._post()?.author.handle]);
  }
}
