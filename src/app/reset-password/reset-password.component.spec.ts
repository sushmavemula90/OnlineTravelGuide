import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  token: string | null = null;
  newPassword: string = '';

  constructor(private route: ActivatedRoute) {
    // Get the token from the URL
    this.token = this.route.snapshot.paramMap.get('token');
  }

  // Submit new password
  onResetPasswordSubmit() {
    if (!this.newPassword) {
      alert('Please enter a new password.');
      return;
    }

    fetch(`http://localhost:5200/api/reset-password/${this.token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: this.newPassword }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to reset password. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || 'Password has been reset successfully!');
        // Redirect to login page or wherever you need
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}
