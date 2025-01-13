import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string = '';
  fullName: string = '';
  email: string = '';
  phone: string = '';
  isEditing: boolean = false;
  originalUsername: string = ''; // Track original username for reference

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.originalUsername = this.username; // Store the original username
    this.fetchUserData();
  }

  fetchUserData(): void {
    fetch(`http://localhost:5300/api/users/${this.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch user data');
        return response.json();
      })
      .then(data => {
        this.username = data.username;
        this.fullName = data.fullName;
        this.email = data.email;
        this.phone = data.phone;
      })
      .catch(error => console.error(error));
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    const updatedUserData = {
      username: this.username,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
    };

    fetch(`http://localhost:5300/api/users/${this.originalUsername}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to save user data');
        return response.json();
      })
      .then(() => {
        alert('Profile updated successfully!');
        this.originalUsername = this.username; // Update reference to new username
        this.isEditing = false;
      })
      .catch(error => {
        console.error(error);
        alert('Error updating profile: ' + error.message);
      });
  }
}
