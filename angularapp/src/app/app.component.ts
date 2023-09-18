import { Component, OnInit } from '@angular/core';
import { Animal } from './interfaces/animal';
import { AnimalsService } from './services/animal.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnimalDialogComponent } from './dialogs/create-animal-dialog/create-animal-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public animals?: Animal[];

  constructor(private _animalsService: AnimalsService, private _dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this._animalsService.get().subscribe({
      next: (v) => this.animals = v,
      error: (e) => console.error(e)
    });
  }

  showAddDialog(): void {
    const dialogRef = this._dialog.open(CreateAnimalDialogComponent, { data: { error: '', name: '' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._animalsService.add({
          name: result,
          id: undefined
        }).subscribe({
          next: () => this.refreshList(),
          error: (e) => {
            console.error(e.error);
            this._dialog.open(CreateAnimalDialogComponent, {
              data: { name: result, error: e.error },
            })
          }
        });
      }
    });
  }
}
