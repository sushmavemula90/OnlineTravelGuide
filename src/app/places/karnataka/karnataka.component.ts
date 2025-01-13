import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-karnataka',
  standalone: true,
  imports: [RouterOutlet, RouterLink,AccommodationComponent],
  templateUrl: './karnataka.component.html',
  styleUrls: ['./karnataka.component.css'] // Corrected from styleUrl to styleUrls
})
export class KarnatakaComponent {
  // Component logic goes here
}
