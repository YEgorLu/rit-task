import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  items!: string[][];
  tableRowsCount: number = 5;
  tableColumnsCount: number = 3;
  tableZebra: boolean = false;
  showModal: boolean = false;

  obj: object = {
    a0: {aa: [3, 9], bb: 2, cc: {aaa: 4, bbb: -5}},
    a1: {aa: [0, 8], bb: -7, cc: {aaa: 8, bbb: 7}},
    a2: {aa: [9, -4], bb: 1, cc: {aaa: -1, bbb: 8}},
    a3: {aa: [8, -1], bb: 7, cc: {aaa: 3, bbb: 0}},
    a4: {aa: [-4, -2], bb: -2, cc: {aaa: 8, bbb: 9}}
  }
  objMin!: number;
  objMax!: number;

  toggleModal(){
    this.showModal = !this.showModal;
  }

  changeTable() {
    this.items = [];
    if (this.tableRowsCount <= 0 || this.tableColumnsCount <= 0) {
      return;
    }

    const headerRow = Array.from(this.getHeader(this.tableColumnsCount));
    this.items.push(headerRow);
    for (let rowIndex = 0; rowIndex < this.tableRowsCount; rowIndex++) {
      const row = Array.from(this.getRow(this.tableColumnsCount, rowIndex));
      this.items.push(row);
    }

  }

  private* getRow(count: number, currentRowIndex: number): Generator<string> {
    for (let i = 0; i < count; i++) {
      yield `cell ${currentRowIndex + 1} ${i + 1}`;
    }
  }

  private* getHeader(count: number): Generator<string> {
    for (let i = 0; i < count; i++) {
      yield `header ${i + 1}`;
    }
  }

  private toFlatObject(obj: object): any[] {
    let values: any[] = [];
    const toProcess = Array.isArray(obj) ? obj : Object.values(obj);

    toProcess.forEach((value) => {
      if (Array.isArray(value)) {
        values = values.concat(this.toFlatObject(value));
      } else if (typeof value === 'object') {
        values = values.concat(this.toFlatObject(value));
      } else {
        values.push(value);
      }
    })

    return values;
  }

  constructor() {
    this.changeTable()

    const objValues = this.toFlatObject(this.obj);
    objValues.sort((a, b) => a-b);
    this.objMin = objValues[0];
    this.objMax = objValues[objValues.length - 1];
  }
}
