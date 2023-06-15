import {Component, HostBinding, HostListener, Input} from '@angular/core';
import {OutputService} from "../output.service";

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})
export class TableCellComponent {
  @HostListener('click') next(){
    this.outputService.next(this.item.toString());
  }

  @HostListener('mouseenter') showShadow() {
    this.shadow = true;
  }

  @HostListener('mouseleave') hideShadow() {
    this.shadow = false;
  }

  @HostBinding('class.box-shadow') shadow: boolean = false;
  @Input() @HostBinding('class.header') header: boolean = false;
  @Input() item: any;

  constructor(
    private outputService: OutputService
  ) { }
}
