import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SwapiService} from "../swapi-service/swapi.service";
import {Planet} from "../swapi-service/interfaces/planet";
import {ListDTO} from "../swapi-service/interfaces/response/listDTO";
import {PaginatorRusIntl} from "../PaginatorRusIntl";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {BehaviorSubject, debounceTime, distinctUntilChanged, finalize, Observable, Subject, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorRusIntl}]
})
export class MainPageComponent implements OnInit {
  planetsList$ = new Observable<ListDTO<Planet>>();
  private planets$ = new BehaviorSubject<{ pageIndex: number, planetName?: string }>({pageIndex: 1});
  loading = true;
  planetsCount = 0;

  constructor(
    private swapiService: SwapiService,
    private changeDetection: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.planetsList$ = this.planets$.pipe(
      tap(() => this.loading = true),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(({planetName, pageIndex}) =>
        this.swapiService.getPlanets(pageIndex, planetName)
          .pipe(
            tap((list) => {
              this.planetsCount = list.count
            }),
            finalize(() => {
              this.loading = false;
              this.changeDetection.detectChanges()
            })
          )
      )
    )
  }

  search(planetName: string): void {
    this.planets$.next({pageIndex: 1, planetName})
  }

  getPlanets(pageIndex: number = 1, planetName?: string): void {
    this.planets$.next({pageIndex, planetName})
  }
}
