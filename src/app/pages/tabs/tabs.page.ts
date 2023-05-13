import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { UserInfoCardComponent } from '../../components/user-info-card/user-info-card.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, UserInfoCardComponent],
})
export class TabsPage {
  public handle = inject(BskService).handle!;
}
