import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
})
export class AccommodationComponent implements OnInit {
  states: string[] = ['Rajasthan', 'Uttar Pradesh', 'Kerala', 'Maharashtra', 
    'Tamil Nadu', 'Karnataka', 'West Bengal', 'Gujarat', 
    'Punjab', 'Telangana', 'Odisha', 'Andhra Pradesh', 'Delhi'];
  selectedState: string = '';
  accommodationData = {
    userName: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    place: '',
    accommodationType: '',
    priceRange: '',
    checkin: '',
    checkout: '',
    persons: 1,
    roomType: '',
    payment: '',
    additionalServices: [] as string[],
    specialNeeds: false,
    hotelName: '',
    hotelAddress: '',
    agentName: '',
    agentId: ''
  };
  
  locationPlacesMap: { [key: string]: string[] } = {
    'Rajasthan': ['Jaipur', 'Udaipur','Jaisalmer', 'Jodhpur'],
    'Uttar Pradesh': ['Agra', 'Varanasi', 'Lucknow', 'Mathura'],
    'Kerala': ['Alleppey', 'Munnar', 'Kochi', 'Varkala'],
    'Maharashtra': ['Mumbai', 'Pune', 'Aurangabad', 'Nashik'],
    'Tamil Nadu': ['Chennai', 'Madurai', 'Kanyakumari', 'Ooty'],
    'Karnataka': ['Bengaluru', 'Mysore', 'Hampi', 'Coorg'],
    'West Bengal': ['Kolkata', 'Darjeeling', 'Sundarbans', 'Shantiniketan'],
    'Gujarat': ['Ahmedabad', 'Kutch', 'Gir National Park','Somnath'],
    'Punjab': ['Amritsar', 'Chandigarh', 'Ludhiana', 'Patiala'],
    'Telangana': ['Hyderabad', 'Warangal', 'Ramoji Film City', 'Khammam'],
    'Odisha': ['Bhubaneswar', 'Puri', 'Konark', 'Ganjam'],
    'Andhra Pradesh': ['Visakhapatnam', 'Amaravati', 'Tirupati', 'Kadapa'],
    'Delhi': ['Red Fort', 'Qutub Minar', 'India Gate', 'Humayuns Tomb']
  };

