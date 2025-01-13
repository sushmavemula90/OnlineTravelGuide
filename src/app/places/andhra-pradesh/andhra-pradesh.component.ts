import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-andhra-pradesh',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './andhra-pradesh.component.html',
  styleUrl: './andhra-pradesh.component.css'
})
export class AndhraPradeshComponent {

}
