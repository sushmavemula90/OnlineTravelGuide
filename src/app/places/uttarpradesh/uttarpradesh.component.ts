import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-uttarpradesh',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './uttarpradesh.component.html',
  styleUrl: './uttarpradesh.component.css'
})
export class UttarpradeshComponent {

}
