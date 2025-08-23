import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'] // <-- debe ser styleUrls en plural
})
export class Navbar {
  constructor(private router: Router) {}
  isLoggedIn() { return !!localStorage.getItem('token'); }
  logout() { localStorage.clear(); this.router.navigateByUrl('/'); }
}