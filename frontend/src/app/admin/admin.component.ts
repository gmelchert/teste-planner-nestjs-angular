import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: false,
})
export class AdminComponent {
  constructor(public router: Router) { }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
