import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class BookingsComponent {
  userName: string = '';
  bookingDetails: any[] = []; // Array for handling multiple bookings
  remainingDays: number[] = []; // Array to track remaining days for each booking
  isSubmitted: boolean = false;
  
  // Make this function async as it uses 'await'
  async fetchBookingDetails() {
    this.isSubmitted = true; 

    // Check if userName is empty
    if (!this.userName.trim()) {
      alert('Please enter the username.');
      return; // Exit function if no username is provided
    }

    try {
      // Reset state for fresh data
      this.bookingDetails = [];
      this.remainingDays = [];  // Reset remainingDays as well

      console.log(`Attempting to fetch bookings for username: ${this.userName}`);

      // Fetch booking details by username
      const response = await axios.get(`http://localhost:5300/api/bookings/${this.userName}`);
      this.bookingDetails = response.data;

      if (this.bookingDetails.length > 0) {
        console.log('Bookings fetched successfully:', this.bookingDetails);
        this.calculateRemainingDays();
      } else {
        alert('No bookings found for this username.');
      }
    } catch (error: any) { // Added ': any' to typecast 'error' to any
      console.error('Error details:', error);
      
      // Display specific error message based on the error response
      if (error.response) {
        console.error('Response error:', error.response.data);
        alert(`Error: ${error.response.data.error || 'An error occurred while fetching bookings.'}`);
      } else if (error.request) {
        console.error('Request error:', error.request);
        alert('Error: No response from server. Please check if the backend is running.');
      } else {
        console.error('General error:', (error as Error).message); // Type assertion for 'message' property
        alert('Error: An unexpected error occurred while fetching bookings.');
      }
    }
  }

  // Calculate remaining days for each booking and store them in an array
  calculateRemainingDays() {
    this.remainingDays = this.bookingDetails.map(booking => {
      const checkinDate = new Date(booking.checkin);
      const today = new Date();
      const diffInMs = checkinDate.getTime() - today.getTime();
      return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    });
  }

  // Delete a booking based on userName, place, and checkin
  async deleteBooking(booking: any) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        // Send DELETE request with necessary fields (userName, place, and checkin)
        const response = await axios.delete('http://localhost:5300/api/bookings', {
          headers: {
            'Content-Type': 'application/json', // Ensure the content type is correct
          },
          data: {
            userName: booking.userName,
            place: booking.place,
            checkin: booking.checkin
          }
        });

        if (response.status === 200) {
          alert('Booking cancelled successfully!');

          // Remove the booking from the local array
          this.bookingDetails = this.bookingDetails.filter(
            (b: any) => !(b.userName === booking.userName && b.place === booking.place && b.checkin === booking.checkin)
          );
          this.remainingDays = this.remainingDays.filter(
            (_, index) => !(this.bookingDetails[index]?.userName === booking.userName &&
                            this.bookingDetails[index]?.place === booking.place &&
                            this.bookingDetails[index]?.checkin === booking.checkin)
          );
        } else {
          alert('Error: Unable to cancel the booking.');
        }
      } catch (error: any) {
        console.error('Error while deleting booking:', error);
        alert('An unexpected error occurred while trying to cancel the booking.');
      }
    }
  }
}
