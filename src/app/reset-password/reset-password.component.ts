import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  newPassword: string = '';
  message: string = '';
  showPassword: boolean = false; // To track password visibility

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('ResetPasswordComponent initialized');
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.message = 'Invalid token.';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggle visibility state
  }

  resetPassword() {
    if (this.token) {
      // Validate password with regex
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
      
      if (!passwordRegex.test(this.newPassword)) {
        alert('Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters.');
        return;
      }

      // Call the API to reset the password
      axios.post(`http://localhost:5300/api/reset-password/${this.token}`, { newPassword: this.newPassword })
        .then(response => {
          this.message = 'Password reset successfully!'; // Set the success message
          alert(this.message);
          this.router.navigate(['/home']); // Redirect to home page after resetting password
        })
        .catch(error => {
          alert('Error resetting password: ' + error.response.data.message);
        });
    }
  }
}