  hotelData: {
    [key: string]: { 
      name: string;
      address: string;
      agentName: string;
      agentId: string;
    };
  } = {
// Rajasthan
Jaipur: { name: 'Jaipur Palace', address: 'Pink City, Jaipur', agentName: 'Ravi Sharma', agentId: 'AGT1001' },
Udaipur: { name: 'Lake View Hotel', address: 'Lake Pichola, Udaipur', agentName: 'Anita Patel', agentId: 'AGT1002' },
Jaisalmer: { name: 'Desert Inn', address: 'Fort Road, Jaisalmer', agentName: 'Amit Verma', agentId: 'AGT1003' },
Jodhpur: { name: 'Blue City Stay', address: 'Clock Tower, Jodhpur', agentName: 'Priya Mehta', agentId: 'AGT1004' },

// Uttar Pradesh
Agra: { name: 'Taj View', address: 'Taj Mahal Road, Agra', agentName: 'Neha Singh', agentId: 'AGT1005' },
Varanasi: { name: 'Ganga Residency', address: 'Dashashwamedh Ghat, Varanasi', agentName: 'Rahul Tripathi', agentId: 'AGT1006' },
Lucknow: { name: 'Nawab’s Retreat', address: 'Hazratganj, Lucknow', agentName: 'Kajal Gupta', agentId: 'AGT1007' },
Mathura: { name: 'Krishna Comfort', address: 'Janmabhoomi Road, Mathura', agentName: 'Vikram Yadav', agentId: 'AGT1008' },

// Kerala
Alleppey: { name: 'Backwater Retreat', address: 'Punnamada, Alleppey', agentName: 'Sreelatha Nair', agentId: 'AGT1009' },
Munnar: { name: 'Tea Garden Stay', address: 'Chithirapuram, Munnar', agentName: 'Arjun Reddy', agentId: 'AGT1010' },
Kochi: { name: 'Cochin Gateway', address: 'Marine Drive, Kochi', agentName: 'Anjali Iyer', agentId: 'AGT1011' },
Varkala: { name: 'Cliff Side Inn', address: 'Cliff Road, Varkala', agentName: 'Sandeep Kumar', agentId: 'AGT1012' },

// Maharashtra
Mumbai: { name: 'Mumbai Stay', address: 'Juhu Beach, Mumbai', agentName: 'Nisha Joshi', agentId: 'AGT1013' },
Pune: { name: 'Pune Comfort', address: 'FC Road, Pune', agentName: 'Amitabh Deshmukh', agentId: 'AGT1014' },
Aurangabad: { name: 'Ellora Residency', address: 'Ajanta & Ellora Caves, Aurangabad', agentName: 'Sonal Jadhav', agentId: 'AGT1015' },
Nashik: { name: 'Nashik Vineyard', address: 'Sula Vineyards, Nashik', agentName: 'Vishal Patil', agentId: 'AGT1016' },

// Tamil Nadu
Chennai: { name: 'Chennai Plaza', address: 'Marina Beach, Chennai', agentName: 'Lakshmi Raghavan', agentId: 'AGT1017' },
Madurai: { name: 'Meenakshi Stay', address: 'Temple Road, Madurai', agentName: 'Kumaravel Subramanian', agentId: 'AGT1018' },
Kanyakumari: { name: 'Cape Residency', address: 'Sunset Point, Kanyakumari', agentName: 'Aishwarya Nair', agentId: 'AGT1019' },
Ooty: { name: 'Hilltop Inn', address: 'Doddabetta Road, Ooty', agentName: 'Dinesh Kumar', agentId: 'AGT1020' },

// Karnataka
Bengaluru: { name: 'Bangalore Residency', address: 'MG Road, Bengaluru', agentName: 'Pooja Shetty', agentId: 'AGT1021' },
Mysore: { name: 'Mysore Comfort', address: 'Palace Road, Mysore', agentName: 'Suresh Rao', agentId: 'AGT1022' },
Hampi: { name: 'Hampi Heritage', address: 'Near Virupaksha Temple, Hampi', agentName: 'Vijay Prasad', agentId: 'AGT1023' },
Coorg: { name: 'Coorg Bliss', address: 'Madikeri, Coorg', agentName: 'Deepak Kumar', agentId: 'AGT1024' },

// West Bengal
Kolkata: { name: 'Kolkata Heights', address: 'Park Street, Kolkata', agentName: 'Sneha Banerjee', agentId: 'AGT1025' },
Darjeeling: { name: 'Mountain View', address: 'Mall Road, Darjeeling', agentName: 'Rohit Das', agentId: 'AGT1026' },
Sundarbans: { name: 'Sundarbans Retreat', address: 'National Park, Sundarbans', agentName: 'Tanya Mukherjee', agentId: 'AGT1027' },
Shantiniketan: { name: 'Heritage Stay', address: 'Visva Bharati, Shantiniketan', agentName: 'Debjani Chatterjee', agentId: 'AGT1028' },

// Gujarat
Ahmedabad: { name: 'Ahmedabad Inn', address: 'Sabarmati Ashram, Ahmedabad', agentName: 'Parul Desai', agentId: 'AGT1029' },
Kutch: { name: 'White Desert Resort', address: 'Rann of Kutch, Kutch', agentName: 'Kiran Mehta', agentId: 'AGT1030' },
'Gir National Park': { name: 'Lion’s Den', address: 'Gir Forest, Gir National Park', agentName: 'Ravi Bhatt', agentId: 'AGT1031' },
Somnath: { name: 'Somnath Seaside', address: 'Temple Rd, Somnath', agentName: 'Ankur Patel', agentId: 'AGT1032' },

// Punjab
Amritsar: { name: 'Golden Stay', address: 'Golden Temple Rd, Amritsar', agentName: 'Simran Kaur', agentId: 'AGT1033' },
Chandigarh: { name: 'Chandigarh Garden View', address: 'Sector 17, Chandigarh', agentName: 'Gurpreet Singh', agentId: 'AGT1034' },
Ludhiana: { name: 'Ludhiana Residency', address: 'Clock Tower Rd, Ludhiana', agentName: 'Neha Bansal', agentId: 'AGT1035' },
Patiala: { name: 'Royal Heritage', address: 'Qila Mubarak Rd, Patiala', agentName: 'Rajeev Chopra', agentId: 'AGT1036' },

// Telangana
Hyderabad: { name: 'Hyderabad Haveli', address: 'Charminar, Hyderabad', agentName: 'Sunil Reddy', agentId: 'AGT1037' },
Warangal: { name: 'Kakatiya Inn', address: 'Fort Rd, Warangal', agentName: 'Anjali Reddy', agentId: 'AGT1038' },
'Ramoji Film City': { name: 'Film City Stay', address: 'Ramoji Film City, Hyderabad', agentName: 'Deepika Nair', agentId: 'AGT1039' },
Khammam: { name: 'Khammam Comfort', address: 'Lakaram Lake, Khammam', agentName: 'Vinay Kumar', agentId: 'AGT1040' },

// Odisha
Bhubaneswar: { name: 'Bhubaneswar Heritage', address: 'Lingaraj Temple Rd, Bhubaneswar', agentName: 'Mamata Behera', agentId: 'AGT1041' },
Puri: { name: 'Puri Beachside', address: 'Swargadwar Beach Rd, Puri', agentName: 'Satyajit Mishra', agentId: 'AGT1042' },
Konark: { name: 'Sun Temple Retreat', address: 'Sun Temple Rd, Konark', agentName: 'Sukanya Patnaik', agentId: 'AGT1043' },
Ganjam: { name: 'Ganjam Getaway', address: 'Chilika Lake, Ganjam', agentName: 'Arvind Nayak', agentId: 'AGT1044' },

// Andhra Pradesh
Visakhapatnam: { name: 'Hotel Visakha', address: 'Beach Road, Visakhapatnam', agentName: 'Haritha Reddy', agentId: 'AGT1045' },
Amaravati: { name: 'Capital Stay', address: 'Amaravati Stupa, Amaravati', agentName: 'Kiran Kumar', agentId: 'AGT1046' },
Tirupati: { name: 'Temple Heights', address: 'Tirumala, Tirupati', agentName: 'Sandeep Naidu', agentId: 'AGT1047' },
Kadapa: { name: 'Kadapa Comfort', address: 'City Center, Kadapa', agentName: 'Bhavya Rao', agentId: 'AGT1048' },

// Delhi
'Red Fort': { name: 'Heritage Red', address: 'Lal Qila, Delhi', agentName: 'Anjali Kapoor', agentId: 'AGT1049' },
'Qutub Minar': { name: 'Qutub Residency', address: 'Qutub Complex Rd, Delhi', agentName: 'Rajesh Sethi', agentId: 'AGT1050' },
'India Gate': { name: 'Patriot’s Stay', address: 'India Gate Rd, Delhi', agentName: 'Pooja Saini', agentId: 'AGT1051' },
'Humayuns Tomb': { name: 'Mughal Residency', address: 'Nizamuddin, Delhi', agentName: 'Rakesh Chawla', agentId: 'AGT1052' },
  };
  places: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Initialization logic if needed
  }
  
  // Verify user method
