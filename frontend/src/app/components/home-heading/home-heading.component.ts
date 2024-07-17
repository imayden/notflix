import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-heading',
  templateUrl: './home-heading.component.html',
  styleUrl: './home-heading.component.scss'
})
export class HomeHeadingComponent {
  constructor(public authService: AuthService){}

  logout() {
    this.authService.logout();
  }
}
