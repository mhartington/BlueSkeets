import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    imports: [IonicModule, JsonPipe, NgFor, NgIf, PostCardComponent, RouterLink]
})
export class Tab1Page {
  public feed = signal<any[]>([]);
  private bsk = inject(BskService)
  constructor() {}
  async ngOnInit(){
    const res = await this.bsk.getTimeLine();
    if(res){
      this.feed.set(res);
    }
  }
  format(i: number, m: number) {
    return m - i;
  }
}
