import { Component, inject } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: false,
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  firestore = inject(Firestore);
  router = inject(Router);

  // constructor(private router: Router) { }

  newGame() {
    //start Game
    let game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    addDoc(gamesCollection, game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    })

  }
}
