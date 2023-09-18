import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../interfaces/animal';
@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private url: string = 'https://localhost:7207/animals';

  constructor(private http: HttpClient) {
  }
  public get(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.url);
  }
  public add(animal: Animal) {
    return this.http.post(this.url, animal);
  }
  public remove(id: number | undefined) {
    return this.http.delete(this.url + '/' + id);
  }
}
