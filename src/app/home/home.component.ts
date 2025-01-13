import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Fixed typo from styleUrl to styleUrls
})
export class HomeComponent {
  startPoint: string = '';
  endPoint: string = '';
  places: { [key: string]: string[] } = {
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur'],
    'Uttar Pradesh': ['Agra', 'Varanasi', 'Lucknow', 'Mathura'],
    'Kerala': ['Alleppey', 'Munnar', 'Kochi', 'Varkala'],
    'Maharashtra': ['Mumbai', 'Pune', 'Aurangabad', 'Nashik'],
    'Tamil Nadu': ['Chennai', 'Madurai', 'Kanyakumari', 'Ooty'],
    'Karnataka': ['Bengaluru', 'Mysore', 'Hampi', 'Coorg'],
    'West Bengal': ['Kolkata', 'Darjeeling', 'Sundarbans', 'Shantiniketan'],
    'Gujarat': ['Ahmedabad', 'Kutch', 'Gir National Park', 'Somnath'],
    'Punjab': ['Amritsar', 'Chandigarh', 'Ludhiana', 'Patiala'],
    'Telangana': ['Hyderabad', 'Warangal', 'Ramoji Film City', 'Khammam'],
    'Odisha': ['Bhubaneswar', 'Puri', 'Konark', 'Ganjam'],
    'Andhra Pradesh': ['Visakhapatnam', 'Amaravati', 'Tirupati', 'Kadapa'],
    'Delhi': ['Red Fort', 'Qutub Minar', 'India Gate', 'Humayun\'s Tomb']
  };
  
  filteredPlaces: string[] = [];

  updatePlaces() {
    const locations = Object.keys(this.places);
    const start = this.startPoint.trim().toLowerCase();
    const end = this.endPoint.trim().toLowerCase();
    
    // Clear the filtered places if either input is empty
    if (!start || !end) {
      this.filteredPlaces = [];
      return;
    }
    
    // Filter places based on the entered start and end points
    this.filteredPlaces = locations
      .filter(location => location.toLowerCase().includes(start) || location.toLowerCase().includes(end))
      .flatMap(location => this.places[location]);
  }
}