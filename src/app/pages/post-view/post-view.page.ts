import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { ActivatedRoute } from '@angular/router';
import { PostCardComponent } from "../../components/post-card/post-card.component";

@Component({
    selector: 'app-post-view',
    templateUrl: './post-view.page.html',
    styleUrls: ['./post-view.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, PostCardComponent]
})
export class PostViewPage implements OnInit {

  private bsk = inject(BskService)
  private route = inject(ActivatedRoute)

  public mainPost = signal<any>(null);

  async ngOnInit() {
    const {did: handle, uri: uriFromParams } = this.route.snapshot.params;
    const did = await this.bsk.agent?.resolveHandle({handle}).then(res => res.data.did)
    const uri  = `at://${did}/app.bsky.feed.post/${uriFromParams}`;
    const res = await this.bsk.agent?.getPostThread({uri});
    this.mainPost.set(res?.data.thread.post);


  }

}
