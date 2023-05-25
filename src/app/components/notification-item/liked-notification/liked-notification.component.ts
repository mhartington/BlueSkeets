import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Notification } from 'src/app/types/notification';

@Component({
  selector: 'liked-notification',
  templateUrl: './liked-notification.component.html',
  styleUrls: ['./liked-notification.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class LikedNotificationComponent  implements OnInit {
  @Input() data!: Notification
  @Input() textPrefix: string = ''
  constructor() { }

  ngOnInit() {}

}
