import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { ToPixelPipe } from './to-pixel.pipe';
import { OutputDirective } from './output.directive';



@NgModule({
  declarations: [
    TableComponent,
    TableRowComponent,
    TableCellComponent,
    ToPixelPipe,
    OutputDirective,
  ],
  exports: [
    TableComponent,
    OutputDirective
  ],
  imports: [
    CommonModule
  ]
})
export class TableModule { }
