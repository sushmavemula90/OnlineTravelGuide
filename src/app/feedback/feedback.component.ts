import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackData = {
    visitorName: '',
    email: '',
    phone: '',
    destination: '',
    agentName: '',
    visitedDatesFrom: '',
    visitedDatesTo: '',
    rating: '',
    planningTrip: '',           // Room Services rating
    exploration: '',
    wellBehaved: '',             // Food and Dining rating
    professionallyLooking: '',   // Transportation rating
    enjoyedTrip: '',
    areasToImprove: '',
    suggestions: ''
  };

  constructor(private http: HttpClient) {}

  // Form submission handler
  submitFeedback() {
    const emailPattern = /^[a-zA-Z][a-zA-Z0-9]*\d+@gmail\.com$/;
    if (!emailPattern.test(this.feedbackData.email)) {
      alert("Email must start with letters, contain numbers, and end with '@gmail.com'.");
      return;
    }

    this.http.post('http://localhost:5300/api/feedback', this.feedbackData)
      .subscribe({
        next: () => {
          alert('Feedback submitted successfully!');
          // Reset feedback data after successful submission
          this.resetForm();
        },
        error: (error) => alert(error.error.message || 'Error submitting feedback'),
      });
  }

  resetForm() {
    this.feedbackData = {
      visitorName: '',
      email: '',
      phone: '',
      destination: '',
      agentName: '',
      visitedDatesFrom: '',
      visitedDatesTo: '',
      rating: '',
      planningTrip: '',
      exploration: '',
      wellBehaved: '',
      professionallyLooking: '',
      enjoyedTrip: '',
      areasToImprove: '',
      suggestions: ''
    };
  }
}