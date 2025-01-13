import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AccommodationComponent } from '../../accommodation/accommodation.component';

@Component({
  selector: 'app-westbengal',
  standalone: true,
  imports: [RouterLink,RouterOutlet,AccommodationComponent],
  templateUrl: './westbengal.component.html',
  styleUrl: './westbengal.component.css'
})
export class WestbengalComponent {

}
