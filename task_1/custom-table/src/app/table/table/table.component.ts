import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() items: any[][] = [[]];
  @Input() zebra: boolean = false;
  @Input() zebraColor: string = '#EDEDED';
  @Input() standardColor: string = '#fff';
  @Input() fontSize: number = 16;
}
