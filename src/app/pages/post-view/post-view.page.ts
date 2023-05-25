import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { ActivatedRoute } from '@angular/router';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.page.html',
  styleUrls: ['./post-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PostCardComponent],
})
export class PostViewPage implements OnInit {
  private bsk = inject(BskService);
  private route = inject(ActivatedRoute);
  public postThread = signal<any>(null);

  public mainPost = computed(() => this.postThread()?.post);
  public replis = computed(() => {
    const repliesToGen: any[] = [];
    const generateReplies = (obj: any) => {
      if (obj.replies.length !== 0) {
        repliesToGen.push(obj.post);
        if (obj.replies.length !== 0) {
          generateReplies(obj.replies[0]);
        }
      }
    };
    if (this.postThread() && 'replies' in this.postThread()) {
      generateReplies(this.postThread()?.replies[0]);
    }
    return repliesToGen;
  });
  public parents = computed(() => {
    const parentsToGen: any[] = [];
    const generateParentPost = (obj: any) => {
      if (obj.parent) {
        parentsToGen.push(obj.post);
        generateParentPost(obj.parent);
      }
    };
    if (this.postThread() && 'parent' in this.postThread()) {
      generateParentPost(this.postThread()?.parent);
    }
    return parentsToGen.reverse();
  });

  @ViewChild(IonContent) content: IonContent | null = null;

  scrollInToView(event: any){
    this.content?.scrollToPoint(0, event.target.offsetTop);
  }
  async ngOnInit() {
    const { did: handle, uri: uriFromParams } = this.route.snapshot.params;
    const did = await this.bsk.agent
      ?.resolveHandle({ handle })
      .then((res) => res.data.did);
    const uri = `at://${did}/app.bsky.feed.post/${uriFromParams}`;
    const res = await this.bsk.agent?.getPostThread({ uri });
    const postThread = res?.data.thread;
    this.postThread.set(postThread);
  }
}
