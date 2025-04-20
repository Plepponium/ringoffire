import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name:any;
  @Input() playerActive:boolean = false;
}
