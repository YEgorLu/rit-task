import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent {
  @Input() @HostBinding('style.backgroundColor') bgColor: string = '#fff';
  @Input() @HostBinding('style.fontSize') fontSize!: string;

  @Input() items!: any[];
  @Input() header: boolean = false;
}
