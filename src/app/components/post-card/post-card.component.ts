import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  computed,
  inject,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import {
  PostView,
  ThreadViewPost,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PostCardComponent {
  @Input() set post(_post: any) {
    this._post.set(_post.post ?? _post);
  }


  private bsk = inject(BskService);
  private rtr = inject(Router);
  private route = inject(ActivatedRoute);

  readonly _post = signal<PostView | null>(null);
  readonly _thread = signal<any>(null);
  readonly record = computed<any>(() => this._post()?.record);
  readonly embeds = computed<any>(() => this._post()?.embed);
  @Output() onPostLoad = new EventEmitter()

  readonly el = inject(ElementRef)
  ngAfterViewInit(){
    setTimeout(() => {
    this.onPostLoad.emit({target: this.el.nativeElement});
    }, 16)
  }
  async toggleLike(e: MouseEvent) {
    e.stopPropagation();
    if (!this._post()?.viewer?.like) {
      await this.bsk.agent?.like(this._post()?.uri!, this._post()?.cid!);
    } else {
      await this.bsk.agent?.deleteLike(this._post()?.viewer?.like!);
    }
    await this.updatePost();
  }
  reply() {}
  repost() {}
  async updatePost() {
    const res = await this.bsk.agent?.getPostThread({
      uri: this._post()?.uri!,
    });
    this.post = res!.data.thread.post as any;
  }
  goToProfile(e: any) {
    e.stopPropagation();
    const root = this.route.snapshot.url[0].path;
    this.rtr.navigate(['app', root, this._post()?.author.handle]);
  }
}
