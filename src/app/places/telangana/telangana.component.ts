import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-telangana',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './telangana.component.html',
  styleUrl: './telangana.component.css'
})
export class TelanganaComponent {

}
