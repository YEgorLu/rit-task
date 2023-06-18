import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SwapiService} from "../swapi-service/swapi.service";
import {Planet} from "../swapi-service/interfaces/planet";
import {ActivatedRoute} from "@angular/router";
import {forkJoin, Subscription} from "rxjs";
import {Person} from "../swapi-service/interfaces/person";
import {MatDialog} from "@angular/material/dialog";
import {PersonDialogComponent} from "./person-dialog/person-dialog.component";
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-planet-page',
  templateUrl: './planet-page.component.html',
  styleUrls: ['./planet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetPageComponent implements OnInit{
  planet?: Planet;
  planetLoading = false;
  private persons!: Person[];
  filteredPersons!: Person[];
  personsLoading = false;
  isMobile!: boolean;

  constructor(
    private swapiService: SwapiService,
    private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private dialog: MatDialog,
    private themeService: ThemeService
  ) {
    this.loadDataByParams();
  }

  ngOnInit(): void {
    this.themeService.isMobile$.subscribe((value) => {
      this.isMobile = value
      this.changeDetection.detectChanges();
    })
  }

  openDialog(person: Person): void {
    this.dialog.open(PersonDialogComponent,
      {data: person});
  }

  filterPersons(selectedGender: string) {
    if (selectedGender)
      this.filteredPersons = this.persons.filter(({gender}) => gender === selectedGender)
    else
      this.filteredPersons = this.persons;
  }


  getPersons(personUrls: string[]) {
    this.personsLoading = true;
    const personRequests = personUrls.map((personUrl) => this.swapiService.getPersonByUrl(personUrl));

    forkJoin(personRequests)
      .subscribe({
        next: (persons) => {
          this.persons = persons;
          this.filteredPersons = persons;
        },
        complete: () => {
          this.personsLoading = false;
          this.changeDetection.detectChanges();
        }
      })
  }

  private loadDataByParams(){
    this.route.paramMap.subscribe((paramMap) => {
      const id = Number(paramMap.get('id'));

      if (!Number.isNaN(id)) {
        this.planetLoading = true;
        this.swapiService
          .getPlanetById(id)
          .subscribe((planet) => {
            this.planet = planet;
            this.planetLoading = false;
            this.changeDetection.detectChanges();
            this.getPersons(planet.residents);
          });
      }
    })
  }
}
