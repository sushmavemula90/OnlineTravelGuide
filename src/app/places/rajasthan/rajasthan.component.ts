import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-rajasthan',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './rajasthan.component.html',
  styleUrl: './rajasthan.component.css'
})
export class RajasthanComponent {

}
