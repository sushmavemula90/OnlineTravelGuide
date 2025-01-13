import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,RouterLink,RouterOutlet],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordEmail = '';
  loading = false;

  constructor(private router: Router) {}

  // Submit Forgot Password request
  onForgotPasswordSubmit() {
    if (!this.forgotPasswordEmail) {
      alert('Please enter your email address.');
      return;
    }
    this.loading = true;

    fetch('http://localhost:5300/api/forgotpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.forgotPasswordEmail }),
    })
    .then((response) => {
      this.loading = false;
      if (!response.ok) {
        throw new Error('User must be registered.');
      }
      alert('Password reset email sent! Please check your inbox.');
      this.router.navigate(['/']);
    })
    .catch((error) => {
      this.loading = false;
      alert(error.message);
    });
  }
}
