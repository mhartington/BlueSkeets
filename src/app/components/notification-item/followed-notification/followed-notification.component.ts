import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Notification } from 'src/app/types/notification';

@Component({
  selector: 'followed-notification',
  templateUrl: './followed-notification.component.html',
  styleUrls: ['./followed-notification.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FollowedNotificationComponent  implements OnInit {
  @Input() data!: Notification
  @Input() textPrefix: string = ''
  constructor() { }

  ngOnInit() {}

}
