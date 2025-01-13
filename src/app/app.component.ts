import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AgentRegComponent } from './agent-reg/agent-reg.component';
import { AdminComponent } from './admin/admin.component';
import { RegComponent } from './reg/reg.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HomeComponent,
    AccommodationComponent,
    GalleryComponent,
    FeedbackComponent,
    AgentRegComponent,
    AdminComponent,
    RegComponent,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    BookingsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'proj';
  isRecording = false;
  showLoginDropdown = false;
  showPassword = false;
  username = '';
  password = '';
  isLoggedIn = false;
  loggedInUsername = '';

  @ViewChild('speechToText', { static: false }) speechToText!: ElementRef;

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loggedInUsername = this.authService.getUsername();
  }

  toggleLoginDropdown() {
    this.showLoginDropdown = !this.showLoginDropdown;
  }

  closeLoginDropdown() {
    this.showLoginDropdown = false;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }

    fetch('http://localhost:5300/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.username, password: this.password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Invalid username or password');
        return response.json();
      })
      .then((data) => {
        alert(data.message || 'Login successful!');
        this.authService.setLoggedIn(true);
        this.authService.setUsername(this.username);
        this.isLoggedIn = true;
        this.loggedInUsername = this.authService.getUsername();
        this.closeLoginDropdown();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  logOut() {
    this.authService.setLoggedIn(false);
    this.authService.setUsername('');
    this.isLoggedIn = false;
    this.loggedInUsername = '';
    this.router.navigate(['/home']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownContainer = document.getElementById('login-dropdown-container');
    if (this.showLoginDropdown && dropdownContainer && !dropdownContainer.contains(target)) {
      this.closeLoginDropdown();
    }
  }

  record() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-GB';
    this.isRecording = true;

    recognition.onresult = (event: any) => {
      this.speechToText.nativeElement.value = event.results[0][0].transcript;
      this.checkKeywordAndNavigate();
    };

    recognition.onend = () => (this.isRecording = false);
    recognition.onerror = () => (this.isRecording = false);
    recognition.start();
  }

  onEnter(event: any) {
    if ((event as KeyboardEvent).key === 'Enter') {
      this.checkKeywordAndNavigate();
    }
  }

  checkKeywordAndNavigate() {
    const inputText = this.speechToText.nativeElement.value.toLowerCase().trim();

    if (inputText) {
        if (inputText.includes('rajasthan') ||
            inputText.includes('jaipur') || 
            inputText.includes('udaipur') || 
            inputText.includes('jaisalmer') || 
            inputText.includes('jodhpur')) {
            this.router.navigate(['/rajasthan']);
        } else if (inputText.includes('uttar pradesh') || 
                   inputText.includes('uttarpradesh') || 
                   inputText.includes('agra') || 
                   inputText.includes('varanasi') || 
                   inputText.includes('lucknow') || 
                   inputText.includes('mathura')) {
            this.router.navigate(['/uttarpradesh']);
        } else if (inputText.includes('kerala') || 
                   inputText.includes('alleppey') || 
                   inputText.includes('munnar') || 
                   inputText.includes('kochi') || 
                   inputText.includes('varkala')) {
            this.router.navigate(['/kerala']);
        } else if (inputText.includes('maharashtra') || 
                   inputText.includes('mumbai') || 
                   inputText.includes('pune') || 
                   inputText.includes('aurangabad') || 
                   inputText.includes('nashik')) {
            this.router.navigate(['/maharashtra']);
        } else if (inputText.includes('tamil nadu') || 
                   inputText.includes('tamilnadu') || 
                   inputText.includes('chennai') || 
                   inputText.includes('madurai') || 
                   inputText.includes('kanyakumari') || 
                   inputText.includes('ooty')) {
            this.router.navigate(['/tamilnadu']);
        } else if (inputText.includes('karnataka') || 
                   inputText.includes('bengaluru') || 
                   inputText.includes('mysore') || 
                   inputText.includes('hampi') || 
                   inputText.includes('coorg')) {
            this.router.navigate(['/karnataka']);
        } else if (inputText.includes('west bengal') || 
                   inputText.includes('westbengal') || 
                   inputText.includes('kolkata') || 
                   inputText.includes('darjeeling') || 
                   inputText.includes('sundarbans') || 
                   inputText.includes('shantiniketan')) {
            this.router.navigate(['/westbengal']);
        } else if (inputText.includes('gujarat') || 
                   inputText.includes('ahmedabad') || 
                   inputText.includes('kutch') || 
                   inputText.includes('gir national park') || 
                   inputText.includes('somnath')) {
            this.router.navigate(['/gujarat']);
        } else if (inputText.includes('punjab') || 
                   inputText.includes('amritsar') || 
                   inputText.includes('chandigarh') || 
                   inputText.includes('ludhiana') || 
                   inputText.includes('patiala')) {
            this.router.navigate(['/punjab']);
        } else if (inputText.includes('telangana') || 
                   inputText.includes('hyderabad') || 
                   inputText.includes('warangal') || 
                   inputText.includes('ramoji film city') || 
                   inputText.includes('khammam')) {
            this.router.navigate(['/telangana']);
        } else if (inputText.includes('odisha') || 
                   inputText.includes('bhubaneswar') || 
                   inputText.includes('puri') || 
                   inputText.includes('konark') || 
                   inputText.includes('ganjam')) {
            this.router.navigate(['/odisha']);
        } else if (inputText.includes('andhra pradesh') || 
                   inputText.includes('andhrapradesh') || 
                   inputText.includes('visakhapatnam') || 
                   inputText.includes('amaravati') || 
                   inputText.includes('tirupati') || 
                   inputText.includes('kadapa')) {
            this.router.navigate(['/andhrapradesh']);
        } else if (inputText.includes('delhi') || 
                   inputText.includes('red fort') || 
                   inputText.includes('qutub minar') || 
                   inputText.includes('india gate') || 
                   inputText.includes('humayun\'s tomb')) {
            this.router.navigate(['/delhi']);
        }

        // Delay clearing input to ensure navigation works smoothly
        setTimeout(() => {
            this.speechToText.nativeElement.value = '';
        }, 100);
    }
}

}