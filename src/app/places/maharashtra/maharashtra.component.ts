import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-maharashtra',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './maharashtra.component.html',
  styleUrl: './maharashtra.component.css'
})
export class MaharashtraComponent {

}
