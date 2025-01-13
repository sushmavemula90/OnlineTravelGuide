import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agent-reg',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agent-reg.component.html',
  styleUrls: ['./agent-reg.component.css']
})
export class AgentRegComponent {
  name: string = '';
  email: string = '';
  address: string = '';
  education: string = '';
  referenceName: string = '';
  comments: string = '';  // New comments field
  confirmation: boolean = false;

  constructor() {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.confirmation) {
      alert('Please confirm the information accuracy.');
      return;
    }

    const formData = {
      name: this.name,
      email: this.email,
      address: this.address,
      education: this.education,
      referenceName: this.referenceName,
      comments: this.comments,
      confirmation: this.confirmation
    };

    fetch('http://localhost:5300/api/agent-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        this.resetForm();
      } else {
        alert('Registration failed: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Registration failed.');
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.address = '';
    this.education = '';
    this.referenceName = '';
    this.comments = '';
    this.confirmation = false;
  }
}