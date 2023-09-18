import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'create-animal-dialog',
  templateUrl: './create-animal-dialog.component.html',
  styleUrls: ['./create-animal-dialog.component.css']
})
export class CreateAnimalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateAnimalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
