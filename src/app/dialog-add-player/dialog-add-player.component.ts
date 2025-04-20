import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  standalone: false,
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent implements OnInit {
name: string = '';

constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>){};

ngOnInit(): void {};

onNoClick(){
  this.dialogRef.close();
};

 
}
