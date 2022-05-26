import { Component } from '@angular/core';
import { CollectService } from './collect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CollectService]
})
export class AppComponent {
  
}