async verifyUser(): Promise<void> {
  const username = this.accommodationData.userName;

  try {
    // Fetch users.json directly from server
    const response = await fetch('http://localhost:5300/users.json');
    if (!response.ok) throw new Error('Failed to fetch users data');
    
    const users = await response.json();
    // Adjusted property to match the JSON structure: "username"
    const userExists = users.some((user: any) => user.username === username);

    if (userExists) {
      // If user exists, proceed with saving the data
      await this.saveData();
    } else {
      // If user does not exist
      
      this.router.navigate(['/reg']);
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    alert('Error verifying user. Please try again.');
  }
}

// Save data method, called only if user verification succeeds
async saveData(): Promise<void> {
  try {
    const saveResponse = await fetch('/api/accommodations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.accommodationData)
    });

    if (saveResponse.ok) {
      
    } else {
      throw new Error('Failed to save accommodation data');
    }
  } catch (error) {
    console.error('Error saving data:', error);
    alert('Error saving accommodation data. Please try again.');
  }
}



  // Method to update places based on selected location
  updatePlaces() {
    this.places = this.locationPlacesMap[this.accommodationData.location] || [];
    this.accommodationData.hotelName = '';
    this.accommodationData.hotelAddress = '';
    this.accommodationData.agentName = '';
    this.accommodationData.agentId = '';
  }

  // Method to update hotel details based on selected place
  onPlaceChange() {
    const place = this.accommodationData.place as keyof typeof this.hotelData;
    const hotel = this.hotelData[place];
    if (hotel) {
      this.accommodationData.hotelName = hotel.name;
      this.accommodationData.hotelAddress = hotel.address;
      this.accommodationData.agentName = hotel.agentName;
      this.accommodationData.agentId = hotel.agentId;
    } else {
      this.accommodationData.hotelName = '';
      this.accommodationData.hotelAddress = '';
      this.accommodationData.agentName = '';
      this.accommodationData.agentId = '';
    }
  }

  // Method to update additional services based on checkbox selection
  updateAdditionalServices(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.accommodationData.additionalServices.push(value);
    } else {
      const index = this.accommodationData.additionalServices.indexOf(value);
      if (index > -1) {
        this.accommodationData.additionalServices.splice(index, 1);
      }
    }
  }

  // Submit accommodation data method
  async submitAccommodation() {
    const emailPattern = /^[a-z][a-z0-9]*\d+@gmail\.com$/;
    if (!emailPattern.test(this.accommodationData.email)) {
      alert("Email must start with letters, contain numbers, and end with '@gmail.com'.");
      return;
    }

    // Validate that both terms checkboxes are checked
    const terms1 = document.getElementById('terms1') as HTMLInputElement;
    const terms2 = document.getElementById('terms2') as HTMLInputElement;

    if (!terms1.checked || !terms2.checked) {
      alert("Please agree to both terms before submitting.");
      return;
    }

    // Verify user and then submit the form
    await this.verifyUser();
    
    const formData = this.accommodationData;
    this.http.post('http://localhost:5300/api/accommodation', formData)
      .subscribe({
        next: () => {
          alert('Accommodation data saved successfully!');

          // Reset the form
          this.accommodationData = {
            userName: '',
            email: '',
            phone: '',
            address: '',
            location: '',
            place: '',
            accommodationType: '',
            priceRange: '',
            checkin: '',
            checkout: '',
            persons: 1,
            roomType: '',
            payment: '',
            additionalServices: [],
            specialNeeds: false,
            hotelName: '',
            hotelAddress: '',
            agentName: '',
            agentId: ''
          };
          this.places = [];

          // Manually reset each additional services checkbox
          const checkboxes = document.querySelectorAll(
            'input[type="checkbox"][id^="service"]'
          ) as NodeListOf<HTMLInputElement>;
          checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
          });

          // Reset terms and conditions checkboxes
          const terms1 = document.getElementById('terms1') as HTMLInputElement;
          const terms2 = document.getElementById('terms2') as HTMLInputElement;
          if (terms1) terms1.checked = false;
          if (terms2) terms2.checked = false;
        },
        error: (error) => alert(error.error.message || 'Error submitting data'),
      });
      // Send email with the form data
    this.http.post('http://localhost:5300/api/send-email', formData)
    .subscribe({
      next: () => {
        console.log('Email sent successfully!');
      },
    });
  }
}

  