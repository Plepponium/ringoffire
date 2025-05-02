import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { Firestore, addDoc, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId!: string;


  firestore = inject(Firestore);
  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);

  // constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      const gameId = params['id'];
      this.gameId = gameId;
      const gameDocRef = doc(this.firestore, `games/${gameId}`);
      docData(gameDocRef).subscribe((gameData: any) => {
        console.log('Game update', gameData);
        this.game.currentPlayer = gameData.currentPlayer;
        this.game.playedCards = gameData.playedCards;
        this.game.players = gameData.players;
        this.game.stack = gameData.stack;
        this.game.pickCardAnimation = gameData.pickCardAnimation;
        this.game.currentCard = gameData.currentCard;
      });
    });
  }


  // this.firestore.collection('games').doc(params.id).valueChanges().subscribe((game:any)=>{
  //   console.log('Gameupdate', game);
  //   this.game.currentPlayer = game.currentPlayer;
  //   this.game.playedCards = game.playedCards;
  //   this.game.players = game.players;
  //   this.game.stack = game.stack;
  // })

  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name)
        this.saveGame();
      }
    });
  }

  saveGame() {
    if (!this.gameId) return;
    const gameDocRef = doc(this.firestore, `games/${this.gameId}`);
    updateDoc(gameDocRef, this.game.toJson()).then(() => {
      console.log('Game erfolgreich gespeichert.');
    }).catch(error => {
      console.error('Fehler beim Speichern:', error);
    });
  }



}
