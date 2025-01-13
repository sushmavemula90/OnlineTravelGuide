import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  adminUsername: string = '';
  adminPassword: string = '';
  loginMessage: string = '';
  showPassword: boolean = false;


  constructor(private router: Router) {}

  async onLogin() {
    try {
      const response = await axios.post('http://localhost:5300/admin/login', {
        username: this.adminUsername,
        password: this.adminPassword
      });

      if (response.data && response.data.success) {
        this.loginMessage = 'Admin login successful!';
        setTimeout(() => this.router.navigate(['/admin-dashboard']), 1000); 
      } else {
        this.loginMessage = 'Invalid username or password';
      }
    } catch (error: any) { // Added any type to error
      if (error.response) {
        console.error('Server error:', error.response.data);
        this.loginMessage = 'Server error. Please try again.';
      } else if (error.request) {
        console.error('Network error:', error.message);
        this.loginMessage = 'Network error. Please ensure the server is running.';
      } else {
        console.error('Error:', error.message);
        this.loginMessage = 'Login error. Please try again.';
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}