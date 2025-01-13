import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-gujarat',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './gujarat.component.html',
  styleUrl: './gujarat.component.css'
})
export class GujaratComponent {

}
