import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class PaginatorRusIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Первая страница`;
  itemsPerPageLabel = $localize`Записей на странице:`;
  lastPageLabel = $localize`Последняя страница`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Страница 1 из 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`страница ${page + 1} из ${amountPages}`;
  }
}
