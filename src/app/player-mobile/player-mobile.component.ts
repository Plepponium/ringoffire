import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  standalone: false,
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})
export class PlayerMobileComponent {
  @Input() name:any;
  @Input() playerActive:boolean = false;  
}
