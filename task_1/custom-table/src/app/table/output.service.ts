import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  private readonly value!: Subject<string>;

  constructor() {
    this.value = new Subject<string>();
  }

  next(value: string): void {
    this.value.next(value);
  }

  getValue(): Subject<string> {
    return this.value;
  }

  clear(): void {
    this.value.next('');
  }
}
