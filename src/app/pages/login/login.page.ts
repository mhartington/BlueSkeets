import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BskService } from 'src/app/services/bsk/bsk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  public loginContext= {
    service: '',
    handle: '',
    password: ''
  }
  private bsk = inject(BskService)
  private router = inject(Router)

  async onSubmit(event: any) {
    const res = await this.bsk.login(this.loginContext)
    if(res) {
      this.router.navigateByUrl('/app/home')
    }
  }
}
