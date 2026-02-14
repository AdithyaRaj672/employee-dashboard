import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  login(): void {
    // DEMO ONLY: Simple authentication for demonstration purposes
    // In production, this should validate against a secure backend
    // Accept any non-empty username/password for demo
    if (this.username && this.password) {
      // Store auth token in localStorage
      localStorage.setItem('auth_token', 'demo-token-' + Date.now());
      localStorage.setItem('username', this.username);
      
      // Navigate to employees page
      this.router.navigate(['/employees']);
    } else {
      this.errorMessage = 'Please enter both username and password';
    }
  }

  continueAsGuest(): void {
    // Allow guest access without authentication
    this.router.navigate(['/home']);
  }
}
