// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private username = '';

  constructor() {}

  setLoggedIn(value: boolean): void {
    this.loggedIn = value;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setUsername(value: string): void {
    this.username = value;
  }

  getUsername(): string {
    return this.username;
  }

  // Simulate fetching user data from local storage
  getUserData() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData;
  }

  // Simulate saving user data to local storage
  saveUserProfile(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}
