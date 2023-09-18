import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animal } from 'src/app/interfaces/animal';
import { AnimalsService } from 'src/app/services/animal.service';

@Component({
  selector: 'animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  @Input() animals: Array<Animal> | undefined;

  @Output() animalDeleted = new EventEmitter<any>();

  constructor(private animalsService: AnimalsService) { }

  ngOnInit(): void {
  }

  deleteAnimal(id: number | undefined) {
    if (confirm("Are you sure to delete animal")) {
      this.animalsService.remove(id).subscribe({
        next: () => this.animalDeleted.emit(),
        error: (e) => console.error(e)
      });
    }
  }
}
