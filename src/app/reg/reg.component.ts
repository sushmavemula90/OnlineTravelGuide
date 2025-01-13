import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet, HomeComponent],
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
})
export class RegComponent {
  showPassword: boolean = false; // For toggling password visibility
  showConfirmPassword: boolean = false; // For toggling confirm password visibility
  fullname: string = '';
  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  otp: string = '';
  isOtpSent:boolean = false; 
  isOtpValidated: boolean = false;
  otpAttempted: boolean = false;
  isChecked = false;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Phone number validation can also be implemented here
  validatePhoneNumber(): boolean {
    return this.phone.length === 10;
  }

  // Send OTP request
  sendOTP() {
    this.isOtpSent = true;
    this.otpAttempted = false;
    fetch('http://localhost:5300/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message || 'Error sending OTP');
    })
    .catch(error => console.error('Error:', error));
  }

  // Validate OTP
  validateOtp(): void {
    console.log(`Email: ${this.email}, OTP: ${this.otp}`);
    fetch('http://localhost:5300/api/validate-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email, otp: this.otp })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the response data
        // Check for message in the response
        if (data.message === 'OTP is valid') {
            this.isOtpValidated = true;
            alert('OTP validated!');
            this.isChecked = false;
        } else {
            alert('Invalid OTP');
        }
    })
    .catch(error => console.error('Error validating OTP:', error));
  }

  // Form submission handler
  onSubmit(): void {
    if (!this.isOtpValidated) {
      this.errorMessage = 'Please validate OTP before submitting the form.';
      return;
    }

    const emailPattern = /^[a-zA-Z][a-zA-Z0-9]*\d+@gmail\.com$/;
    if (!emailPattern.test(this.email)) {
      alert("Email must start with letters, contain numbers, and end with '@gmail.com'.");
      return;
    }
    if (!this.validatePhoneNumber()) {
      this.errorMessage = 'Phone number must be exactly 10 digits.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Send the data to the server using fetch
    fetch('http://localhost:5300/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: this.fullname,
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        this.successMessage = data.message;
        alert(data.message); // Optional: show success alert
        this.router.navigate(['/login']); // Optional: navigate to login after success
      } else {
        this.errorMessage = "Registration failed.";
      }
      this.resetForm();
    })
    .catch(error => {
      console.error('Error:', error);
      this.errorMessage = 'Registration failed!';
    });
  }

  // Reset form fields
  resetForm() {
    this.fullname = '';
    this.username = '';
    this.email = '';
    this.otp = '';
    this.phone = '';
    this.password = '';
    this.confirmPassword = '';
    this.isOtpValidated = false;
    this.errorMessage = '';
  }
}
