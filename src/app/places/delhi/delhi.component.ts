import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccommodationComponent } from '../../accommodation/accommodation.component';


@Component({
  selector: 'app-delhi',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './delhi.component.html',
  styleUrl: './delhi.component.css'
})
export class DelhiComponent {

}
