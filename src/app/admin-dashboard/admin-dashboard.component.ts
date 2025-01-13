import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  fullName: string;
  phone: string;
  email: string;
  password?: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  editUser: any = null;
  showNewUserForm: boolean = false;
  newUser: User = { username: '', fullName: '', phone: '', email: '', password: '' };
  showPassword: boolean = false;

  // Email and password patterns
  emailPattern = /^[A-Za-z][A-Za-z0-9]*@gmail\.com$/;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      // Check if the API endpoint is working and returns the data correctly.
      const response = await axios.get('http://localhost:5300/api/users');
      if (response.data && Array.isArray(response.data)) {
        this.users = response.data;
      } else {
        console.error('Fetched data is not in the expected format');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  toggleNewUserForm() {
    this.showNewUserForm = !this.showNewUserForm;
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isNewUserValid(): boolean {
    return (
      this.emailPattern.test(this.newUser.email ?? '') &&
      this.passwordPattern.test(this.newUser.password ?? '')
    );
  }

  isEditUserValid(): boolean {
    return (
      this.editUser &&
      this.emailPattern.test(this.editUser.email ?? '') &&
      this.passwordPattern.test(this.editUser.password ?? '')
    );
  }

  async saveNewUser() {
    if (this.isNewUserValid()) {
      try {
        await axios.post('http://localhost:5300/api/users', this.newUser);
        this.fetchUsers();
        this.showNewUserForm = false;
        this.newUser = { username: '', fullName: '', phone: '', email: '', password: '' };
      } catch (error) {
        console.error('Error saving new user:', error);
      }
    }
  }

  editUserDetails(user: User) {
    this.editUser = { ...user, originalUsername: user.username};  // Ensure correct mapping
  }

  async saveUser() {
    if (this.editUser && this.isEditUserValid()) {
      try {
        await axios.put(`http://localhost:5300/api/users/${this.editUser.originalUsername}`, this.editUser);
        this.fetchUsers();
        this.editUser = null;
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }

  cancelEdit() {
    this.editUser = null;
  }

  async deleteUser(username: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5300/api/users/${username}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }
}
