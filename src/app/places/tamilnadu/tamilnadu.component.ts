import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-tamilnadu',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './tamilnadu.component.html',
  styleUrl: './tamilnadu.component.css'
})
export class TamilnaduComponent {

}
