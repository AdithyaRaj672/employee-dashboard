import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  loginTime = '';
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    this.isLoggedIn = !!localStorage.getItem('auth_token');

    const token = localStorage.getItem('auth_token') || '';
    const timestamp = token.replace('demo-token-', '');
    if (timestamp && !isNaN(Number(timestamp))) {
      this.loginTime = new Date(Number(timestamp)).toLocaleString();
    } else {
      this.loginTime = 'N/A';
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
